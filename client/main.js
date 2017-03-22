import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App_C from '/imports/Page/app';
import Home_C from '/imports/Page/home';
import NotFound_C from '/imports/Page/notFound';
import Entry_C from '/imports/Page/entry';

/****************** TODO ****************/

/* ::L_NOTE::
 * - Each <Route /> represents a possible path in the website directory.
 * - When visiting a nested <Route /> (i.e. inside another <Route /> ), its component will be given as props to the
 * parent <Route /> 's component
 * - <IndexRoute /> represents the default component to pass as props when no sub <Route /> is triggered (i.e. nothing
 * come after the forward slash) */
const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App_C}>
			<IndexRoute component={Home_C} />

			<Route path="login" component={Entry_C}></Route>

			<Route path='*' component={NotFound_C} />
		</Route>
	</Router>
);


Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('#render-target'));
});
