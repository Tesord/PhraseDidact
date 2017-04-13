<<<<<<< HEAD

Meteor.methods({

   'learner.saveLearningProfile': (isInstructor) => {
=======
import Learner_LProfile from '/imports/collections/learner_LProfile';


Meteor.methods({

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
>>>>>>> dea9931475086c8f7f8e7d00dec35a1fe4efb54e

   }

});
