import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import ICheck_Radio from '/imports/ui/iCheck_Radio';

import Func_Util from '/imports/api/functional/func_Util';



class AddCourse extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   getReadyAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Next</button>

      );
   }

   getLoadingAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Creating...</button>

      );
   }

   save(e){
      e.preventDefault();

      let courseName = this.courseName_Ref.value;
      let access = this.access_Ref.getSelectedValue_OfRadioGroup();

      let description = this.description_Ref.value;
      let tags = this.tags_Ref.value;


      Meteor.call('instructor.addCourse', courseName, access, description, tags, (err, result) => {

         if(err){
            this.handleErrors(err);
         }
         else{		// successful
            this.context.router.history.push("/course/" + courseName + "/edit");
         }
      });


      this.setState( {     content:    this.getMainContent( this.getLoadingAnim() )    });

   }

   handleErrors(err){
      window.alert(err);

      let button = this.getReadyAnim();

      this.setState( {     content:    this.getMainContent( this.getReadyAnim() )    });
   }


   getMainContent( button ){

      return (
         <div id="add-course-section">
            <form onSubmit={	this.save.bind(this)	}>
               <contentTitle>	Create Course	</contentTitle>

               <annotation>	Name	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                      ref={	(this_elem) => (this.courseName_Ref = this_elem) } />

               <annotation>	Access	</annotation>
               <label className="moderate-right-margin">
                  <ICheck_Radio radioName="access" value="public"  checked={true}
                     ref={(this_elem) => { this.access_Ref = ( this_elem ); } }   /> Public
               </label>
               <label className="moderate-right-margin">
                  <ICheck_Radio radioName="access" value="private"/> Private
               </label>
               <br /><br />

               <annotation>	Description	</annotation>
               <textarea rows="6"    maxLength="5000"
                  ref={	(this_elem) => (this.description_Ref = this_elem) } ></textarea>

               <annotation>	Tags (separate each one by space)	</annotation>
               <textarea rows="3"    maxLength="1000"
                  ref={	(this_elem) => (this.tags_Ref = this_elem) } ></textarea>
               <br /><br />

               {button}
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
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }

   componentWillMount() {

      Func_Util.excluPageCheck_OnLoad(this, false, this.isInstructorAction, this.isOtherAction);

   }


   render(){
      return(
         <DocumentTitle title='Add Course - PhraseDidact'>
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
AddCourse.contextTypes = {
	router: React.PropTypes.object
};

export default AddCourse;
