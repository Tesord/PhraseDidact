// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
//
// import Register_C from '../register';
//
//
// class RegisterEntr extends Component {
//
//    flip(){
//       document.getElementById("login-content").style.transform = "rotateY(0deg)";
//       document.getElementById("login-content").style.height = "0rem";
//    }
//
// 	render(){
//
// 		return (
// 			<div id="register-form" className="_Theme_border_Default_ _Theme_register_Default_">
// 				<h3>	Don't have an account? <br/>
// 						Create one now!</h3>
//
// 				<hr className="_Theme_hr_Default_"/>
//
// 				<h4>	Are you a learner?	</h4>
// 				<registerDesc>	Start learning languages completely free of charge!	</registerDesc>
// 				<button onClick= { this.props.updateRegPage.bind( this, Register_C.Page_Enum.R_LEARNER ) }
//                className="outline-btn     btn-whitebg-blue">
// 					   Register as learner
// 				</button>
//
// 				<br /><br /><br />
//
// 				<h4>	Are you a language instructor / researcher?</h4>
// 				<registerDesc>	Get access to learner data and design your own language learning course!		</registerDesc>
// 				<button onClick= { this.props.updateRegPage.bind( this, Register_C.Page_Enum.R_INSTRUCTOR ) }
//                className="outline-btn     btn-whitebg-blue">
// 					   Register as instructor
// 				</button>
//
// 				<a className="loginBigLink  h-center-margin" href="javascript:void(0)" onClick={this.flip.bind(this)}>
//                Back to login
//             </a>
// 			</div>
// 		);
//
// 	}
// };
//
//
// export default RegisterEntr;
