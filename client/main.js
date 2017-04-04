import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


<<<<<<< HEAD
import Header_C from './Page/Common/header';

import Home_C from './Page/home';
import NotFound_C from './Page/notFound';
import Entry_C from './Page/entry';
import SetAccountType_C from './Page/setAccountType'

/*************** TODO WHEN FINISHED: comment out the below imports & delete above.
 					Move the 'Page' folder from 'client' to 'imports' **/

// import Header_C from '/imports/Page/Common/header';

// import Home_C from '/imports/Page/home';
// import NotFound_C from '/imports/Page/notFound';
// import Entry_C from '/imports/Page/entry';
=======
import Header__C from './ui/Common/header';

import Home__C from './ui/home';
import NotFound__C from './ui/notFound';
import Entry__C from './ui/entry';
import FillLearnerProfile__C from './ui/LearnerExc/fillLearnerProfile';

/*************** TODO WHEN FINISHED: comment out the below imports & delete above.
 					Move the 'ui' folder from 'client' to 'imports' **/

// import Header__C from '/imports/ui/Common/header';

// import Home__C from '/imports/ui/home';
// import NotFound__C from '/imports/ui/notFound';
// import Entry__C from '/imports/ui/entry';
>>>>>>> da9362323b5ac475c5098d9317fa8c3794353bc2

/****************** TODO ****************/

/* ::L_NOTE::
 * - The <Router /> represents the content that will be rendered in any page of the web app.
 * - A <Route /> represents a possible web path.
 * 	By default, the "path" property means any web path that begin with the string provided will render its component.
 *		If "exact" is also written, then each character of the web path (after the domain) must match char-to-char.
 *		If no "path" is given, then it is ALWAYS a match.
 * - The <Switch /> indicates that when searching through the list of <Route />s (from top to bottom),
 *		as soon as one matches, it will only render that one (exclusive).
 */
const routes = (
	<Router>
		<div>
<<<<<<< HEAD
			<Header_C />

			<Switch>
				<Route exact path="/" component={Home_C} />
				<Route path="/login" component={Entry_C} />
				<Route path="/selectAccountType" component={SetAccountType_C} />
				<Route component={NotFound_C} />
=======
			<Header__C />

			<Switch>
				<Route exact path="/" component={Home__C} />
				<Route path="/home" component={Home__C} />

				<Route path="/login" component={Entry__C} />
				<Route path="/fillLearnerProfile" component={FillLearnerProfile__C} />

				<Route component={NotFound__C} />
>>>>>>> da9362323b5ac475c5098d9317fa8c3794353bc2
			</Switch>
		</div>
	</Router>
);


Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('#render-target'));
});
