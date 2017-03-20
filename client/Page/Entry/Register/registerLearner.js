import React from 'react';


const RegisterLearner = () => {

	return (
		<div id="register-form" className="_Theme_border_Default_ _Theme_register_Default_">
			<loginTitle className="h-center">	Sign up	</loginTitle>

			<loginAnnon className="h-center">	Username		</loginAnnon>
			<input name="username" type="text" className="loginField		h-center		form-control"
   				 placeholder='e.g. david_smith72 '	/>

			<loginAnnon className="h-center">	Email Address		</loginAnnon>
			<input name="email" type="email" className="loginField	h-center		form-control"
					 placeholder='e.g. " david.smith@example.com  '	/>

			<loginAnnon className="h-center">	Password		</loginAnnon>
			<input name="password" type="password" className="loginField	h-center		form-control"/>

			<loginAnnon className="h-center">	Confirm Password		</loginAnnon>
			<input name="password2" type="password" className="loginField	h-center		form-control"/>

			<button onClick=""  className="bs-standard-btn 	rounded-border		btn-primary">Register</button>
		</div>
	);
};


export default RegisterLearner;
