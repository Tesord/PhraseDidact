import React, {Component} from 'react';

import CommonUtil from './commonUtil';

class LearnerExc extends Component {

   static checkExc_return = {
      LEARNER: Symbol('LEARNER'),
      OTHER: Symbol('OTHER'),
      NOT_LOG: Symbol('NOT_LOG'),
      ERROR: Symbol('ERROR'),
   }

   static handleErrors(err){
      // TODO   Popup error or something...
      console.log('Error' + err);
   }

   static checkExc(){

      if(Meteor.userId()){
         let insCache = CommonUtil.getLoginCache_Role();

         // Try reading cache first
         if( insCache !== null ){

            if( insCache === "learner__Role"){
               return LearnerExc.checkExc_return.LEARNER;
            }
            else{
               return LearnerExc.checkExc_return.OTHER;
            }

         }
         else{
            // Cache not present, retrieve information from DB
            Meteor.call('userAccount.checkIsLearner', (err, isLearner) => {
               if(err){
                  LearnerExc.handleErrors(err);
                  return LearnerExc.checkExc_return.ERROR;
               }
               else{
                  if(isLearner){
                     CommonUtil.setLoginCache("learner__Role");
                     return LearnerExc.checkExc_return.LEARNER;
                  }
                  else{
                     CommonUtil.setLoginCache("instructor__Role");
                     return LearnerExc.checkExc_return.OTHER;
                  }
               }
            } );
         }

      }
      else{
         /* TODO Possible putting redirect references for /login page to go back to last visited URL (AFTER login)? */
         window.location.replace("login");

         // Since redirect is not instant, result must be fed back
         return LearnerExc.checkExc_return.NOT_LOG;
      }

   }


}

export default LearnerExc;
