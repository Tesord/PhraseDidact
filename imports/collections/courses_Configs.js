import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const courses_Configs = new Mongo.Collection('courses_Configs');
const Schemas = {};


/* TODO Maybe make allowed values for access? */

Schemas.Courses_Configs = new SimpleSchema({
   courseId: {
      type: String,
      label: "courseId",
      max: 20,

      index: true,
      unique: true
   },
   courseName: {
      type: String,
      label: "courseName",
      max: 150,
   },
   access: {
      type: String,
      label: "access"
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
