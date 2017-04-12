import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import ICheck_Radio from '/imports/ui/iCheck_Radio';

import Func_Util from '/imports/api/functional/func_Util';



class AddCourse extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />
		};
	}

   getCourseAdd(){

      return (
         <div id="add-course-section">
            <form>
               <contentTitle>	Create Course	</contentTitle>

               <annotation>	Name	</annotation>
               <input type="text" className="form-control"         required
                      ref={	(this_elem) => (this.courseName = this_elem) }/>

               <annotation>	Access	</annotation>
               <label className="moderate-right-margin">
                  <ICheck_Radio radioName="access" value="public"  checked={true} /> Public
               </label>
               <label className="moderate-right-margin">
                  <ICheck_Radio radioName="access" value="group"/> Group
               </label>
               <label className="moderate-right-margin">
                  <ICheck_Radio radioName="access" value="private"/> Private
               </label>
               <br /><br />

               <annotation>	Tags (separate each one by space)	</annotation>
               <textarea className="form-control" rows="2"></textarea>
               <br /><br />

               <button className="pd-btn  rounded-border	   btn-primary">Next</button>
             </form>
         </div>

      );

   }

   isInstructorAction(){
      this.state = {
         content: this.getCourseAdd()
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
         <DocumentTitle title='Add Course - PhraseDidact'>
            {this.state.content}
         </DocumentTitle>
      );
   }

}

export default AddCourse;
