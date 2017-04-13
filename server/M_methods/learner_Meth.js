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

   }

});
