/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';

// TODO Change this class before FINAL release

//       		<form className="login-form		_Theme_border_Default_ _Theme_login_Default_">


class LoginForm extends Component {

   flip(){
      $(" #login-content ").css("transform","rotateY(180deg)");
   }

   render(){
      return (
         <div className="login-form       _Theme_border_Default_ _Theme_login_Default_">
   			<loginTitle>	Log in	</loginTitle>

   			<loginAnnon className="h-center">	Email Address / Username	</loginAnnon>
   			<input name="username" type="text" className="loginField		h-center		form-control"
   					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '	/>

   			<loginAnnon className="h-center">	Password	</loginAnnon>
   			<input name="password" type="password" className="loginField	h-center		form-control"
   					 />

                <button onClick={this.flip.bind(this)} id="login-form-btn" className="pd-btn rounded-border		btn-primary">Login</button>
         </div>
      );
   }
};

export default LoginForm;
