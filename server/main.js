import { Meteor } from 'meteor/meteor';

import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';
import Words_Attempts from '/imports/collections/words_Attempts';


Meteor.startup(() => {
   // code to run on server at startup

   Meteor.publish('learner_LProfile', function(username) {
      let user = Meteor.users.findOne( { username } );

      if(user){
         return Learner_LProfile.find({ userId: user._id });
      }
   });

   Meteor.publish('available_Courses', function() {
      return Courses_Configs.find( { $or: [ { userId:  this.userId  }, { access: "public" } ] } );
   });

   Meteor.publish('created_Courses', function() {
      return Courses_Configs.find( { userId:  this.userId  } );
   });

   Meteor.publish('single_Public_Course', function( courseName ) {
      return Courses_Configs.find( { courseName,  access: "public"  } );
   });

   // TODO private_Courses version

   Meteor.publish('single_Created_Course', function( courseName ) {
      return Courses_Configs.find( { courseName, userId:  this.userId } );
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
   //          return Courses_Words.find({ courseId : course._Id });
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
         return Courses_Words.find({ userId : this.userId, courseId : course._id });
      }
      else{
         throw new Meteor.Error("404", "Course not found.");
      }
   });

   // TODO permission, UNTESTED
   Meteor.publish('words_Attempts', function(courseName, userIdOfLearner) {

      let course = Courses_Configs.findOne( { courseName, access: "public" } );
      if( course ){
         // course exists, and user can indeed access the course

         let wordPairArray = Courses_Words.find( {courseId : course._id} ).fetch();
         // get the wordIds of all words in course
         let wordIdArray = [];
         for(let wordPair     of    wordPairArray){
            wordIdArray.push( wordPair._id );
         }


         if( Roles.userIsInRole( this.userId, "LEARN" ) ){
            return Words_Attempts.find( { userId : this.userId, wordId : { $in: wordIdArray } } );
         }
         else{
            return Words_Attempts.find( { userId : userIdOfLearner, wordId : { $in: wordIdArray } } );
         }
      }
      else{
         throw new Meteor.Error("404/401", "Course not found or Unauthorized access");
      }

   });

});
