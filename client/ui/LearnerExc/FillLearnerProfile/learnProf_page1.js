import React, {Component} from 'react';
import { DateField } from 'react-date-picker';


import Country_Select__C from './country_Select';
import Gender_Select__C from './gender_Select';
import Language_Select__C from './language_Select';

import Ui_Util from '/imports/api/render/ui_Util';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page1 extends Component {

   render() {
      return(

         <div>

            <p>
               Before you get started, please take a moment of your time to fill out this <b>Learner Profile </b>. <br/>
               All information you fill in will be used by language specialists for research purposes. <br/>
               <br/>
               Filling in / completing this form is not mandatory, but any contribution would greatly help out
               language researchers in their mission to improve the learning process. <br/>
               Thank you. <br/><br/>
               (<i>This form auto-saves</i>)
            </p>

            <div id="learner-profile-form" className="h-center-margin">

               <annotation>	Gender	</annotation>
               <Gender_Select__C    classNameOfSelect="chosen-select" />

               <annotation>	Birthday (YYYY-MM-DD)	</annotation>
               <DateField  dateFormat="YYYY-MM-DD" className="h-center-margin" />


               <hr className="_Theme_hr_Default_"/>
               <h3> Residence </h3>
               <br />

               <annotation>	Current Country of residence	</annotation>
               <Country_Select__C   classNameOfSelect="chosen-select" />

               <annotation>	What is the official Language(s) of your country?	</annotation>
               <Language_Select__C  classNameOfSelect="chosen-multiselect-Lang"   isSingle={false}/>

               <annotation>   What is the dominant Language of the city where you currently reside? 	</annotation>
               <Language_Select__C  classNameOfSelect="chosen-select-create-option"   isSingle={true}/>

               <br /><br /><br /><br /><br /><br /><br />

            </div>
         </div>

      );
   }

   componentDidMount() {

      // ok to do so as in exceptional cases, the page will be redirected/reloaded
      $('.chosen-select').chosen({
         width: '50%',
         allow_single_deselect: true
      });

      $('.chosen-select-create-option').chosen({
         width: '50%',
         allow_single_deselect: true,

         no_results_text: Ui_Util.no_result_text_create_option ,
         create_option: true
      });

      $('.chosen-multiselect-Lang').chosen({
         width: '100%',

         no_results_text: Ui_Util.no_result_text_create_option ,
         max_selected_options: 10,   // Max select limit
         single_backstroke_delete: false,

         create_option: true
      });

   }

};

export default LearnProf_page1;
