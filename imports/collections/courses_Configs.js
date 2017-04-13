import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const courses_Configs = new Mongo.Collection('courses_Configs');
const Schemas = {};


/* TODO Maybe make allowed values for access?
 * NOTE:    Max ARRAY length (kinda) check is performed by Meteor add methods
 */

Schemas.Courses_Configs = new SimpleSchema({
   courseId: {
      type: String,
      label: "courseId",
      max: 20,

      index: true,
      unique: true
   },
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
      label: "access"
   },
   description: {
      type: String,
      label: "description",
      max: 5000
   },
   tags: {
      type: Array,
      label: "tags"
   },
   'tags.$': {
      type: String
   }
});

courses_Configs.attachSchema(Schemas.Courses_Configs);


export default courses_Configs;
