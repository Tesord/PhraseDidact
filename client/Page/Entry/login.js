import React, {Component} from 'react';
import { Link } from 'react-router-dom';


 /****************** TODO
-  Get FORGET PASSWORD working
-  Get Remember me working
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
         else{
            this.context.router.history.push("");
         }

      });

      this.setState( {     button:    this.getLoadingAnim()    });
   }

   render(){
      return (
         <form id="login-form"  className="_Theme_border_Default_ _Theme_login_Default_"
               onSubmit={	this.login.bind(this)	} >
   			<loginTitle className="h-center">	Log in	</loginTitle>

   			<loginAnnon className="h-center">	Email Address / Username	</loginAnnon>
   			<input name="username" type="text" className="loginField		h-center		form-control"         required
   					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '
                   ref={	(this_elem) => (this.username_email_field = this_elem) }/>

   			<loginAnnon className="h-center">	Password	</loginAnnon>
   			<input name="password" type="password" className="loginField	h-center		form-control"      required
                   ref={	(this_elem) => (this.pwd_field = this_elem) } />

            <loginLine className="h-center">
               <label   className="align-left">
                 Remember me
                 <input type="checkbox" name="remember" />
               </label>

               <Link to="/forgetPass" className="align-right" type="text/html">Forget Password?</Link>
            </loginLine>

            {this.state.button}

            <a className="loginBigLink  h-center" href="javascript:void(0)" onClick={this.flip.bind(this)}>	I would like to join </a>
         </form>
      );
   }
};


// ask for `router` from context, helper for router-router Programatic Navigation
Login.contextTypes = {
	router: React.PropTypes.object
};

export default Login;
