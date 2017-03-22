import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';

import Register_C from '../register';


class RegisterForm extends Component {

	funkyRadio_Handler(e){
		// Space Bar + Enter key toggle
		if (e.keyCode == 0 || e.keyCode == 32 || e.keyCode == 13) {
			// prevent bar-scrolling when space bar is clicked
			e.preventDefault();

			let forElementID = e.target.getAttribute("for");
			document.getElementById(forElementID).checked = true;
		}
	}

	componentDidMount(){
		/* Keyboard accessibility */

		this.back_button.addEventListener('keypress', function(e) {
			// Enter key toggle
			if (e.keyCode == 13) {
				e.target.click();
			}
		});

		this.signup_learner.addEventListener('keypress', this.funkyRadio_Handler );
		this.signup_instructor.addEventListener('keypress', this.funkyRadio_Handler );
	}


	onSumbit(){
		e.preventDefault();

		let username = this.refs.username_field.value.trim();
		let email = this.refs.email_field.value.trim();
		let password = this.refs.pwd_field.value.trim();

		Accounts.createUser({username, email, password}, (err) => {
  			console.log('Signup callback', err);

			// Client side will start to revert changes

		});

		// display loading UNTIL login method return ok status, then add user role
	}


	render(){

		return (
			<form id="register-form" className="_Theme_border_Default_ _Theme_register_Default_"
					onSumbit={	this.onSubmit.bind(this)	} >
				<img src="img/ui/back-button-wfilled-gb.svg" width="40rem" height="40rem" className="form-corner-button" tabIndex="0"
					onClick={ this.props.updateRegPage.bind(this, Register_C.Page_Enum.R_ENTRANCE )	}
					ref={ (this_elem) => {this.back_button = this_elem;} }/>

				<loginTitle className="h-center">	Sign up	</loginTitle>

				<div className="funkyradio">
					<div className="funkyradio-success">
		            <input type="radio" name="radio" id="signup-learner"
								defaultChecked={ this.props.userType === Register_C.Page_Enum.R_LEARNER } />
						<label htmlFor="signup-learner"	tabIndex="0"
							ref={ (this_elem) => {this.signup_learner = this_elem;} } >
								Learner
						</label>
		        	</div>

					<div className="funkyradio-primary">
		            <input type="radio" name="radio" id="signup-instructor"
								defaultChecked={ this.props.userType  === Register_C.Page_Enum.R_INSTRUCTOR } />
						<label htmlFor="signup-instructor"	tabIndex="0"
							ref={ (this_elem) => {this.signup_instructor = this_elem;} } >
								Instructor
						</label>
		        	</div>
				</div>

				<loginAnnon className="h-center">	Username		</loginAnnon>
				<input name="username" type="text" className="loginField		h-center		form-control"
	   				 placeholder='e.g. david_smith72 '		ref={	(this_elem) => (this.username_field = this_elem) }/>

				<loginAnnon className="h-center">	Email Address		</loginAnnon>
				<input name="email" type="email" className="loginField	h-center		form-control"
						 placeholder='e.g. " david.smith@example.com  '		ref={	(this_elem) => (this.email_field = this_elem) } />

				<loginAnnon className="h-center">	Password		</loginAnnon>
				<input name="password" type="password" className="loginField	h-center		form-control"
						 ref={	(this_elem) => (this.pwd_field = this_elem) } />

				<loginAnnon className="h-center">	Confirm Password		</loginAnnon>
				<input name="password2" type="password" className="loginField	h-center		form-control"/>

				<button onClick=""  className="bs-standard-btn 	rounded-border		btn-primary" >	Register	</button>
			</form>
		);
	}
};


export default RegisterForm;
