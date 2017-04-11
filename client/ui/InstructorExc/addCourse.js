import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

import Func_Util from '/imports/api/functional/func_Util';



class AddCourse extends Component {

   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />
		};
	}


   isInstructorAction(){


   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("notFound"); }, 500);
   }

   componentWillMount() {

      let result = Func_Util.fetchIsInstructor_OnLoad();
      if( result !== 0 ){

         if( result > 0){
            this.isInstructorAction();
         }else{
            this.isOtherAction();
         }
      }

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
