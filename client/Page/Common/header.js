import React from 'react';
import AccountHead from './accountHead';
import LoadingCircle from './loadingCircle';


/*
 * USAGE: Should only be rendered in one location.
 */
const Header = () => {

	/* ::L_NOTE::
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	return (
		<nav className="_Theme_nav_Default_">
			<LoadingCircle />

			<div id="navbar-content" className="h-center">

				<div className="align-left navbar-title">PhraseDidact</div>

				<div className="align-left navbar-menu-items">Home</div>
				<div className="align-left navbar-menu-items">SOMETHING</div>

				<AccountHead />
			</div>

		</nav>
	);
};


export default Header;
