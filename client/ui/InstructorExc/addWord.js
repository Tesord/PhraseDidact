import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

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
      if (r == true) {
         this.context.router.history.push("/course/" + this.props.match.params.courseName + "/edit");
      }
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

   handleErrors(err){
      window.alert(err);

      // let button = this.getReadyAnim();
      //
      // this.setState( {     content:    this.getCourseAdd( this.getReadyAnim() )    });
   }


   /* TODO display content & search content */
   getMainContent( button ){

      return (
         <div id="add-word-section">
            <form onSubmit={	this.save.bind(this)	}>
               <contentTitle>	Add word pair	</contentTitle>

               <hr className="_Theme_hr_Default_"/>

               <h3> Word to learn (L2) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     ref={	(this_elem) => (this.l2_wordName_Ref = this_elem) } />

                  <annotation>	Examples (separate each one by a new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     ref={	(this_elem) => (this.l2_examples_Ref = this_elem) } ></textarea>
               <br />

               <hr className="_Theme_hr_Default_"/>

               <h3> Native word (L1) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     ref={	(this_elem) => (this.l1_wordName_Ref = this_elem) } />

                  <annotation>	Examples (separate each one by a new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     ref={	(this_elem) => (this.l1_examples_Ref = this_elem) } ></textarea>

               <hr className="_Theme_hr_Default_"/>

               <div className="single-line-element">
                  { button }
                  <button className="pd-btn rounded-border	   align-right   btn-default"
                     onClick={ this.backToCourse.bind(this) } >
                     Back
                  </button>
               </div>
            </form>
         </div>

      );

   }

   isInstructorAction(){
      this.state = {
         content: this.getMainContent( this.getReadyAnim() )
      };
   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("notFound"); }, 500);
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
