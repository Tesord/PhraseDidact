/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

class Header extends Component {
	displayLoginForm(event){
		event.preventDefault();
		
		const form = document.getElementById("login-form");
		const login_btn = document.getElementById("login-btn");
		
		const login_btn_DOMRec = login_btn.getBoundingClientRect();
		console.log(login_btn_DOMRec.left);
		form.setAttribute("style", "display: inline-block; ");
	}
	
	/* ::L_NOTE:: 
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	render() {
		let login_prof = null;
		
		// TODO
		// if login-in, display PROFILE		(Theme to be dynamic here?)
		login_prof = <button type="button"	
									className="btn-info align-right" 
									id = "login-btn"
									onClick={this.displayLoginForm.bind(this)}>
							Login
						 </button>;
		
		// else login-in button
		/*
		login_prof = <div className="align-right">PROFILE HERE     
							<span className="arrow-down"></span>
						 </div>;
		*/
		
		return (
			<div>
				<nav className="navTheme-default">
					<div className="navbar-content">
						<div className="align-left navbar-title">PhraseDidact</div>

							<div className="align-left navbar-menu-items">Home</div>
							<div className="align-left navbar-menu-items">SOMETHING</div>

							{login_prof}
					</div>
				</nav>
				
				<form id="login-form">
					<loginAnnon>First name:</loginAnnon> <br />
					<input type="text" name="firstname" /><br />
					<loginAnnon>Last name:</loginAnnon> <br />
					<input type="text" name="lastname" />
				</form>
			</div>
		);
  }
}

/* ::L_NOTE:: 
 * Works similar to HomeMenu.js, but since the "class" annotation is used,
 * the render() method will be called instead. */
export default Header;

