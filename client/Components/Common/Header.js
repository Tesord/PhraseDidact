/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

class Header extends Component {
	/* ::L_NOTE:: 
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	render() {
		return (
			<nav className="theme-default">
				<div className="navbar-content">
					<div className="align-left navbar-title">PhraseDidact</div>
						<div className="align-left navbar-menu-items">Home</div>
						<div className="align-left navbar-menu-items">SOMETHING</div>
						<div className="align-right">PROFILE HERE     LOGIN_AND_REGISTER</div>
				</div>
			</nav>

			/*
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">WebSiteName</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="#">Home</a></li>
						<li><a href="#">Home</a></li>
						<li><a href="#">Page 2</a></li>
						<li><a href="#">Page 3</a></li>
					</ul>
				</div>
			</nav>
			*/
		);
  }
}

/* ::L_NOTE:: 
 * Works similar to HomeMenu.js, but since the "class" annotation is used,
 * the render() method will be called instead. */
export default Header;

