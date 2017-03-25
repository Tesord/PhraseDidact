import React, { Component } from 'react';
import AccountConfigs from '/imports/collections/userAccount/accountConfigs'


class FillLearnerProfile extends Component {

   constructor() {
      super();

      Meteor.call('userAccount.checkIsInstructor', (err, result) => {


         console.log(result);


      } );

      //
   }


	render() {

		return (
			<div>
				<border>
					fhjfhjfh
				</border>
			</div>
		);
	}
};


export default FillLearnerProfile;
