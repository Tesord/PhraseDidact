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


      this.updateRegPage = this.setPage.bind(this);
   }


   setPage(page_e){
      this.setState( { page: page_e } );
   }

   render(){
      switch(this.state.page) {
         case     this.Page_Enum.R_LEARNER :
            return ( <RegisterLearner_C  updateRegPage={ this.updateRegPage }   page_enum={ this.Page_Enum }   /> );
         case     this.Page_Enum.R_INSTRUCTOR :
            return ( <RegisterInstructor_C   updateRegPage={ this.updateRegPage }  page_enum={ this.Page_Enum }  /> );
         default:
            return ( <RegisterEntr_C   updateRegPage={ this.updateRegPage }  page_enum={ this.Page_Enum }  /> );
      }

   }
}

export default Register;
