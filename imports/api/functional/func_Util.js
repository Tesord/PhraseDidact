import React from 'react';


/* General JS Helper functions */

export function removeFromArrayByIndex_ARNI(index, array){

   if(index >= 0 && index < array.length){
      return array.slice(0, index).concat( array.slice(index + 1) );
   }
   else{
      return array;
   }

}


export function createStringNewLineSep_FromArray(array){
   let resultString = "";

   for(let i = 0; i < array.length; i++){
      if(i === (array.length - 1) ){
         resultString = resultString + array[i];
      }
      else{
         resultString = resultString + array[i] + '\n';
      }
   }

   return resultString;
}




/* PhraseDidact specific */

export function setLoginCache(role_String){
   localStorage.setItem("Role", role_String);
}

export function handleDBErrors(err){
   // TODO   Redirect to error page and Popup error or something...
   window.alert(err);
}



/* TODO document this method.
 *
 * IMPORTANT: Will redirect to login if user is not logged in + Will refresh page if check with database is required!
 * Modify localStorage
 */
export function excluPageCheck_OnLoad(context, isLearner, isRoleAction_Func, isOtherAction_Func){

   if(Meteor.userId()){

      let result = null;

      if( isLearner ){
         result = fetchAccountType_OnLoad();
      }
      else{
         result = fetchIsInstructor();
      }

      if( result !== 0 ){
         let bindedFunc = null;

         if( result > 0){
            bindedFunc = isRoleAction_Func.bind( context );
         }else{
            bindedFunc = isOtherAction_Func.bind( context );
         }

         bindedFunc();
      }

      // "error occured" case is handled by     fetchAccountType_OnLoad() / fetchIsInstructor()

   }
   else{
      /* TODO Possible putting redirect references for /login page to go back to last visited URL (AFTER login)? */
      window.location.replace("/login");
   }

}
/* HELPER of excluPageCheck_OnLoad() */
function fetchIsInstructor(){

   let result = fetchAccountType_OnLoad();

   if(result > 0){
      return -1;
   }
   else if(result < 0){
      return 1;
   }

   return result;

}


/* TODO
 * A faster way to check Account Type, when the user first enter a Learner/Instructor exclusive page
 * -1 = Instuctor, 1 = Learner, 0 = not logged in / error occured
 *
 * IMPORTANT: Will refresh page if check with database is required!
 */
export function fetchAccountType_OnLoad(){

   if(!Meteor.userId()){
      return 0;
   }
   else{

      let insCache = localStorage.getItem('Role');

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
               handleDBErrors(err);
            }
            else{
               if(isLearner){
                  setLoginCache( "LEARN" );
               }
               else{
                  setLoginCache( "INSTR" );
               }

               /* TODO  warning: infinite loop if localStorage is unsupported
                * Perhaps add localStorage alternate support? */
               location.reload();
            }
         } );

         return 0;
      }

   }

}



export function isLocalStorageSupported() {
   var dummy = 'dummyData';
   try {
      localStorage.setItem(dummy, dummy);
      localStorage.removeItem(dummy);
      return true;
   } catch(e) {
      return false;
   }
}

export function validateEmail(email_address){
   let email_reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

   return email_reg.test( email_address ) ;
}
