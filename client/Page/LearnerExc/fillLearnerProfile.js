import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import CountrySelect from './FillLearnerProfile/countrySelect';

import CommonUtil from '/imports/lib/commonUtil';
import LearnerExc from '/imports/lib/learnerExc';

class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />
		};
	}


   isLearnerAction(){
      this.state = { content: (

         <div className="standard-content">
            <form id="learner-profile-form" className="h-center-margin">

               <p>
                  Before you get started, please take a moment of your time to fill out this <b>Learner Profile </b>. <br/>
                  All information you fill in will be used by language specialists for research purposes. <br/>
                  <br/>
                  Filling in this form is not mandatory, but any contribution would greatly help out
                  language researchers in their mission to improve the learning process. <br/>
                  Thank you.
               </p>

               <annotation className="h-center-margin">	Gender	</annotation>
                  <div className="h-center-margin    pure-css-select-style theme-default">

                     <select     ref={(this_elem) => {this.gender = this_elem;} }>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                        <option value="PNS">Prefer not to say</option>
                     </select>

                  </div>

               <annotation className="h-center-margin">	Age	</annotation>



               <annotation className="h-center-margin">	Country of residence	</annotation>
               <CountrySelect/>

               <annotation className="h-center-margin">	Email Address / Username	</annotation>
               <input name="username" type="text" className="h-center-margin		form-control"         required
                      placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '
                      ref={	(this_elem) => (this.username_email_field = this_elem) }/>


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

      let result = LearnerExc.checkExc();

      if( result !== LearnerExc.checkExc_return.NOT_LOG &&
         result !== LearnerExc.checkExc_return.ERROR ){

         if( result === LearnerExc.checkExc_return.LEARNER){
            this.isLearnerAction();
         }else{
            this.isOtherAction();
         }
      }

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
