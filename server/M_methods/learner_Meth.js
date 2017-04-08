import LearnerProfile from '/imports/collections/learnerProfile';


Meteor.methods({

   'learner.saveLearningProfile': (fieldNameArray, valueArray) => {

      if(  !LearnerProfile.findOne({userId : Meteor.userId()})  ){
         LearnerProfile.insert({
            userId: Meteor.userId()
         });
      }


      let currentFieldNameVal = "";
      let currentValueArrayVal = "";

      for(var i = 0; i < fieldNameArray.length; i++){
         currentFieldNameVal = fieldNameArray[i];
         currentValueArrayVal = valueArray[i];

         LearnerProfile.update( {userId :  Meteor.userId() } , {$set: {  [currentFieldNameVal]  : currentValueArrayVal }});
      }

   }

});
