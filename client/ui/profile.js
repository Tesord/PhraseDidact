import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from './Loading/blueCircle_greyBG';

import Learner_LProfile from '/imports/collections/learner_LProfile';



class Profile extends Component{

   constructor(){
      super();

   	this.state = {
         content: <BlueCircle_greyBG />
      };

   }


   componentDidMount(){

      Meteor.subscribe("learner_LProfile", this.props.match.params.username,  {
         onReady: () => {
            let result = Learner_LProfile.findOne();

            if(result){
               let array = [];

               for(var key in result){
                  array.push( <div className="single-line-element" key={key}> { key + " : " + result[key] } </div> );
               }


               this.setState( {
                  content:

                     <div  id="user-profile-content" className="h-center-margin">
            				   { array }
            			</div>

               });
            }
            else{
               setTimeout( () => { window.location.replace("/notFound"); }, 500);
            }

         }
      } );

      // makes mandatory transition appears seamless
      this.state = ( {
         content: <div></div>
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
