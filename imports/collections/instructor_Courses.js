import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const instructor_Courses = new Mongo.Collection('instructor_Courses');
const Schemas = {};


/* TODO Maybe make allowed values for access? */

Schemas.Instructor_Courses = new SimpleSchema({
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
   tags: {
      type: Array,
      label: "tags"
   },
   'tags.$': {
      type: String
   }
});

instructor_Courses.attachSchema(Schemas.Instructor_Courses);


export default instructor_Courses;