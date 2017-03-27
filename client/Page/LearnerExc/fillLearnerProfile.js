import React, { Component } from 'react';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

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

                  FILL THIS IN PLEASE


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
			<div>
            {this.state.content}
			</div>
		);
	}
}


export default FillLearnerProfile;
