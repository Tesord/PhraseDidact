import React, { Component } from 'react';

import LoadingCircle from '../Loading/loadingCircle';

import AccountConfigs from '/imports/collections/userAccount/accountConfigs';


class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.state = {
			content: <LoadingCircle />
		};
	}


   componentDidMount() {

      Meteor.call('userAccount.checkIsInstructor', (err, result) => {

         // !result = Learner
         if(!result){

            // TODO

         }  // else is Instructor
         else{
            // redirect without being recorded in Browser Back button history
            window.location.replace("notFound");
         }

      } );

      this.loadingScreen();
   }

   loadingScreen(){
      LoadingCircle.show();
   }
   componentWillUnmount() {
      LoadingCircle.hide();
   }


	render() {

		return (
			<div>
            {this.state.content}
			</div>
		);
	}
}


export default FillLearnerProfile;
