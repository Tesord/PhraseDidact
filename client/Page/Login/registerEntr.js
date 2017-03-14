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
		<div className="login-form		_Theme_border_Default_ _Theme_register_Default_">
			<h3>	Don't have an account? <br/>
					Create one now!</h3>

			<hr className="_Theme_hr_Default_"/>

			<h4>	Are you a student?	</h4>
			<registerDesc>	Start learning languages completely free of charge!	</registerDesc>
			<Link to="/register" type="button"
					id="register-btn"		className="pd-btn		btn-register">
				Register as student
			</Link>

			<br /><br /><br />

			<h4>	Are you a language instructor / researcher?</h4>
			<registerDesc>	Get access to learner data and design your own language learning course!		</registerDesc>
			<Link to="/register" type="button"
					id="register-btn"		className="pd-btn		btn-register">
				Register as instructor
			</Link>


		</div>
   );
};

export default RegisterEntr;
