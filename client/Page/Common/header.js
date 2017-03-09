/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

class Header extends Component {
	
	displayLogin(event){
		event.preventDefault();
		
		// browser will not keep this in the 'back history'
		window.location.replace("./login");
	}
	
	/* ::L_NOTE:: 
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	render() {
		let login_prof = null;
		
		// TODO
		// if login-in, display PROFILE		(Theme to be dynamic here?)

		/*
		login_prof = <div className="align-right">PROFILE HERE     
							<span className="arrow-down"></span>
						 </div>;
		*/
	  
//		login_prof = <Login />;
		
		// else login-in button

		login_prof = <button type="button"	
									className="btn-info align-right" 
									id = "login-btn"
									onClick={this.displayLogin.bind(this)}>
							Login
						 </button>;
		
		return (
			<nav className="navTheme-default">
				<div id="navbar-content" className="h-center">
					<div className="align-left navbar-title">PhraseDidact</div>

						<div className="align-left navbar-menu-items">Home</div>
						<div className="align-left navbar-menu-items">SOMETHING</div>

						{login_prof}
				</div>
			</nav>
		);
  }
}

/* ::L_NOTE:: 
 * Works similar to home.js, but since the "class" annotation is used,
 * the render() method will be called instead. */
export default Header;

