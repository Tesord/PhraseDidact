import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';
import Words_Attempts from '/imports/collections/words_Attempts';

import Func_Util from '/imports/api/functional/func_Util';
import QuestionDataPacker_Util from '../api/questionDataPacker_Util';
import QuestionMarker_Util from '../api/questionMarker_Util';


/* REF:
 * Learning-related calculations HERE */
function wordScoreFormula(word, wordAttempt){
   return (
      (word.difficultyLevel / 100) +
      (     Func_Util.convert_ms_to_minutes( new Date() - wordAttempt.nextReviewDate )    )
   );
}

const WORDATTEMPT_INITIAL_REVIEWmins = 24 * 60;

const WORDATTEMPT_RESPONSE_FACTOR = {
   Easy: 1.5,
   Okay: 1,
   Hard: 0.5,
};




//
// function updateWordScore(word, ){
//
// }


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
   'learner.getNextQuestion': (courseName) => {
      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         let course = Courses_Configs.findOne( { courseName, access: "public" } );

         if( course ){
         /* setting up data */
            let allWords = Courses_Words.find({ userId : course.userId, courseId : course._id }).fetch();
            let resultArray = [];

            let curr_wordAttempt = null;

         /* gathering data */

            // initialising wordAttempt record for any new words, even if two loops are required, bulk should speed up overall performance
            let bulk = Words_Attempts.rawCollection().initializeUnorderedBulkOp();    // accessing npm version is required to use this method
            let createdTime = null;

            for(let word   of       allWords){
               curr_wordAttempt = Words_Attempts.findOne( {userId : Meteor.userId(), wordId: word._id } );

               if( !curr_wordAttempt  ){
                  createdTime = new Date();

                  bulk.insert({
                     wordId : word._id,
                     courseId : word.courseId,
                     userId : Meteor.userId(),
                     nextReviewDate : createdTime,

                     attempts: 0,
                     correctAttempts: 0,
                     createdAt: createdTime
                  });
               }

            }
            /* CreatedTime not null indicates at least one operation is scheduled,
             * required to prevent  "MongoError: Invalid Operation, No operations in bulk"    being thrown */
            if( createdTime ){
               bulk.execute();
            }


            // now wordAttempt of all words should be inserted into the DB...
            for(let word   of       allWords){
               curr_wordAttempt = Words_Attempts.findOne( {userId : Meteor.userId(), wordId: word._id } );

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


            /* REF:
             * Question types here */

            // TODO does some calculation or something to determine question type?
            let type = "TEXT";


         /* return result */
            return QuestionDataPacker_Util.pack(resultArray[0].word, type);


         }

      }
   },


   'learner.answerQuestion': (response, questionObj, courseName) => {

      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){

         let course = Courses_Configs.findOne( { courseName, access: "public" } );
         let word = Courses_Words.findOne( {_id: questionObj.wordId} );

         if( course && word ){

            let isCorrect = QuestionMarker_Util.check(response, questionObj, word);

            return {
               isCorrect,
               word
            };

         }

      }

   },

   'learner.processFeedback': (response, questionObj, courseName) => {



   }

});
