import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Line } from 'rc-progress';


import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import LearnProf_page1 from './FillLearnerProfile/learnProf_page1';
import LearnProf_page2 from './FillLearnerProfile/learnProf_page2';
import LearnProf_page3 from './FillLearnerProfile/learnProf_page3';

import Func_Util from '/imports/api/functional/func_Util';
import LearnerExc from '/imports/api/functional/learnerExc';



/* TODO
 * - Autosave in background (save again when Next/Back button is pressed)
 * - Fill existing information in whenever a page is opened from DB
 */

/*
 * To add/remove Learn Profile pages:
 * - If adding, create a new " learnProf_page*number.* " js file in ./FillLearnerProfile, along with the code for the component.
 * - Add new case / remove case in this.getLearnProf_page()'s switch statement. Don't forget the import statement at the top
 *   of this file!
 * - Adjust this.LEARNPROF_MAXPAGE_NO as appropriate
 *
 * NOTE: The "get" functions of this class have parameter due to the fact that setState() must be called with all the changes
 * together at the same time, so the new values would not have been set yet when the "get" methods are called.
 */
class FillLearnerProfile extends Component {

   // The maximum number of pages in the Learner Profile. CHANGE this when more pages are added/removed.
   static LEARNPROF_MAXPAGE_NO = 7;


   constructor(){
		super();

      /* TODO use Session to store page user has got to? */

		this.state = {
			content: <BlueCircle_greyBG />,
         pageNo: 1,
         percentage: 0
		};
	}


   getLearnProf_Main(pageNo, percentage){

      return (

         <div className="standard-content">
            <div id="learner-profile-section" className="h-center-margin">

<<<<<<< HEAD
               <p>
                  Before you get started, please take a moment of your time to fill out this <b>Learner Profile </b>. <br/>
                  All information you fill in will be used by language specialists for research purposes. <br/>
                  <br/>
                  Filling in / completing this form is not mandatory, but any contribution would greatly help out
                  language researchers in their mission to improve the learning process. <br/>
                  Thank you. <br/><br/>
                  (<i>This form auto-saves</i>)
               </p>
=======
               { this.getLearnProf_page(pageNo) }
>>>>>>> c19c33124f2834b7524bd68fdbef91b04bfbaf0d

               <div className="single-line-element">
                  { this.getBackButton(pageNo) }
                  { this.getNextButton(pageNo) }
               </div>

<<<<<<< HEAD
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
=======
               <h3 className="single-line-element">
                  <div className="align-left"> Page { pageNo } of { FillLearnerProfile.LEARNPROF_MAXPAGE_NO } </div>
                  <div className="align-right"> { percentage }% </div>
               </h3>
               <Line percent={ percentage } strokeWidth="2" trailWidth="2" strokeColor={'#3FC7FA'} />

            </div>
         </div>

      );
   }

   /* HELPER of getLearnProf_Main() */
   getLearnProf_page(pageNo){

      switch( pageNo ) {
         case 2:
            return <LearnProf_page2 /> ;
         case 3:
            return <LearnProf_page3 /> ;
         default:
            return <LearnProf_page1 /> ;
      }

   }

   /* HELPER of getLearnProf_Main() */
   getBackButton(pageNo){
      if( pageNo <= 1 ){
         return "";
      }
      else{
         return(

            <a className="pd-btn rounded-border	   align-left   btn-default" href="javascript:void(0)"
               onClick={this.backPage.bind(this)} >
               Back
            </a>

         );
      }

   }

   /* HELPER of getLearnProf_Main() */
   getNextButton(pageNo){
      // TODO , onClick to finish
      if( pageNo >= FillLearnerProfile.LEARNPROF_MAXPAGE_NO ){
         return(

            <a className="pd-btn rounded-border	   align-right   btn-primary" href="javascript:void(0)">
               Finish
            </a>
         );
      }
      else{
         return(

            <a className="pd-btn rounded-border	   align-right   btn-primary" href="javascript:void(0)"
               onClick={this.nextPage.bind(this)} >
               Next
            </a>

         );
      }
   }
>>>>>>> c19c33124f2834b7524bd68fdbef91b04bfbaf0d


   backPage(e){
      e.preventDefault();

      /* TODO send form information to DB again*/


      let newPageNo = this.state.pageNo - 1;
      let newPercentage = Math.round( (newPageNo - 1) * 100 / FillLearnerProfile.LEARNPROF_MAXPAGE_NO );


      this.setState({
			content: this.getLearnProf_Main(newPageNo, newPercentage),
         pageNo: newPageNo,
         percentage: newPercentage
		});
   }


   nextPage(e){
      e.preventDefault();

      /* TODO send form information to DB again*/


      let newPercentage = Math.round( this.state.pageNo * 100 / FillLearnerProfile.LEARNPROF_MAXPAGE_NO );
      let newPageNo = this.state.pageNo + 1;


      this.setState({
			content: this.getLearnProf_Main(newPageNo, newPercentage),
         pageNo: newPageNo,
         percentage: newPercentage
		});
   }


   isLearnerAction(){
      this.state = {
         content: this.getLearnProf_Main( this.state.pageNo, this.state.percentage ),
         pageNo: this.state.pageNo,
         percentage: this.state.percentage
      };
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

<<<<<<< HEAD
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

=======
>>>>>>> c19c33124f2834b7524bd68fdbef91b04bfbaf0d

	render() {

		return (
			<DocumentTitle title='Fill Learner Profile - PhraseDidact'>
            {this.state.content}
			</DocumentTitle>
		);

	}
}


export default FillLearnerProfile;
