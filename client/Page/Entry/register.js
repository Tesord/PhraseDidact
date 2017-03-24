import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';


class Register extends Component {

	sre(){
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


	flip(){
		document.getElementById("login-content").style.transform = "rotateY(0deg)";
		document.getElementById("login-content").style.height = "0rem";
	}

	render(){

		return (
			<form id="register-form" className="_Theme_border_Default_ _Theme_register_Default_"
					onSubmit={	this.sre.bind(this)	} >

				<loginTitle className="h-center">	Sign up	</loginTitle>


				<p className="h-center">
					Start by first creating an account here. <br/>
					You will pick the type of the account later!
				</p>

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

				<a className="loginBigLink  h-center" href="javascript:void(0)" onClick={this.flip.bind(this)}>
					Back to login
				</a>
			</form>
		);
	}
};


export default Register;
