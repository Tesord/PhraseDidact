import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import EditWord_Form from './editWord/editWord_Form';

import Func_Util from '/imports/api/functional/func_Util';



class AddWord extends Component {


   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   getReadyAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Add</button>

      );
   }

   getLoadingAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Adding...</button>

      );
   }

   backToCourse(){
      var r = confirm("Discard this edit?");
      if (r === true) {
         this.context.router.history.push( "/course/" + this.props.match.params.courseName  + "/edit" );
      }
   }

   save(e){
      e.preventDefault();

      let l2_wordName = this.mainContent.l2_wordName_Ref.value;
      let l2_examples = this.mainContent.l2_examples_Ref.value;

      let l1_wordName = this.mainContent.l1_wordName_Ref.value;
      let l1_examples = this.mainContent.l1_examples_Ref.value;

      let difficultyLevel = this.mainContent.difficultyLevel_Ref.value;


      Meteor.call('instructor.addWord', this.props.match.params.courseName, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel, (err, result) => {

         if(err){
            this.handleErrors(err);
         }
         else{		// successful
            this.context.router.history.push( "/course/" + this.props.match.params.courseName  + "/edit" );
         }
      });


      this.setState( {     content:    this.getMainContent( this.getLoadingAnim() )    });

   }

   handleErrors(err){
      window.alert(err);

      this.setState( {     content:    this.getMainContent( this.getReadyAnim() )    });
   }


   /* TODO display content & search content */
   getMainContent( button ){

      return (
         <EditWord_Form    ref={(this_elem) => {this.mainContent = this_elem;} }
            isAdd = {true}
            funcContext = {this}
            save_Func = {this.save}
            backToCourse_Func = {this.backToCourse}
            button = { button }
         />
      );

   }

   isInstructorAction(){

      // Check if course is really made by user first
      Meteor.call('instructor.fetchCourseByUser', this.props.match.params.courseName, (err, result) => {
         if(result){
            this.setState( {
               content: this.getMainContent( this.getReadyAnim() )
            } );
         }
         else{
            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }

      });

      // makes mandatory transition appears seamless
      this.state = ( {
         content: <div></div>
      } );

   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }

   componentWillMount() {

      Func_Util.excluPageCheck_OnLoad(this, false, this.isInstructorAction, this.isOtherAction);

   }


   render(){
      return(
         <DocumentTitle title={"Add word pair: " + this.props.match.params.courseName + " - PhraseDidact"}  >
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
AddWord.contextTypes = {
	router: React.PropTypes.object
};

export default AddWord;
