/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import Login_C from './Entry/login';
import Register_C from './Entry/register';



class Entry extends Component{

	componentDidMount() {

		/************** TODO         If unlogged only *****************/

		/* ::L_NOTE::
		 * React's 'refs' feature cannot be used cross-components. This is due to the fact that the function to run
		 * only execute AFTER the source class has been mounted, so when the render method is finished (before
		 * source class is considered mounted), all child components will have already gotten the value of the
		 * references, which at that time is null. */
		this.login_head = document.getElementById("login-head-content");
		this.navbar = document.getElementById("navbar-content");
		this.nav_head = document.getElementById("nav-head");

		/* ::L_NOTE::
		 * OffsetWidth is used instead as it gets the actual width at the time, not from the CSS
		 * Unlike Height, Width is consistent with Windows content scaling. */
		this.prev_navbar__widthPx = this.navbar.offsetWidth + "px";
		/* 	*Dom element*.style.*CSS property* 	only retrieve and modify inline style attributes.
		 * 	To work with CSS sheet values, window.getComputedStyle() must be used instead.	*/
		this.prev_login_head__display = 	window.getComputedStyle( this.login_head ).getPropertyValue("display");


		this.navbar.style.width = this.nav_head.offsetWidth + "px";
		// simply hiding it would mean the navbar-content will be off-centre... so "display:none" removes it from the DOM temporary.
		this.login_head.style.display = "none";
	}

	componentWillUnmount() {

		/************** TODO         If unlogged only *****************/
		this.navbar.style.width = this.prev_navbar__widthPx;
		this.login_head.style.display = this.prev_login_head__display;
	}

	render(){
		return (
			<DocumentTitle title='Login - PhraseDidact'>

				<div id="login-content" className="h-center-margin">
					<Login_C />
					<Register_C />
				</div>

			</DocumentTitle>
		);
	}
}

export default Entry;
