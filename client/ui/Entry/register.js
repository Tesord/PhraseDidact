import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';

import Func_Util from '/imports/api/functional/func_Util';
import Ui_Util from '/imports/api/render/ui_Util';


/* TODO Validation
   - Email address format validation
   - Non-empty form input           {DONE}
   - Username avail
   - Confirm Password matching
   - Email avail
* /


/*
 * USAGE: Should only be rendered in one location.
 */
class Register extends Component {

	constructor(){
		super();

		this.state = {     button:    this.getReadyAnim()    };
	}


	componentDidMount(){
	/* Keyboard accessibility */

		this.signup_learner_lbl.addEventListener('keypress', Ui_Util.funkyRadio_KBstandardSelect_Handler );
		this.signup_instructor_lbl.addEventListener('keypress', Ui_Util.funkyRadio_KBstandardSelect_Handler );
	}

	getReadyAnim(){
		return(

		  	<button className="bs-standard-btn 	rounded-border		btn-primary" >	Register	</button>

		);
	}

	getLoadingAnim(){
		return(

			<button className="bs-standard-btn 	rounded-border		btn-primary 	disabled" disabled aria-disabled="true">	Registering...	</button>

		);
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


		this.setState( {     button:    this.getReadyAnim()    });

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

				Meteor.call('userAccount.addRole', isInstructor, (err, result) => {

					if(err){
						this.handleErrors(err, false);
					}
					else{
						// Success, asynchronously set account defaults

				/* TODO */

						// Redirect using React-Router v4's method (instant)
						if(isInstructor){
							Func_Util.setLoginCache( "INSTR" );
							this.context.router.history.push("");
						}
						else{
							Func_Util.setLoginCache( "LEARN" );
							this.context.router.history.push("fillLearnerProfile");
						}
					}

				});

			}

		});

		this.setState( {     button:    this.getLoadingAnim()    });
	}


	flip(){
		document.getElementById("login-content").style.transform = "rotateY(0deg)";
		document.getElementById("login-content").style.height = "0rem";
	}


	render(){

		return (
			<form id="register-card" className="_Theme_border_Default_ _Theme_register_Default_"
					onSubmit={	this.sre.bind(this)	} >

				<contentTitle className="h-center-margin">	Sign up	</contentTitle>

				<p className="h-center-margin">
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

				<div id="register-form" className="h-center-margin">
					<annotation>	Username		</annotation>
					<input name="username" type="text" className="form-control"		required
		   				 placeholder='e.g. david_smith72 '		ref={	(this_elem) => (this.username_field = this_elem) }/>

					<annotation>	Email Address		</annotation>
					<input name="email" type="email" className="form-control"			required
							 placeholder='e.g. " david.smith@example.com  '		ref={	(this_elem) => (this.email_field = this_elem) } />

					<annotation>	Password		</annotation>
					<input name="password" type="password" className="form-control"	required
							 ref={	(this_elem) => (this.pwd_field = this_elem) } />

					<annotation>	Confirm Password		</annotation>
					<input name="password2" type="password" className="form-control"	required/>

					{this.state.button}

					<a className="contentLink		h-center-margin" href="javascript:void(0)" onClick={this.flip.bind(this)} >
						Back to login
					</a>

				</div>
			</form>
		);
	}
};


// ask for `router` from context, helper for router-router Programatic Navigation
Register.contextTypes = {
	router: React.PropTypes.object
};


export default Register;
