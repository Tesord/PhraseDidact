/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

// TODO Change this class before FINAL release

const LoginForm = () => {
   return (
		<form className="login-login		border-ThemeDefault login-ThemeDefault">
			<loginTitle>Log in</loginTitle>
			
			<loginAnnon className="h-center">Email Address / Username</loginAnnon>
			<input name="username" type="text" className="loginField		h-center		form-control" 
					 placeholder='e.g. " david.smith@example.com ", " david_smith72 "... '	/>
					 
			<loginAnnon className="h-center">Password</loginAnnon>
			<input name="password" type="password" className="loginField	h-center		form-control" 
					 />
			
			<button type="submit" id="login-form-btn" className="pd-btn rounded-border		btn-primary">Login</button>
		</form>
   );
};

export default LoginForm;

