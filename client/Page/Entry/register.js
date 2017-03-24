import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';



/* TODO Validation
   - Email address format validation       {DONE}
   - Non-empty form input           {DONE}
   - Username avail
   - Password matching
   - Email avail
* /


/*
 * USAGE: Should only be rendered in one location.
 */
class Register extends Component {

	constructor(){
		super();

		this.button__default = (
			<button className="bs-standard-btn 	rounded-border		btn-primary" >	Register	</button>
										)

		this.state = {
			button: this.button__default
		};
	}

	loadingAnim(){
		this.setState(	{ button:		(
			<button className="bs-standard-btn 	rounded-border		btn-primary 	disabled" disabled aria-disabled="true">	Registering...	</button>
												)	} );
	}

	sre(e){
		e.preventDefault();

		let username = this.username_field.value.trim();
		let email = this.email_field.value.trim();
		let password = this.pwd_field.value.trim();

		Accounts.createUser({username, email, password}, (err) => {
			if(err){
				// TODO   Client side will start to revert changes
				console.log('Signup callback', err);
			}

			// redirect using React-Router v4's method (instant)
			this.context.router.history.push("selectAccountType")

		});

		this.loadingAnim();
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
				<input name="username" type="text" className="loginField		h-center		form-control"		required
	   				 placeholder='e.g. david_smith72 '		ref={	(this_elem) => (this.username_field = this_elem) }/>

				<loginAnnon className="h-center">	Email Address		</loginAnnon>
				<input name="email" type="email" className="loginField	h-center		form-control"			required
						 placeholder='e.g. " david.smith@example.com  '		ref={	(this_elem) => (this.email_field = this_elem) } />

				<loginAnnon className="h-center">	Password		</loginAnnon>
				<input name="password" type="password" className="loginField	h-center		form-control"	required
						 ref={	(this_elem) => (this.pwd_field = this_elem) } />

				<loginAnnon className="h-center">	Confirm Password		</loginAnnon>
				<input name="password2" type="password" className="loginField	h-center		form-control"	required/>

				{this.state.button}

				<a className="loginBigLink  h-center" href="javascript:void(0)" onClick={this.flip.bind(this)} >
					Back to login
				</a>
			</form>
		);
	}
};


// ask for `router` from context, helper for router-router Programatic Navigation
Register.contextTypes = {
	router: React.PropTypes.object
};


export default Register;
