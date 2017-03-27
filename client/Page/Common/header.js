import React from 'react';

import AccountHead_C from './accountHead';
import NavHead_C from './navHead';

/*
 * USAGE: Should only be rendered in one location.
 */
const Header = () => {

	/* ::L_NOTE::
	 * Watch out! Unlike traditional CSS, "class" is not an valid attribute.
	 * In React components, "className" is used instead. */
	return (
		<nav className="_Theme_nav_Default_">

			<div id="navbar-content" className="h-center-margin">
				<NavHead_C />
				<AccountHead_C />
			</div>

		</nav>
	);
};


export default Header;
