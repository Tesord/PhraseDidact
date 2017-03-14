/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Link } from 'react-router';


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
						id="login-btn"		className="pd-btn rounded-border		btn-info">
					Login / Register
				</Link>

			</div>;


	return head;
};


export default AccountHead;
