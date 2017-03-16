/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';


class LoginForm extends Component {

   flip(){
      $(" #login-content ").css("transform","rotateY(180deg)");
      /* TODO                   NEEED To adjust login-content HEIGHT    to suit back pane */

      $(" #login-content ").css("height", 66 + "rem" );
   }

   render(){
      return (
         <form id="login-form"  className="_Theme_border_Default_ _Theme_login_Default_">
   			<loginTitle className="h-center">	Log in	</loginTitle>

   			<loginAnnon className="h-center">	Email Address / Username	</loginAnnon>
   			<input name="username" type="text" className="loginField		h-center		form-control"
   					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '	/>

   			<loginAnnon className="h-center">	Password	</loginAnnon>
   			<input name="password" type="password" className="loginField	h-center		form-control"/>

            <loginLine className="h-center">
               <label   className="align-left">
                 Remember me
                 <input type="checkbox" name="remember" />
               </label>

               <Link to="/forgetPass" className="align-right" type="text/html">Forget Password?</Link>
            </loginLine>

            <button onClick={this.flip.bind(this)} id="login-form-btn" className="pd-btn rounded-border	btn-primary">Login</button>

            <a className="loginBigLink  h-center" href="javascript:void(0)" onClick={this.flip.bind(this)}>	I would like to join </a>
         </form>
      );
   }
};

export default LoginForm;
