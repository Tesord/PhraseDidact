import Learner_LProfile from '/imports/collections/learner_LProfile';
import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';
import Words_Attempts from '/imports/collections/words_Attempts';

import Func_Util from '/imports/api/functional/func_Util';
import QuestionDataPacker_Util from '../api/questionDataPacker_Util';
import QuestionMarker_Util from '../api/questionMarker_Util';


/* REF:
 * Learning-related calculations HERE */
function nextStudyScoreFormula(word, wordAttempt){

   if(
      Func_Util.convert_ms_to_minutes( new Date() - wordAttempt.lastAttemptDate )   >  wordAttempt.learnScore
   ){
      return (word.difficultyLevel / 100) - wordAttempt.learnScore;
   }
   else{
      return (word.difficultyLevel / 100) + wordAttempt.attempts;
   }
}

function learnScoreFormula(learnScore, feedback){
   let san_Feedback = feedback.toUpperCase();
   let factor = WORDATTEMPT_FEEDBACK_FACTOR[san_Feedback];

   if( factor ){
      return (

         learnScore * factor

      );
   }
   else{    // No factor set? Then just use default feedback.
      return (

         learnScore * WORDATTEMPT_FEEDBACK_FACTOR.OKAY

      );
   }

}

const WORDATTEMPT_INITIAL_LEARNSCORE = 24 * 60;

const WORDATTEMPT_FEEDBACK_FACTOR = {
   EASY: 2,
   OKAY: 1.5,
   HARD: 1,

   WRONG: 0.4
};



/* Sub-routines used by this class' Meteor methods */

function updateLearnScore(wordId, feedback){

   let score = Words_Attempts.findOne({ wordId, userId: Meteor.userId() }).learnScore;

   Words_Attempts.update(
      { wordId },
      {$set:
         { learnScore: learnScoreFormula(score, feedback) }
      }
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
                     learnScore : WORDATTEMPT_INITIAL_LEARNSCORE,
                     lastAttemptDate: createdTime,

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
                     score: nextStudyScoreFormula(word, curr_wordAttempt)
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
         let word = Courses_Words.findOne( {_id: questionObj.wordId} );

         if( Courses_Configs.findOne( { courseName, access: "public" } )    &&   word ){

            let isCorrect = QuestionMarker_Util.check(response, questionObj, word);

            if(!isCorrect){
               updateLearnScore( questionObj.wordId, "WRONG" );
            }

            return {
               isCorrect,
               word
            };

         }

      }

   },

   'learner.processFeedback': (feedback, questionObj, courseName) => {

      if( Roles.userIsInRole( Meteor.userId(), "LEARN" ) ){
         let word = Courses_Words.findOne( {_id: questionObj.wordId} );

         if( Courses_Configs.findOne( { courseName, access: "public" } )    &&   word ){

            updateLearnScore( questionObj.wordId, feedback );

         }

      }

   }

});
