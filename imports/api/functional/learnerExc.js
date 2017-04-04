import React, {Component} from 'react';

import Func_Util from './func_Util';


class LearnerExc extends Component {

   static handleErrors(err){
      // TODO   Redirect to error page and Popup error or something...
      console.log('Error' + err);
   }

   /* TODO document this method. Return 1 if cache indicates is Learner, -1 if cache indicates it is not.
    * 0 if database check is required */
   static checkExcAndRespond(){

      if(Meteor.userId()){
         let insCache = Func_Util.getLoginCache_Role();

         // Try reading cache first
         if( insCache !== null ){

            if( insCache === "LEARN" ){
               return 1;
            }
            else{
               return -1;
            }

         }
         else{
            // Cache not present, retrieve information from DB
            Meteor.call('userAccount.checkIsLearner', (err, isLearner) => {
               if(err){
                  LearnerExc.handleErrors(err);
               }
               else{
                  if(isLearner){
                     Func_Util.setLoginCache( "LEARN" );
                  }
                  else{
                     Func_Util.setLoginCache( "INSTR" );
                  }

                  if( Func_Util.isLocalStorageSupported() ){
                     location.reload();
                  } else{
                     this.context.router.history.push("");     // prevent infinite loop
                  }
               }
            } );

            return 0;
         }

      }
      else{
         /* TODO Possible putting redirect references for /login page to go back to last visited URL (AFTER login)? */
         window.location.replace("login");

         // Since redirect is not instant, result must be fed back
         return 0;
      }

   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
LearnerExc.contextTypes = {
	router: React.PropTypes.object
};

export default LearnerExc;
