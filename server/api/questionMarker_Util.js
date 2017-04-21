import Words_Attempts from '/imports/collections/words_Attempts';

import Func_Util from '/imports/api/functional/func_Util';


export function check(response, questionObj, word){

   switch( questionObj.type ){
      case "TEXT":
         return text_Check(response, word);
   }

}


export function text_Check(response, word){

   if( Func_Util.replaceNewLinesWithSpace(response).trim().toUpperCase()   ===   word.l1_wordName.toUpperCase() ){
      Words_Attempts.update(
         { wordId :  word._id , userId : Meteor.userId() },
         {$inc:   {correctAttempts: 1, attempts: 1 }  }
      );

      return true;
   }
   else{
      Words_Attempts.update(
         { wordId :  word._id , userId : Meteor.userId() },
         {$inc:   {attempts: 1}     }
      );

      return false;
   }

}
