import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';


import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';
import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';

import Func_Util from '/imports/api/functional/func_Util';
import Ui_Util from '/imports/api/render/ui_Util';


import Courses_Words from '/imports/collections/courses_Words';



class EditCourse extends Component {

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

   handleErrors(err){
      window.alert(err);

      // let button = this.getReadyAnim();
      //
      // this.setState( {     content:    this.getCourseAdd( this.getReadyAnim() )    });
   }


   /* TODO display content & search content */
   getMainContent( button, wordLearnList, nativeWordList ){

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
      this.course_Words = Courses_Words.find().fetch();

      this.setState( {
         content: this.getMainContent( this.getReadyAnim(), this.renderWordLearnList(), this.renderNativeWordList() )
      } );
   }
   renderWordLearnList(){
      return ( Ui_Util.create_EditingWordBlock(this.course_Words, true) );
   }
   renderNativeWordList(){
      return ( Ui_Util.create_EditingWordBlock(this.course_Words, false) );
   }
   

   save(e){
      e.preventDefault();

      // let courseName = this.courseName_Ref.value;
      // let access = this.access_Ref.getSelectedValue_OfRadioGroup();
      //
      //
      // let tags = this.tags_Ref.value;
      //
      //
      // Meteor.call('instructor.addCourse', courseName, access, tags, (err, result) => {
      //
      //    if(err){
      //       this.handleErrors(err);
      //    }
      //    else{		// successful
      //       this.context.router.history.push("editCourse/" + courseName);
      //    }
      // });
      //
      //
      // this.setState( {     content:    this.getCourseAdd( this.getLoadingAnim() )    });

   }

   isInstructorAction(){

      // also checks whether user actually owns the course
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
