/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';

// TODO Change this class before FINAL release

class LoginForm extends Component {

   componentDidMount(){

      // initalise Flip mechanic
      $("#login-content").flip({
         axis: 'y',
         trigger: 'manual',
         forceHeight: false
      });
   }

   handleButtonClick(){
      $("#login-content").flip(true);
   }

   render(){
      return (
      		<form className="login-form 	front   _Theme_border_Default_ _Theme_login_Default_">
      			<loginTitle>	Log in	</loginTitle>

      			<loginAnnon className="h-center">	Email Address / Username	</loginAnnon>
      			<input name="username" type="text" className="loginField		h-center		form-control"
      					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '	/>

      			<loginAnnon className="h-center">	Password	</loginAnnon>
      			<input name="password" type="password" className="loginField	h-center		form-control"
      					 />

               <button onClick={this.handleButtonClick.bind(this)} id="login-form-btn" className="pd-btn rounded-border		btn-primary">Login</button>
      		</form>

      );
   }
};

export default LoginForm;
