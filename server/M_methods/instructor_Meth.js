import shortid from 'shortid';

import Instructor_Courses from '/imports/collections/instructor_Courses';
import Course_Configs from '/imports/collections/courses_Configs';


Meteor.methods({

   'instructor.addCourse': (courseName, access, tags) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            tags.length <= 1000
         ){

         let tagArray = tags.replace( /\n/g, " " ).split( " " );
         let courseId = shortid.generate();

         try{

            Instructor_Courses.insert({
               userId : Meteor.userId(),
               courseId
            });

            Course_Configs.insert({
               courseId,
               courseName,
               access,
               tags : tagArray
            });

         }
         catch(err) {
            // Useful error messages

            if( err.message.lastIndexOf("E11000", 0) === 0 ){
               throw new Meteor.Error("E11000", "Course with this name already exists!");
            }
            else{
               throw err;
            }

         }

      }
   },

   'instructor.checkCourseBelong': (courseName) => {
      let courseByUserArray = Instructor_Courses.find( { userId : Meteor.userId() } ).fetch();

      // forEach() in this context is async for some reason...
      for( var i = 0; i < courseByUserArray.length; i++){

         if( Course_Configs.findOne( {courseId : courseByUserArray[i].courseId, courseName} ) ){
            return true;
         }
      }

      return false;

   },

   // // TODO not implemented function yet
   // 'instructor.addGroup': (groupName) => {
   //
   //    if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) ){
   //
   //       Instructor_Courses.insert({
   //          userId : Meteor.userId(),
   //          groupName
   //
   //       });
   //
   //    }
   //
   // }

});
