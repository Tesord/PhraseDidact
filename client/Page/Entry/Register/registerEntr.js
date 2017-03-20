import React, {Component} from 'react';
import { Link } from 'react-router';


// ************************* TODO           Handle Props 	from 		register.js


class RegisterEntr extends Component {


   flip(){
      $(" #login-content ").css("transform","rotateY(0deg)");
      $(" #login-content ").css("height", 0 + "rem" );
   }


	render(){

		return (
			<div id="register-form" className="_Theme_border_Default_ _Theme_register_Default_">
				<h3>	Don't have an account? <br/>
						Create one now!</h3>

				<hr className="_Theme_hr_Default_"/>

				<h4>	Are you a student?	</h4>
				<registerDesc>	Start learning languages completely free of charge!	</registerDesc>
				<button onClick= { this.props.updateRegPage.bind( this, this.props.page_enum.R_LEARNER) }
               className="outline-btn     btn-whitebg-blue">
					Register as student
				</button>

				<br /><br /><br />

				<h4>	Are you a language instructor / researcher?</h4>
				<registerDesc>	Get access to learner data and design your own language learning course!		</registerDesc>
				<button onClick= { this.props.updateRegPage.bind(this, this.props.page_enum.R_INSTRUCTOR) }
               className="outline-btn     btn-whitebg-blue">
					Register as instructor
				</button>

				<a className="loginBigLink  h-center" href="javascript:void(0)" onClick={this.flip.bind(this)}>	Back to login </a>
			</div>
		);

	}
};


export default RegisterEntr;
