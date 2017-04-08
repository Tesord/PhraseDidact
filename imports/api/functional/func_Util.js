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




/* PhraseDidact specific */

export function setLoginCache(role_String){
   localStorage.setItem("Role", role_String);
}

export function getLoginCache_Role(){
   return localStorage.getItem('Role');
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
