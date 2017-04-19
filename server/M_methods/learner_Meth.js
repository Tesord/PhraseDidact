import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';
import Words_Attempts from '/imports/collections/words_Attempts';

import Func_Util from '/imports/api/functional/func_Util';



function wordScoreFormula(word, wordAttempt){
   return (
      (word.difficultyLevel / 100) +
      (     Math.abs(      Func_Util.convert_ms_to_minutes(wordAttempt.lastReviewDate - wordAttempt.nextReviewDate)    )     )
   );
}


Meteor.methods({

   // TODO permission, UNTESTED
   'learner.saveLearningProfile': (fieldNameArray, valueArray) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" )             &&
            !Learner_LProfile.findOne({userId : Meteor.userId()})
      ){
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
   },

   // TODO permission
   'learner.addWordAttempt': (wordId) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         let word = Courses_Words.findOne( { _id: wordId } );

         if( word                                                                   &&
            Courses_Configs.findOne( { _id: word.courseId, access: "public" } )     &&
            !Words_Attempts.findOne( {userId : Meteor.userId(), wordId } )
         ){

               let createdTime = new Date();

               Words_Attempts.insert({
                  wordId : word._id,
                  courseId : word.courseId,
                  userId : Meteor.userId(),
                  lastReviewDate : createdTime,
                  nextReviewDate : createdTime,

                  createdAt: createdTime
               });

         }

      }
   },


   // TODO permission
   'learner.getNextQuestion_Text': (courseName) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         let course = Courses_Configs.findOne( { courseName, access: "public" } );

         if( course ){
            /* setting up data */
            let allWords = Courses_Words.find({ userId : course.userId, courseId : course._id }).fetch();
            let resultArray = [];

            let curr_wordAttempt = null;

            /* gathering data */
            for(let word   of       allWords){
               curr_wordAttempt = Words_Attempts.findOne( {userId : Meteor.userId(), wordId: word._id } );

               if( !curr_wordAttempt  ){
                  Meteor.call('learner.addWordAttempt', word._id, courseName);
                  // get the just added record from DB...
                  curr_wordAttempt = Words_Attempts.findOne( {userId : Meteor.userId(), wordId: word._id } );
               }

               resultArray.push(
                  {
                     word: word,
                     score: wordScoreFormula(word, curr_wordAttempt)
                  }
               );
            }

            /* sorting data */
            resultArray.sort(
               function(a, b) {                    // ascending sort
                  return a.score - b.score;
               }
            );

            /* return result */
            return {
               l2_wordName : resultArray[0].word.l2_wordName,
               l2_examples : resultArray[0].word.l2_examples,
            };
         }

      }
   }


});
