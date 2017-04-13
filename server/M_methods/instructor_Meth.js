import shortid from 'shortid';

import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';


Meteor.methods({

   'instructor.addCourse': (courseName, access, description, tags) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            tags.length <= 1000
         ){

         let tagArray = tags.replace( /\n/g, " " ).split( " " );
         let courseId = shortid.generate();

         try{

            Courses_Configs.insert({
               userId : Meteor.userId(),
               courseId,
               courseName,
               access,
               description,
               tags : tagArray
            });

         }
         catch(err) {

            // Useful error messages
            if( err.message.lastIndexOf("E11000", 0) === 0 ){
               throw new Meteor.Error("E11000", "Course with this name already exists! Please pick another one or add an unique identifer such as (*username*) ");
            }
            else{
               throw err;
            }

         }

      }
   },


   'instructor.fetchCourseByUser': (courseName) => {

      return Courses_Configs.findOne( { userId : Meteor.userId(), courseName } );

   },


   'instructor.addWord': (courseName, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            l2_examples.length <= 1000 && l1_examples.length <= 1000
         ){

         let course = Meteor.call('instructor.fetchCourseByUser', courseName);

         let l2_example_Array = l2_examples.split( "\n" );
         let l1_example_Array = l1_examples.split( "\n" );


         if(course){
            Courses_Words.insert({
               courseId : course.courseId,
               l2_wordName,
               l2_examples : l2_example_Array,
               l1_wordName,
               l1_examples : l1_example_Array,
               difficultyLevel
            });
         }

      }

   }

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
