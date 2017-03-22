/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';

import Login_C from './Entry/login';
import Register_C from './Entry/register';


// TODO Change this class before FINAL release

class Entry extends Component{

	constructor(){
		super();

		/* HTML Display variables */
		this.login_head = null;
		this.navbar = null;

		this.login_head__width = 0;
		this.prev_login_head__display = "";
	}

	componentDidMount() {

		/************** TODO         If unlogged only *****************/

		this.login_head = document.getElementById("login-head-content");
		this.navbar = document.getElementById("navbar-content");
		// offsetWidth is used instead as it gets the actual width at the time, not from the CSS
		this.login_head__width = this.login_head.offsetWidth;

		this.navbar.style.width = ( ( this.navbar.offsetWidth - this.login_head__width ) + "px" );
		/* 	*Dom element*.style.*CSS property* 	only retrieve and modify inline style attributes.
		 * 	To work with CSS sheet values, window.getComputedStyle() must be used instead.	*/
		this.prev_login_head__display = 	window.getComputedStyle( this.login_head ).getPropertyValue("display");

		this.login_head.style.display = "none";
	}

	componentWillUnmount() {

		/************** TODO         If unlogged only *****************/
		this.navbar.style.width = ( ( this.navbar.offsetWidth + this.login_head__width ) + "px" );
		this.login_head.style.display = this.prev_login_head__display;
	}

	render(){
		return (
			<div id="login-content" className="h-center">
				<Login_C />
				<Register_C />
			</div>
		);
	}
}

export default Entry;
