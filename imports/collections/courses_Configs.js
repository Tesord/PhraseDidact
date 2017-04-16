import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const courses_Configs = new Mongo.Collection('courses_Configs');
const Schemas = {};


/* TODO Maybe make allowed values for access?
 * NOTE:    Max ARRAY length (kinda) check is performed by Meteor add methods
 */

Schemas.Courses_Configs = new SimpleSchema({
   userId: {
      type: String,
      label: "userId",
      max: 20,
   },
   courseName: {
      type: String,
      label: "courseName",
      max: 150,

      index: true,
      unique: true
   },
   access: {
      type: String,
      label: "access",
      max: 50
   },
   description: {
      type: String,
      label: "description",
      max: 5000,

      optional: true
   },
   tags: {
      type: Array,
      label: "tags",

      optional: true
   },
   'tags.$': {
      type: String
   }
});

courses_Configs.attachSchema(Schemas.Courses_Configs);


export default courses_Configs;
