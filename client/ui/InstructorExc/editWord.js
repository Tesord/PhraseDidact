import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import EditWord_Form from './editWord/editWord_Form';

import Func_Util from '/imports/api/functional/func_Util';

import Courses_Words from '/imports/collections/courses_Words';



class EditWord extends Component {


   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   getReadyAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Save</button>

      );
   }

   getLoadingAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Saving...</button>

      );
   }

   backToCourse(){
      var r = confirm("Discard this edit?");
      if (r === true) {
         this.context.router.history.push( "/course/" + this.props.match.params.courseName  + "/edit" );
      }
   }

   // TODO
   save(e){
      e.preventDefault();

      let l2_wordName = this.mainContent.l2_wordName_Ref.value;
      let l2_examples = this.mainContent.l2_examples_Ref.value;

      let l1_wordName = this.mainContent.l1_wordName_Ref.value;
      let l1_examples = this.mainContent.l1_examples_Ref.value;

      let difficultyLevel = this.mainContent.difficultyLevel_Ref.value;


      Meteor.call('instructor.editWord', this.props.match.params.wordPairId, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel, (err, result) => {

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
   getMainContent( button, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel  ){

      return (
         <EditWord_Form          ref={(this_elem) => {this.mainContent = this_elem;} }
            isAdd = {false}
            funcContext = {this}
            save_Func = {this.save}
            backToCourse_Func = {this.backToCourse}
            button = { button }
            l2_wordName = { l2_wordName }
            l2_examples = { l2_examples }
            l1_wordName = { l1_wordName }
            l1_examples = { l1_examples }
            difficultyLevel = { difficultyLevel }
         />
      );

   }

   isInstructorAction(){

      // Get required data from DB, while also checks whether user actually owns the course
      Meteor.subscribe("edit_Course_Words", this.props.match.params.courseName, {
         onReady: () => {     // matched, user actually owns the course

            let word_Pair = Courses_Words.findOne({ _id : this.props.match.params.wordPairId });

            this.setState( {
               content: this.getMainContent(
                  this.getReadyAnim(),
                  word_Pair.l2_wordName,
                  Func_Util.createStringNewLineSep_FromArray( word_Pair.l2_examples ),
                  word_Pair.l1_wordName,
                  Func_Util.createStringNewLineSep_FromArray( word_Pair.l1_examples ),
                  word_Pair.difficultyLevel
               )
            } );

         },
         onStop: () => {      // no match, user doesn't own the course!

            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
      } );


      // makes mandatory transition appears seamless
      this.setState( {
         content: <div></div>
      } );

   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }

   componentDidMount() {

      Func_Util.excluPageCheck_OnLoad(this, false, this.isInstructorAction, this.isOtherAction);

   }


   render(){
      return(
         <DocumentTitle title={"Edit word pair: " + this.props.match.params.wordPairId + " - PhraseDidact"}  >
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
EditWord.contextTypes = {
	router: React.PropTypes.object
};

export default EditWord;
