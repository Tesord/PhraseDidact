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

         <button className="bs-standard-btn   rounded-border	   btn-primary">Login</button>

      );
   }

	getLoadingAnim(){
		return (

         <button className="bs-standard-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Logging in...</button>

      );
	}



   flip(){
      document.getElementById("login-content").style.transform = "rotateY(180deg)";

      // adjust bottom margin for new 'card' height
      document.getElementById("login-content").style.height = "78rem";
   }

   handleErrors(err){
      // TODO   Client side will start to revert changes
      console.log('Login error' + err);


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
         <form id="login-form"  className="_Theme_border_Default_ _Theme_login_Default_"
               onSubmit={	this.login.bind(this)	} >
   			<contentTitle className="h-center-margin">	Log in	</contentTitle>

   			<annotation className="h-center-margin">	Email Address / Username	</annotation>
   			<input name="username" type="text" className="h-center-margin		form-control"         required
   					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '
                   ref={	(this_elem) => (this.username_email_field = this_elem) }/>

   			<annotation className="h-center-margin">	Password	</annotation>
   			<input name="password" type="password" className="h-center-margin		form-control"      required
                   ref={	(this_elem) => (this.pwd_field = this_elem) } />

            <contentLine className="h-center-margin">
               <label   className="align-left">
                 Remember me
                 <input type="checkbox" name="remember" />
               </label>

               <Link to="/forgetPass" className="align-right" type="text/html">Forget Password?</Link>
            </contentLine>

            {this.state.button}

            <a className="contentLink  h-center-margin" href="javascript:void(0)" onClick={this.flip.bind(this)}>	I would like to join </a>
         </form>
      );
   }
};


// ask for `router` from context, helper for router-router Programatic Navigation
Login.contextTypes = {
	router: React.PropTypes.object
};

export default Login;
