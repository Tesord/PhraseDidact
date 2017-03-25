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


	componentDidMount(){
	/* Keyboard accessibility */

		this.signup_learner_lbl.addEventListener('keypress', this.funkyRadio_Handler );
		this.signup_instructor_lbl.addEventListener('keypress', this.funkyRadio_Handler );
	}

	funkyRadio_Handler(e){
		// Space Bar + Enter key toggle
		if (e.keyCode == 0 || e.keyCode == 32 || e.keyCode == 13) {
			// prevent bar-scrolling when space bar is clicked
			e.preventDefault();

			let forElementID = e.target.getAttribute("for");
			document.getElementById(forElementID).checked = true;
		}
	}


	loadingAnim(){
		this.setState(	{ button:		(
			<button className="bs-standard-btn 	rounded-border		btn-primary 	disabled" disabled aria-disabled="true">	Registering...	</button>
												)	} );
	}

	handleErrors(err, isInitial){
		// TODO   Client side will start to revert changes
		console.log('Signup callback', err);


		/* If an exception occurs during Set Account Type stage (e.g. Set Account Type returns NOT UNIQUE),
		 * then call delete Account method from server  (remove "users" + "accountConfigs" collection entry only).
		 *	HOWEVER, check again to see UserAccounts collection does not contain record of userId before deleting (prevent abuse)
		 *
		 * This usual Delete account option in user account will delete entry from ALL folder: "UserAccount" collection, but this method
		 * will only delete the entry from the TWO collections.
		 */
	}


	sre(e){
		e.preventDefault();

		let username = this.username_field.value.trim();
		let email = this.email_field.value.trim();
		let password = this.pwd_field.value.trim();
		let isInstructor = this.signup_instructor_input.checked ;


		/* Provided function is what is called when the method is complete (method is asynchronous)
		 * Accounts.createUser() Also automatically log in if successful */
		Accounts.createUser({username, email, password}, (err) => {

			// On create account attempt...
			if(err){
				this.handleErrors(err, true);
			}
			else{		// Account created, need to set type

				Meteor.call('userAccount.create', isInstructor, (err, result) => {

					if(err){
						this.handleErrors(err, false);
					}
					else{
						// Success, asynchronously set account defaults

				/* TODO */

						// Redirect using React-Router v4's method (instant)
						if(isInstructor){
							this.context.router.history.push("")
						}
						else{
							this.context.router.history.push("fillUserProfile")
						}
					}

				});

			}

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
					Please pick your account type. <br/>
					Beware that you will not be able to change this later!
				</p>

				<div className="funkyradio">
					<div className="funkyradio-success">
		            <input type="radio" name="radio" id="signup-learner"
								defaultChecked />
						<label htmlFor="signup-learner"	tabIndex="0"
							ref={ (this_elem) => {this.signup_learner_lbl = this_elem;} } >
								Learner
						</label>
		        	</div>

					<div className="funkyradio-primary">
		            <input type="radio" name="radio" id="signup-instructor"
							ref={ (this_elem) => {this.signup_instructor_input = this_elem;} } />
						<label htmlFor="signup-instructor"	tabIndex="0"
							ref={ (this_elem) => {this.signup_instructor_lbl = this_elem;} } >
								Instructor
						</label>
		        	</div>
				</div>


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
