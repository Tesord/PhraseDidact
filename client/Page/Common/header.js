/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import AccountHead from './accountHead';


const Header = () => {
<<<<<<< HEAD
	
	/* ::L_NOTE:: 
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	return (
		<nav className="nav-ThemeDefault">
			<div id="navbar-content" className="h-center">
			
				<div className="align-left navbar-title">PhraseDidact</div>

				<div className="align-left navbar-menu-items">Home</div>
				<div className="align-left navbar-menu-items">SOMETHING</div>

				<AccountHead />
			</div>
		</nav>
	);
}


export default Header;
=======

	/* ::L_NOTE::
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	return (
		<nav className="_Theme_nav_Default_">
			<div id="navbar-content" className="h-center">

				<div className="align-left navbar-title">PhraseDidact</div>
>>>>>>> ff6b580198bd72cc2a2a7ecf5160ffb5793a41c4

				<div className="align-left navbar-menu-items">Home</div>
				<div className="align-left navbar-menu-items">SOMETHING</div>

				<AccountHead />
			</div>
		</nav>
	);
};


export default Header;
