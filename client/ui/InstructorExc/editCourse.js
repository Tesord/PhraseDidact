import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Instructor_Meth from '/imports/M_methods/instructor_Meth';

import WordList from './Course/wordList';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';
import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';

import Func_Util from '/imports/api/functional/func_Util';

import Courses_Words from '/imports/collections/courses_Words';



class EditCourse extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}


   handleErrors(err){
      window.alert(err);
   }


   /* TODO display content & search content */
   getMainContent( wordLearnList, nativeWordList ){

      return (
         <div id="edit-course-section">
            <contentTitle>	Editing: <b> {this.props.match.params.courseName} </b> 	</contentTitle>
            <hr className="_Theme_hr_Default_"/>

            <Link to={ "/course/" + this.props.match.params.courseName + "/addWord" }  type="button"
                  className="pd-btn  rounded-border	   btn-primary">Add word pair</Link>

            <hr className="_Theme_hr_Default_"/>

            <div id="l2-word-section" className="_Theme_outerBorder_Default_">
               <contentTitle>	Words to learn (L2)	</contentTitle>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {wordLearnList}

               </div>
            </div>

            <div id="l1-word-section" className="_Theme_register_Default_     _Theme_outerBorder_Default_">
               <contentTitle>	Native words (L1)	</contentTitle>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {nativeWordList}

               </div>
            </div>

         </div>

      );

   }

   load(){
      let courseWords_List = Courses_Words.find().fetch();

      this.setState( {
         content: this.getMainContent( this.renderWordLearnList(courseWords_List), this.renderNativeWordList(courseWords_List) )
      } );
   }
   renderWordLearnList(courseWords_List){
      return (
         <WordList
            courseWords_List = {courseWords_List}
            isL2 = {true}
            funcContext = {this}
            editBlock_func = {this.editBlock}
            removeBlock_func = {this.removeBlock}
         />
      );
   }
   renderNativeWordList(courseWords_List){
      return (
         <WordList
            courseWords_List = {courseWords_List}
            isL2 = {false}
            funcContext = {this}
            editBlock_func = {this.editBlock}
            removeBlock_func = {this.removeBlock}
         />
      );
   }


   editBlock(word_pair_id){

      this.context.router.history.push("/course/" + this.props.match.params.courseName + "/editWord/" + word_pair_id);
   }

   removeBlock(word_pair_id){

      var r = confirm("Remove this word pair (L2 + L1)?");

      if (r == true) {
         try {
            Meteor.call('instructor.removeWord', word_pair_id);
         } catch (err) {
            this.handleErrors(err);
         }

         this.load();
      }

   }


   isInstructorAction(){

      // Get required data from DB, while also checks whether user actually owns the course
      Meteor.subscribe("edit_Course_Words", this.props.match.params.courseName, {
         onReady: () => {     // matched, user actually owns the course
            this.load();
         },
         onStop: () => {      // no match, user doesn't own the course!

            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
      } );

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
         <DocumentTitle title={"Edit Course: " + this.props.match.params.courseName + " - PhraseDidact"}  >
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
EditCourse.contextTypes = {
	router: React.PropTypes.object
};

export default EditCourse;
