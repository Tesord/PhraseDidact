import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';
import Tipped_WordnListTooltip from '/imports/ui/tipped_WordnListTooltip';

import Func_Util from '/imports/api/functional/func_Util';



class DoCourse extends Component {

   constructor(){
		super();

      this.question = {};
      this.answered = false;

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   handleErrors(err){
      window.alert(err);

      this.setState( {     content:    this.getMainContent( this.getReadyAnim() )    });
   }

   getReadyAnim(){

      if(this.answered){

      }
      else{
         return (

            <div id="do-course-control-bottom"   className="_Theme_questionControl_Default_">
               <button className="pd-btn rounded-border	align-right     btn-primary">Answer</button>
            </div>

         );
      }
   }

   getLoadingAnim(){

      return (

         <div id="do-course-control-bottom"   className="_Theme_questionControl_Default_">
            <button className="pd-btn rounded-border	 align-right        btn-primary    disabled" disabled aria-disabled="true">Answering...</button>
         </div>

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

   checkAnswer_SimpleText(e){
      e.preventDefault();

      this.answered = true;

      Meteor.call('learner.answerQuestion', this.answer_Ref.value, this.question, this.props.match.params.courseName, (err, result) => {

         if(err){
            this.handleErrors(err);
         }
         else{		// successful

            console.log( result );

         }
      });
   }


   getMainContent( control, result ){

      switch ( this.question.type ){
         case "TEXT":
            return this.getQuestion_SimpleText( control, result );
         default:
            return (<div></div>)
      }

   }
   getQuestion_SimpleText( control, result ){
      return(
         <div id="do-course-content">
            <form id="do-course-main"    className="_Theme_outerBorder_Default_"
               onSubmit={ this.checkAnswer_SimpleText.bind( this ) } >

               <div id="do-course-data-top">

                  <contentTitle> Translate this word </contentTitle>
                  <br/>
                  <div id="question-simpleText-section" className="_Theme_innerBorder_Default_">

                     <Tipped_WordnListTooltip
                        word={ this.question.l2_wordName }
                        word_id="question-simpleText-word"
                        list={ this.question.l2_examples }
                     />

                  </div>

                  <textarea rows="4"    id="answer-simpleText-section"    className="no-resize   form-control"
                     maxLength="230"    required
                     ref={	(this_elem) => (this.answer_Ref = this_elem) } >
                  </textarea>

               </div>

               {control}

            </form>
         </div>
      );
   }


   isLearnerAction(){
      Meteor.call("learner.getNextQuestion", this.props.match.params.courseName , (err, result) => {
         if(err){
            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
         else{
            this.question = result;

            this.setState( {
               content: this.getMainContent( this.getReadyAnim() )
            });

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
