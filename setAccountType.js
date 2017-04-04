// import React, {Component} from 'react';
//
//
//
//
// /*
//  * USAGE: Should only be rendered in one location.
//  */
// class setAccountType extends Component {
//
//
//    constructor(){
//       super();
//
//       // if( Meteor.user() ){
//
//       // IF logged in...
//       if( Meteor.userId() ){
//
//
//          // if(){
//          //
//          // }else{
//          //
//          // }
//
//
//          // IF new user...
//
//
//          /************************** TODO fill with actual preview content */
//
//
//
//          this.content = (
//
//             <div id="setAccountType-content" className="h-center-margin">
//
//                <div  id="set-learner"   className="align-left  _Theme_border_Default_ _Theme_register_Default_">
//       				<h4>	Are you a learner?	</h4>
//
//       				<p>	Start learning languages completely free of charge!	</p>
//
//       				<button onClick= { this.setAccountType.bind( this, false) }
//                      className="outline-btn     btn-whitebg-blue">
//       					   Register as learner
//       				</button>
//                </div>
//
//
//                <div  id="set-instructor"   className="align-right  _Theme_border_Default_ _Theme_register_Default_">
//                   <h4>	Are you a language instructor / researcher?</h4>
//
//       				<p>	Get access to learner data and design your own language learning course!		</p>
//
//       				<button onClick= { this.setAccountType.bind( this, true ) }
//                      className="outline-btn     btn-whitebg-blue">
//       					   Register as instructor
//       				</button>
//                </div>
//
//             </div>
//
//          );
//
//          // IF account type is already set...
//
//       }
//       else{
//          // IF not logged in...
//
//          this.content = (
//             <div id="setAccountType-content"> SSSEETTTT </div>
//          );
//       }
//    }
//
//    setAccountType(isInstructor){
//       /* TODO Handle redirection after finished + loading animation */
//
//       Meteor.call('accountConfigs.setType', isInstructor);
//    }
//
//    render(){
//       return (
//          <div> {this.content} </div>
//       );
//    }
// }
//
//
// export default setAccountType;
