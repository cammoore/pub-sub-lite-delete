import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/maestroqadev:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Stuffs } from './StuffCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const stuffDefineMethod = new ValidatedMethod({
  name: 'StuffCollection.define',
  mixins: [CallPromiseMixin],
  applyOptions: { enhanced: true },
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = Stuffs.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
      return docID;
    }
    return '';
  },
});

export const stuffUpdateMethod = new ValidatedMethod({
  name: 'StuffCollection.update',
  mixins: [CallPromiseMixin],
  applyOptions: { enhanced: true },
  validate: null,
  run(updateData) {
    Stuffs.update(updateData.id, updateData);
  },
});

export const stuffRemoveItMethod = new ValidatedMethod({
  name: 'StuffCollection.removeIt',
  mixins: [CallPromiseMixin],
  applyOptions: { enhanced: true },
  validate: null,
  run(instance) {
    console.log(`${Meteor.isServer ? 'Server' : 'Client'}: Before stuff removeIt have ${Stuffs.count()} items.`);
    Stuffs.removeIt(instance);
    console.log(`${Meteor.isServer ? 'Server' : 'Client'}: After stuff removeIt have ${Stuffs.count()} items.`);
  },
});
