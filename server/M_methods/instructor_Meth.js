import Instructor_Courses from '/imports/collections/instructor_Courses';


Meteor.methods({

   'instructor.addCourse': (courseName, access, tags) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) &&
            tags.length <= 1000
         ){

         let tagArray = tags.replace( /\n/g, " " ).split( " " );

         try{

            Instructor_Courses.insert({
               userId : Meteor.userId(),
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

   // TODO not implemented function yet
   'instructor.addGroup': (groupName) => {

      if( Roles.userIsInRole( Meteor.userId(), "INSTR" ) ){

         Instructor_Courses.insert({
            userId : Meteor.userId(),
            groupName

         });

      }

   }

});
