import React, {Component} from 'react';


class CommonUtil extends Component {
   

   static setLoginCache(role_String){
      localStorage.setItem("Role", role_String);
   }

   static getLoginCache_Role(){
      return localStorage.getItem('Role');
   }

   static validateEmail(email_address){
      let email_reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

      return email_reg.test( email_address ) ;
   }

}

export default CommonUtil;
