/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import LoginForm_C from './Login/loginForm';
import RegisterEntr_C from './Login/registerEntr';


// TODO Change this class before FINAL release

const Login = () => {
   return (
		<div id="login-content" className="h-center">
			<LoginForm_C />
			<RegisterEntr_C />
		</div>
   );
};

export default Login;