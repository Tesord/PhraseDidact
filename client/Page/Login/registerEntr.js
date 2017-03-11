/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Link } from 'react-router';

// TODO Change this class before FINAL release

const RegisterEntr = () => {
   return (
		<div className="login-register		border-ThemeDefault login-ThemeDefault">
			<loginTitle>Don't have an account? <br/> 
							Create one now!</loginTitle>
			<loginAnnon>Are you a student?</loginAnnon>
			<input name="username" type="text" className="loginField h-center" />
			<loginAnnon>Are you a languages instructor / researcher?</loginAnnon>
			<input name="password" type="password" className="loginField h-center" />
				
			<Link to="/register" type="button"
					id="register-btn"		className="pd-btn		btn-default">
				Register
			</Link>
		</div>
   );
};

export default RegisterEntr;

