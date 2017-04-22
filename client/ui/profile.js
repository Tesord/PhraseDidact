import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from './Loading/blueCircle_greyBG';

import DB_Const from '/imports/api/functional/db_Const';

import Learner_LProfile from '/imports/collections/learner_LProfile';



class Profile extends Component{

   constructor(){
      super();

   	this.state = {
         content: <BlueCircle_greyBG />
      };

   }

   createInfoArray(profile){

      let array = [];

      for(var key in profile){

         switch(key){
            case "gender":
               array.push( <div className="single-line-element">
                  { "Gender : " + DB_Const.GENDER__LEARNPROF[ profile[key] ] }
               </div> );
               break;

            case "birthday":
               array.push( <div className="single-line-element">
                  { "Birthday : " + profile[key] }
               </div> );
               break;

               

            case "_id":
            case "userId":
               break;

            default:
               array.push( <div className="single-line-element"> { key + " : " + profile[key] } </div> );
               break;
         }

      }

      return array;
   }


   componentDidMount(){
      Meteor.subscribe("learner_LProfile",  this.props.match.params.username, {
         onReady: () => {
            let result = Learner_LProfile.findOne();

            if(result){
               this.setState( {
                  content:

                     <div  id="user-profile-content" className="h-center-margin">
            				{ this.createInfoArray(result) }
            			</div>

               });
            }
            else{
               setTimeout( () => { window.location.replace("/notFound"); }, 500);
            }
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
