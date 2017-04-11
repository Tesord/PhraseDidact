import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from './Loading/blueCircle_greyBG';

import LearnerProfile from '/imports/collections/learnerProfile';



class Profile extends Component{

   constructor(){
      super();

   	this.state = {
         content: <BlueCircle_greyBG />
      };


      Meteor.subscribe("learnerProfile",  {
         onReady: () => {
            let result = LearnerProfile.findOne();

            let array = [];

            for(var key in result){
               array.push( <div className="single-line-element"> { key + " : " + result[key] } </div> );
            }



            this.setState( {
               content:

                  <div  id="user-profile-section" className="h-center-margin">
         				   { array }
         			</div>

            });
         }
      } );

   }



	render(){
		return (
			<DocumentTitle title={this.props.match.params.username + "\'s profile - PhraseDidact"} >
            {this.state.content}
			</DocumentTitle>
		);
	}
}

export default Profile;
