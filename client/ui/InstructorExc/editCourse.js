import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import shortid from 'shortid';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';
import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';
import Picture_Button from '/imports/ui/picture_Button';

import Func_Util from '/imports/api/functional/func_Util';

import Courses_Words from '/imports/collections/courses_Words';
import Courses_Configs from '/imports/collections/courses_Configs';



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
      let courseWords_List = Courses_Words.find({ courseId : this.courseId }).fetch();

      this.setState( {
         content: this.getMainContent(
            this.create_EditingWordBlock(courseWords_List, true),
            this.create_EditingWordBlock(courseWords_List, false)
         )
      } );
   }
   create_EditingWordBlock(courseWords_List, isL2){

      let resultList = [];

      let html_Ver_Examples = [];
      let wordName = "";
      let uniqueId = "";

      for(let word_pair   of    courseWords_List){
         if( isL2 ){
            html_Ver_Examples = word_pair.l2_examples.map(
               this.create_EditingWordBlock__MapFunc
            );

            wordName = word_pair.l2_wordName;
         }
         else{
            html_Ver_Examples = word_pair.l1_examples.map(
               this.create_EditingWordBlock__MapFunc
            );

            wordName = word_pair.l1_wordName;
         }

         uniqueId = shortid.generate();

         resultList.push(
            <div key={"ewb" + uniqueId}  className="editing-word-block    _Theme_innerItem_Default_">
               <Picture_Button
                  imgURL="/ui/img/close_cross_in_circular_outlined_interface.svg"
                  className="align-right pointer-hover"      width="30rem" height="30rem"
                  actFunction={ this.removeBlock }
                  actFuncParams={ word_pair._id }
                  functionContext={ this }
               />
               <Picture_Button
                  imgURL="/ui/img/Edit_Notepad_Icon.svg"
                  className="align-right pointer-hover  moderate-right-margin"      width="27rem" height="27rem"
                  actFunction={ this.editBlock }
                  actFuncParams={ word_pair._id }
                  functionContext={ this }
               />

               <h4>{ wordName }</h4>
               <div className="single-line-element align-right"> Difficulty: { word_pair.difficultyLevel } </div>
               <br/>

               <div className="_Theme_exampleText_Default_">{ html_Ver_Examples }</div>
            </div>
         );
      }

      return resultList;
   }
   /* HELPER function of create_EditingWordBlock() */
   create_EditingWordBlock__MapFunc(line_Of_Example){
      uniqueId = shortid.generate();

      return ( <div     key={"exam" + uniqueId}> - {line_Of_Example} <br/></div> );
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

      // Add required data from DB to local DB, this also checks whether user actually owns the course
      Meteor.subscribe("edit_Course_Words", this.props.match.params.courseName, {
         onReady: () => {     // matched, user actually owns the course

            // now just need to get courseId to further filter the words that belong to the currently displayed course
            Meteor.subscribe("single_Created_Course", this.props.match.params.courseName, {

               onReady: () => {
                  this.courseId = Courses_Configs.findOne( { courseName : this.props.match.params.courseName} )._id;

                  this.load();
               },
               onStop: () => {      // if error occurs here, it is some sort of technical error
                  /* TODO change to "Something went wrong" or something page */
                  setTimeout( () => { window.location.replace("/notFound"); }, 500);
               }
            });

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
