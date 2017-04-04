import React from 'react';
import { Link } from 'react-router-dom';


/*
 * USAGE: Should only be rendered in one location.
 */
const AccountHead = () => {

/******************* TODO **********************/

	let head = null;

	// if login-in, display PROFILE		(Theme to be dynamic here?)

	/*
	login_prof = <div className="align-right">PROFILE HERE
						<span className="arrow-down"></span>
					 </div>;
	*/

//		login_prof = <Login />;

	// else login-in button

	head =
			<div id="login-head-content" className="align-right">

				<Link to="/login" type="button"
						id="login-btn"		className="rounded-border		btn-info">
					Login / Register
				</Link>

			</div>;


	return head;
};


export default AccountHead;
