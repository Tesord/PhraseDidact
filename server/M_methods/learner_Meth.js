import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Words_Attempts from '/imports/collections/words_Attempts';


Meteor.methods({

   // TODO permission, UNTESTED
   'learner.saveLearningProfile': (fieldNameArray, valueArray) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         if(  !Learner_LProfile.findOne({userId : Meteor.userId()})  ){
            Learner_LProfile.insert({
               userId: Meteor.userId()
            });
         }


         let currentFieldNameVal = "";
         let currentValueArrayVal = "";

         for(var i = 0; i < fieldNameArray.length; i++){
            currentFieldNameVal = fieldNameArray[i];
            currentValueArrayVal = valueArray[i];

            Learner_LProfile.update( {userId :  Meteor.userId() } , {$set: {  [currentFieldNameVal]  : currentValueArrayVal }});
         }

      }
   },

   // TODO permission, UNTESTED
   'learner.doCourse': (courseName) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         let course = Courses_Configs.findOne( { courseName, access: "public" } );

         if( course ){
            // course exists, and user can indeed access the course

            if(  !Words_Attempts.findOne( {userId : Meteor.userId()} )  ){
               // initialisation of Words_Attempts record


               // TODO srgjo[gjooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo]
               // fyiyfifyifyifyiifyf
               
            }
            else{

            }


         }

      }
   }


});
