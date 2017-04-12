import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './ui/Common/header';

import Home from './ui/home';
import NotFound from './ui/notFound';
import Entry from './ui/entry';

import FillLearnerProfile from './ui/LearnerExc/fillLearnerProfile';
import Profile from './ui/profile';

import AddCourse from './ui/InstructorExc/addCourse';
import EditCourse from './ui/InstructorExc/editCourse';
import AddWord from './ui/InstructorExc/addWord';


/*************** TODO WHEN FINISHED: comment out the below imports & delete above.
 					Move the 'ui' folder from 'client' to 'imports' **/

// import Header from '/imports/ui/Common/header';

// import Home from '/imports/ui/home';
// import NotFound from '/imports/ui/notFound';
// import Entry from '/imports/ui/entry';

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
			<Header />

			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/home" component={Home} />

				<Route path="/login" component={Entry} />

				<Route path="/fillLearnerProfile" component={FillLearnerProfile} />
				<Route path="/user/:username/profile" component={Profile} />

				<Route path="/addCourse" component={AddCourse} />
				<Route path="/course/:courseName/edit" component={EditCourse} />
				<Route path="/course/:courseName/addWord" component={AddWord} />


				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);


Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('#render-target'));
});
