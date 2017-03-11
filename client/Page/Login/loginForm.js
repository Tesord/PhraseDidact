/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

// TODO Change this class before FINAL release

const LoginForm = () => {
   return (
		<form className="login-login		v-center border-ThemeDefault login-ThemeDefault">
			<loginTitle>Log in</loginTitle>
			<loginAnnon className="h-center">Username</loginAnnon>
			<input name="username" type="text" className="loginField		h-center		form-control" />
			<loginAnnon className="h-center">Password</loginAnnon>
			<input name="password" type="password" className="loginField	h-center		form-control" />
			<button type="button" id="login-form-btn" className="pd-btn rounded-border		btn-primary">Login</button>
		</form>
   );
};

export default LoginForm;

