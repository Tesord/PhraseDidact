import React, {Component} from 'react';

import RegisterEntr_C from './Register/registerEntr';
import RegisterLearner_C from './Register/registerLearner';
import RegisterInstructor_C from './Register/registerInstructor';


// TODO Maybe change color of register buttons


class Register extends Component {

   constructor(){
      super();


      this.Page_Enum = {
         ENTRANCE: Symbol('ENTRANCE'),
         R_LEARNER: Symbol('R_LEARNER'),
         R_INSTRUCTOR: Symbol('R_INSTRUCTOR'),
      };

      this.state = {
         page : this.Page_Enum.ENTRANCE
      };
   }


   setPage(page_e){
      this.setState( { page: page_e } );
   }

   render(){
      const updateRegPage = this.setPage.bind(this);

      switch(this.state.page) {
         case     this.Page_Enum.R_LEARNER :
            return ( <RegisterLearner_C  updateRegPage={ updateRegPage }    /> );
         case     this.Page_Enum.R_INSTRUCTOR :
            return ( <RegisterInstructor_C   updateRegPage={ updateRegPage }   /> );
         default:
            return ( <RegisterEntr_C   updateRegPage={ updateRegPage }  /> );
      }

   }
}

export default Register;
