import Words_Attempts from '/imports/collections/words_Attempts';

import Func_Util from '/imports/api/functional/func_Util';


export function check(response, questionObj, word){

   switch( questionObj.type ){
      case "TEXT":
         return text_Check(response, word);
   }

}

/* HELPER function of this class */
function answer_DBProc(word, isCorrect){

   if(isCorrect){
      Words_Attempts.update(
         { wordId :  word._id , userId : Meteor.userId() },
         { $inc:   {correctAttempts: 1, attempts: 1 },
           $set:   {lastAttemptDate: new Date() }    }
      );
   }
   else{
      Words_Attempts.update(
         { wordId :  word._id , userId : Meteor.userId() },
         { $inc:   {attempts: 1},
           $set:   {lastAttemptDate: new Date() } }
      );
   }

}


export function text_Check(response, word){

   if( Func_Util.replaceNewLinesWithSpace(response).trim().toUpperCase()   ===   word.l1_wordName.toUpperCase() ){
      answer_DBProc(word, true);
      return true;
   }
   else{
      answer_DBProc(word, false);
      return false;
   }

}
