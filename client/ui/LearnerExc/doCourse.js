import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import Tipped_WordnListTooltip from '/imports/ui/tipped_WordnListTooltip';

import Func_Util from '/imports/api/functional/func_Util';



class DoCourse extends Component {

   constructor(){
		super();

		this.state = {
         questionData: {},
			control: getReadyAnim(false)
		};
	}

   getReadyAnim(isAnswered){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Answer</button>

      );
   }

   getLoadingAnim(isAnswered){
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


   getMainContent( button, result ){

      switch (this.questionType){
         case "TEXT":
            return this.getTextQuestion( button, result );
         default:
            return (<div></div>)
      }

   }
   getTextQuestion( button, result ){
      return(
         <div id="do-course-content">
            <div id="do-course-main"    className="_Theme_outerBorder_Default_">

               <contentTitle> Translate this word </contentTitle>
               <br/>
               <div id="question-simpleText-section" className="_Theme_innerBorder_Default_">

                  <Tipped_WordnListTooltip
                     word={result.l2_wordName}
                     word_id="question-simpleText-word"
                     list={result.l2_examples}
                  />

               </div>

               <textarea rows="4"    id="answer-simpleText-section"    className="no-resize   form-control"
                  maxLength="230"    required
                  ref={	(this_elem) => (this.answer_Ref = this_elem) } >
               </textarea>

            </div>
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
            this.questionType = result.type;

            this.setState( {
               questionData: result,
               control: this.getReadyAnim( false )
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
