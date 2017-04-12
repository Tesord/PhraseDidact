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
   courseId: {
      type: String,
      label: "courseId",
      max: 20,

      index: true,
      unique: true
   }
});

instructor_Courses.attachSchema(Schemas.Instructor_Courses);


export default instructor_Courses;
