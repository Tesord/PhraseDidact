import React, { Component } from 'react';

import Circle_greyBG from '../Loading/circle_greyBG';



class FillLearnerProfile extends Component {

   constructor(){
		super();

		this.state = {
			content: <Circle_greyBG />
		};
	}


   componentDidMount() {

      Meteor.call('userAccount.checkIsLearner', (err, result) => {

         // result = Learner
         if(result){

            this.setState({ content: (

               <div>
                  FILL THIS IN PLEASE
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
