import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { DateField } from 'react-date-picker';



import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import Country_Select__C from './FillLearnerProfile/country_Select';
import Gender_Select__C from './FillLearnerProfile/gender_Select';
import Language_Select__C from './FillLearnerProfile/language_Select';

import Func_Util from '/imports/api/functional/func_Util';
import LearnerExc from '/imports/api/functional/learnerExc';
import Ui_Util from '/imports/api/render/ui_Util';


class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />
		};
	}

   /* TODO  Add REF to all components */

   isLearnerAction(){
      this.state = { content: (

         <div className="standard-content">
            <form id="learner-profile-section" className="h-center-margin">

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


                  <hr className="_Theme_hr_Default_"/>
                  <h3> First Language and Educational History </h3>
                  <br />

                  <annotation>  Where were you born?  	</annotation>
                  <Country_Select__C  classNameOfSelect="chosen-select"/>

                  <annotation>  How long did you live in the location where you were born?   </annotation>
                  <label> <input type="number" className="single-date-or-month-field      form-control-spinner" min="0" /> years </label>

                  <annotation>  How long did you live in the location where you were born?   </annotation>
                  <div id="slider1"></div>

               </div>
            </form>
         </div>

      )};
   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("notFound"); }, 500);
   }


   componentWillMount() {

      let result = LearnerExc.checkExcAndRespond();
      if( result !== 0 ){

         if( result > 0){
            this.isLearnerAction();
         }else{
            this.isOtherAction();
         }
      }

   }

   componentDidMount() {
      // ok to do so as in exceptional cases, the page will be redirected/reloaded
      $('.chosen-select').chosen({
         width: '50%',
         allow_single_deselect: true
      });

      $('.chosen-select-create-option').chosen({
         width: '100%',
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

      $('#slider1').labeledslider({ max: 6, tickInterval: 1 });
   }


	render() {

		return (
			<DocumentTitle title='Fill Learner Profile - PhraseDidact'>
            {this.state.content}
			</DocumentTitle>
		);
	}
}


export default FillLearnerProfile;
