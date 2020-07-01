import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const stuffConditions = ['excellent', 'good', 'fair', 'poor'];
export const stuffPublicationNames = {
  stuff: 'Stuff',
};

class StuffCollection extends BaseCollection {
  constructor() {
    super('Stuffs', new SimpleSchema({
      name: String,
      quantity: Number,
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
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ name, quantity, condition }) {
    const docID = this._collection.insert({
      name,
      quantity,
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
        return inst._collection.find();
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
    }
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Stuffs = new StuffCollection();
