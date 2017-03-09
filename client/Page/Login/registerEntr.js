/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

// TODO Change this class before FINAL release

const RegisterEntr = () => {
   return (
		<form className="login-register v-center border-ThemeDefault register-ThemeDefault">
			<loginTitle>Log in</loginTitle>
			<loginAnnon>Username</loginAnnon>
			<input name="username" type="text" className="loginField h-center" />
			<loginAnnon>Password</loginAnnon>
			<input name="password" type="password" className="loginField h-center" />
		</form>
   );
};

export default RegisterEntr;

