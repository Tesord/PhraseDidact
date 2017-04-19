import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import Func_Util from '/imports/api/functional/func_Util';



class DoCourse extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   getReadyAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Answer</button>

      );
   }

   getLoadingAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Answering...</button>

      );
   }

   // save(e){
   //    e.preventDefault();
   //
   //    let courseName = this.courseName_Ref.value;
   //    let access = this.access_Ref.getSelectedValue_OfRadioGroup();
   //
   //    let description = this.description_Ref.value;
   //    let tags = this.tags_Ref.value;
   //
   //
   //    Meteor.call('instructor.addCourse', courseName, access, description, tags, (err, result) => {
   //
   //       if(err){
   //          this.handleErrors(err);
   //       }
   //       else{		// successful
   //          this.context.router.history.push("/course/" + courseName + "/edit");
   //       }
   //    });
   //
   //
   //    this.setState( {     content:    this.getMainContent( this.getLoadingAnim() )    });
   //
   // }

   handleErrors(err){
      window.alert(err);

      this.setState( {     content:    this.getMainContent( this.getReadyAnim() )    });
   }


   getMainContent( button ){

      return (
         <div className="standard-content">
            SOMETHING HERER
         </div>

      );

   }

   isLearnerAction(){
      Meteor.call("learner.doCourse", this.props.match.params.courseName , (err, result) => {
         if(err){
            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
         else{
            this.state = {
               content: this.getMainContent( this.getReadyAnim() )
            };
         }

      });

      
   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }

   componentWillMount() {

      Func_Util.excluPageCheck_OnLoad(this, true, this.isLearnerAction, this.isOtherAction);

   }


   render(){
      return(
         <DocumentTitle title={ "Course: " + this.props.match.params.courseName + " - PhraseDidact" } >
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
DoCourse.contextTypes = {
	router: React.PropTypes.object
};

export default DoCourse;
