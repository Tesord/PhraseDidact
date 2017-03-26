import React, { Component } from 'react';

import LoadingCircle from '../Loading/loadingCircle';

import AccountConfigs from '/imports/collections/userAccount/accountConfigs';


class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.content__loading = ( <LoadingCircle /> );

		this.state = {
			content: this.content__loading
		};
	}


   componentDidMount() {

      Meteor.call('userAccount.checkIsInstructor', (err, result) => {


         console.log(result);


      } );

      this.loadingAnim();
   }

   loadingAnim(){
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
