import React, { Component } from 'react';

import Blue_Circle from '../Loading/blue_Circle';



class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.state = {
			content: <Blue_Circle />
		};
	}


   componentDidMount() {

      Meteor.call('userAccount.checkIsLearner', (err, result) => {

         // result = Learner
         if(result){

            this.setState({ content: (

               <div className="standard-content">
                  <form id="learner-profile-form" className="h-center-margin">

                        FILL THIS IN PLEASE


                  </form>
               </div>

            )});

         }  // else is Instructor
         else{
            // redirect without being recorded in Browser Back button history
            window.location.replace("notFound");
         }

      } );

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
