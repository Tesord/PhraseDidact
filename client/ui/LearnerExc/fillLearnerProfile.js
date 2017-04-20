import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Line } from 'rc-progress';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import LearnProf_page1 from './FillLearnerProfile/learnProf_page1';
import LearnProf_page2 from './FillLearnerProfile/learnProf_page2';
import LearnProf_page3 from './FillLearnerProfile/learnProf_page3';
import LearnProf_page4 from './FillLearnerProfile/learnProf_page4';

import Func_Util from '/imports/api/functional/func_Util';



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
   static LEARNPROF_MAXPAGE_NO = 4;


   constructor(){
		super();

      /* TODO use Session to store page user has got to? */

		this.state = {
			content: <BlueCircle_greyBG />,
         pageNo: 1,
         percentage: 0
		};
	}


   getMainContent(pageNo, percentage){

      return (

         <div id="learner-profile-content">

               { this.getLearnProf_page(pageNo) }

               <div className="single-line-element">
                  { this.getBackButton(pageNo) }
                  { this.getNextButton(pageNo) }
               </div>

               <h3 className="single-line-element">
                  <div className="align-left"> Page { pageNo } of { FillLearnerProfile.LEARNPROF_MAXPAGE_NO } </div>
                  <div className="align-right"> { percentage }% </div>
               </h3>
               <Line percent={ percentage } strokeWidth="2" trailWidth="2" strokeColor={'#3FC7FA'} />

         </div>

      );
   }

   /* HELPER of getMainContent() */
   getLearnProf_page(pageNo){

      switch( pageNo ) {
         case 2:
            return <LearnProf_page2    ref={ (this_elem) => {this.currentPage = this_elem} } /> ;
         case 3:
            return <LearnProf_page3    ref={ (this_elem) => {this.currentPage = this_elem} } /> ;
         case 4:
            return <LearnProf_page4    ref={ (this_elem) => {this.currentPage = this_elem} } /> ;
         default:
            return <LearnProf_page1    ref={ (this_elem) => {this.currentPage = this_elem} } /> ;
      }

   }

   /* HELPER of getMainContent() */
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

   /* HELPER of getMainContent() */
   getNextButton(pageNo){
      // TODO , onClick to finish
      if( pageNo >= FillLearnerProfile.LEARNPROF_MAXPAGE_NO ){
         return(

            <a className="pd-btn rounded-border	   align-right   btn-primary" href="javascript:void(0)"
               onClick={this.finish.bind(this)} >
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


   save(){
      this.currentPage.save();
   }


   backPage(e){
      e.preventDefault();
      this.save();


      let newPageNo = this.state.pageNo - 1;
      let newPercentage = Math.round( (newPageNo - 1) * 100 / FillLearnerProfile.LEARNPROF_MAXPAGE_NO );


      this.setState({
			content: this.getMainContent(newPageNo, newPercentage),
         pageNo: newPageNo,
         percentage: newPercentage
		});
   }


   nextPage(e){
      e.preventDefault();
      this.save();


      let newPercentage = Math.round( this.state.pageNo * 100 / FillLearnerProfile.LEARNPROF_MAXPAGE_NO );
      let newPageNo = this.state.pageNo + 1;


      this.setState({
			content: this.getMainContent(newPageNo, newPercentage),
         pageNo: newPageNo,
         percentage: newPercentage
		});
   }

   finish(e){
      e.preventDefault();
      this.save();

      this.context.router.history.push("/user/" + Meteor.user().username + "/profile/");
   }


   isLearnerAction(){
      this.state = {
         content: this.getMainContent( this.state.pageNo, this.state.percentage ),
         pageNo: this.state.pageNo,
         percentage: this.state.percentage
      };
   }


   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }


   componentWillMount() {

      Func_Util.excluPageCheck_OnLoad(this, true, this.isLearnerAction, this.isOtherAction)

   }


	render() {

		return (
			<DocumentTitle title='Fill Learner Profile - PhraseDidact'>
            {this.state.content}
			</DocumentTitle>
		);

	}
}


FillLearnerProfile.contextTypes = {
	router: React.PropTypes.object
};

export default FillLearnerProfile;
