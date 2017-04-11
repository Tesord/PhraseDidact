import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Func_Util from '/imports/api/functional/func_Util';


 /****************** TODO
-  Get FORGET PASSWORD working
-  Get Remember me working
-  Check user is log OUT before rendering page
 */


/*
 * USAGE: Should only be rendered in one location.
 */
class Login extends Component {

	constructor(){
		super();

		this.state = {     button:  this.getReadyAnim()      };
	}


   getReadyAnim(){
      return (

         <button className="pd-btn   rounded-border	   btn-primary">Login</button>

      );
   }

	getLoadingAnim(){
		return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Logging in...</button>

      );
	}



   flip(){
      document.getElementById("login-content").style.transform = "rotateY(180deg)";

      // adjust bottom margin for new 'card' height
      document.getElementById("login-content").style.height = "78rem";
   }

   handleErrors(err){
      // TODO   Client side will start to revert changes
      window.alert(err);


      this.setState( {     button:    this.getReadyAnim()    });
   }

   login(e){
      e.preventDefault();

      let username_email = this.username_email_field.value.trim();
      let password = this.pwd_field.value.trim();

      Meteor.loginWithPassword(username_email, password, (err) => {

         if(err){
            this.handleErrors(err);
         }
         else{		// successful
				// "LEARN" / "INSTR" should always be the first item
				Func_Util.setLoginCache( Roles.getRolesForUser(Meteor.userId())[0] );

				/* TODO Possible redirect based on last visited URL? */

            this.context.router.history.push("");
         }

      });

      this.setState( {     button:    this.getLoadingAnim()    });
   }


	/* TODO Use React-Router's <Redirect/> here for already logged in? */

   render(){
      return (
         <form id="login-card"  className="_Theme_outerBorder_Default_ _Theme_login_Default_"
               onSubmit={	this.login.bind(this)	} >

				<div id="login-form"	className="h-center-margin">

	   			<contentTitle>	Log in	</contentTitle>

	   			<annotation>	Email Address / Username	</annotation>
	   			<input name="username" type="text" className="form-control"         required
	   					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '
	                   ref={	(this_elem) => (this.username_email_field = this_elem) }/>

	   			<annotation>	Password	</annotation>
	   			<input name="password" type="password" className="form-control"      required
	                   ref={	(this_elem) => (this.pwd_field = this_elem) } />

	            <contentLine>
	               <label   className="align-left">
	                 Remember me
	                 <input type="checkbox" name="remember" />
	               </label>

	               <Link to="/forgetPass" className="align-right" type="text/html">Forget Password?</Link>
	            </contentLine>

	            {this.state.button}

	            <a className="contentLink		h-center-margin" href="javascript:void(0)" onClick={this.flip.bind(this)}>	I would like to join </a>

				</div>

			</form>
      );
   }
};


// ask for `router` from context, helper for router-router Programatic Navigation
Login.contextTypes = {
	router: React.PropTypes.object
};

export default Login;
