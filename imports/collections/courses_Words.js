import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const courses_Words = new Mongo.Collection('courses_Words');
const Schemas = {};


/* TODO Maybe make allowed values for access?
 * NOTE:    Max ARRAY length (kinda) check is performed by Meteor add methods
 */

Schemas.Courses_Words = new SimpleSchema({
   courseId: {
      type: String,
      label: "courseId",
      max: 20
   },
   l2_wordName : {
      type: String,
      label: "l2_wordName",
      max: 150
   },
   l2_examples : {
      type: Array,
      label: "l2_examples",
   },
   'l2_examples.$': {
      type: String
   },
   l1_wordName : {
      type: String,
      label: "l1_wordName",
      max: 150
   },
   l1_examples : {
      type: Array,
      label: "l1_examples",
   },
   'l1_examples.$': {
      type: String
   },
   'difficultyLevel': {
      type: Number,
      max: 99
   }
});

courses_Words.attachSchema(Schemas.Courses_Words);


export default courses_Words;
