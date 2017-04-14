import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';


Meteor.methods({

   'instructor.addCourse': (courseName, access, description, tags) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            tags.length <= 1000
         ){

         let tagArray = tags.replace( /\n/g, " " ).split( " " );

         try{

            Courses_Configs.insert({
               userId : Meteor.userId(),
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

   'instructor.removeCourse': (courseName) => {
      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) ){

         // courseId required to access Courses_Words collection + validate course ownership
         let courseId = Courses_Configs.findOne( {userId : Meteor.userId(), courseName} )._id;

         Courses_Words.remove( { courseId } );
         Courses_Configs.remove( { userId : Meteor.userId(), courseName } );

      }
   },


   'instructor.fetchCourseByUser': (courseName) => {

      return Courses_Configs.findOne( { userId : Meteor.userId(), courseName } );

   },


   'instructor.addWord': (courseName, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            l2_examples.length <= 1000 && l1_examples.length <= 1000
         ){

         // check the "course the words belong to it" is created by the user
         let course = Meteor.call('instructor.fetchCourseByUser', courseName);

         if(course){
            let l2_example_Array = l2_examples.split( "\n" );
            let l1_example_Array = l1_examples.split( "\n" );

            Courses_Words.insert({
               courseId : course._id,
               l2_wordName,
               l2_examples : l2_example_Array,
               l1_wordName,
               l1_examples : l1_example_Array,
               difficultyLevel
            });
         }

      }

   },

   'instructor.editWord': (word_pair_id, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            l2_examples.length <= 1000 && l1_examples.length <= 1000
         ){

         let courseId = Courses_Words.findOne( { _id : word_pair_id } ).courseId;
         // check the "course the words belong to it" is created by the user
         let course = Courses_Configs.findOne( { userId : Meteor.userId(), _id : courseId } );

         if(course){
            let l2_example_Array = l2_examples.split( "\n" );
            let l1_example_Array = l1_examples.split( "\n" );

            Courses_Words.update(
               {_id :  word_pair_id } ,
               {$set:
                  {
                     l2_wordName,
                     l2_examples : l2_example_Array,
                     l1_wordName,
                     l1_examples : l1_example_Array,
                     difficultyLevel
                  }
               }
            );
         }

      }

   },

   'instructor.removeWord': (word_pair_id) => {
      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) ){

         let word_pair = Courses_Words.findOne( { "_id" : word_pair_id } );

         // check word actually belongs to a user-created course
         if( Courses_Configs.findOne( {userId : Meteor.userId(), _id : word_pair.courseId } ) ){
            Courses_Words.remove( { "_id" : word_pair_id } );
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
