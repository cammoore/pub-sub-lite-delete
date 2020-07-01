import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const stuffConditions = ['excellent', 'good', 'fair', 'poor'];
export const stuffPublicationNames = {
  stuff: 'Stuff',
  stuffAdmin: 'StuffAdmin',
};

class StuffCollection extends BaseCollection {
  constructor() {
    super('Stuffs', new SimpleSchema({
      name: String,
      quantity: Number,
      owner: String,
      condition: {
        type: String,
        allowedValues: stuffConditions,
        defaultValue: 'good',
      },
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ name, quantity, owner, condition }) {
    const docID = this._collection.insert({
      name,
      quantity,
      owner,
      condition,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { name, quantity, condition }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(quantity)) {
      updateData.quantity = quantity;
    }
    if (condition) {
      updateData.condition = condition;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection.
   */
  publish() {
    if (Meteor.isServer) {
      const inst = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publishLite(stuffPublicationNames.stuff, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return inst._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(stuffPublicationNames.stuffAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return inst._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Default subscription method for entities.
   * It subscribes to the entire collection.
   */
  subscribe() {
    if (Meteor.isClient) {
      Meteor.subscribeLite(stuffPublicationNames.stuff);
      Meteor.subscribeLite(stuffPublicationNames.stuffAdmin);
    }
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Stuffs = new StuffCollection();
