import { Meteor } from 'meteor/meteor';

import Instructor_Meth from '/imports/M_methods/instructor_Meth';

import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';


Meteor.startup(() => {
   // code to run on server at startup

   Meteor.publish('learner_LProfile', function() {
      return Learner_LProfile.find({ userId: this.userId });
   });

   // TODO add permission system
   Meteor.publish('courses_Configs', function() {
      return Courses_Configs.find( { $or: [ { userId:  this.userId  }, { access: "public" } ] } );
   });

   // TODO add permission system

   /* TODO this method should be restricted, learner should NOT be able to view every word of the course
    * only to LEARN side */

   // Meteor.publish('view_Course_Words', function(courseName) {
   //
   //    let course = Courses_Configs.findOne( { courseName } );
   //
   //    if(course){
   //       // course exists, but do user have permission to access it?
   //       if(course.userId === this.userId  ||
   //          course.access === "public"){
   //          return Courses_Words.find({ courseId : course.courseId });
   //       }
   //       else{
   //          throw new Meteor.Error("403", "This course is private.");
   //       }
   //    }
   //    else{
   //       throw new Meteor.Error("404", "Course not found.");
   //    }
   // });

   // TODO add permission system
   Meteor.publish('edit_Course_Words', function(courseName) {

      let course = Courses_Configs.findOne( { courseName } );

      if(course){
         // course exists, but do user have permission to edit it?
         if(course.userId === this.userId){
            return Courses_Words.find({ courseId : course.courseId });
         }
         else{
            throw new Meteor.Error("401", "Unauthorized access to course.");
         }
      }
      else{
         throw new Meteor.Error("404", "Course not found.");
      }
   });

});
