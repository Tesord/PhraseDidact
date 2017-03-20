import React from 'react';


const RegisterInstructor = () => {

	/* ::L_NOTE::
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	return (
		<div id="register-form" className="_Theme_border_Default_ _Theme_register_Default_">
			<h3>	Don't have an account? <br/>
					Create one now!</h3>

			<hr className="_Theme_hr_Default_"/>

			<h4>	NOOJJOJOOJOOOJOJP?	</h4>
			<registerDesc>	Start learning languages completely free of charge!	</registerDesc>
			<a   type="button"
					id="register-btn"		className="pd-btn		btn-register">
				Register as student
			</a>

			<br /><br /><br />

			<h4>	FPHOHPFJOFJOPOJFO</h4>
			<registerDesc>	Get access to learner data and design your own language learning course!		</registerDesc>
			<a   type="button"
					id="register-btn"		className="pd-btn		btn-register">
				Register as instructor
			</a>

			<a className="loginBigLink  h-center" href="javascript:void(0)">	Back to login </a>
		</div>
	);
};


export default RegisterInstructor;
