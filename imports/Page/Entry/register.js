import React, {Component} from 'react';

import RegisterEntr_C from './Register/registerEntr';
import RegisterForm_C from './Register/registerForm';


class Register extends Component {

   static Page_Enum = {
      ENTRANCE: Symbol('ENTRANCE'),
      R_LEARNER: Symbol('R_LEARNER'),
      R_INSTRUCTOR: Symbol('R_INSTRUCTOR'),
   };

   constructor(){
      super();

      this.state = {
         page : Register.Page_Enum.ENTRANCE
      };

      this.updateRegPage = this.setPage.bind(this);
   }


   setPage(page_e){
      this.setState( { page: page_e } );
   }

   render(){
      /* Props explanation:
       * - "updateRegPage" is for parent function callback, invokable by child components ( this.updateRegPage ).
       *    passed in when callback is invoked.
       * - "TODO"
       */

      switch(this.state.page) {
         case     Register.Page_Enum.R_LEARNER :
            return ( <RegisterForm_C  updateRegPage={ this.updateRegPage }  userType={ Register.Page_Enum.R_LEARNER }  /> );
         case     Register.Page_Enum.R_INSTRUCTOR :
            return ( <RegisterForm_C  updateRegPage={ this.updateRegPage }  userType={ Register.Page_Enum.R_INSTRUCTOR } /> );
         default:
            return ( <RegisterEntr_C  updateRegPage={ this.updateRegPage }    /> );
      }

   }
}

export default Register;
