import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App_JSC from './Page/app';
import Home_JSC from './Page/home';
import NotFound_JSC from './Page/notFound';
import Login_JSC from './Page/login';

/****************** TODO ****************/

/* ::L_NOTE:: 
 * - Each <Route /> represents a possible path in the website directory.
 * - When visiting a nested <Route /> (i.e. inside another <Route /> ), its component will be given as props to the 
 * parent <Route /> 's component
 * - <IndexRoute /> represents the default component to pass as props when no sub <Route /> is triggered (i.e. nothing
 * come after the forward slash) */
const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App_JSC}>
			<IndexRoute component={Home_JSC} />
			
			<Route path="login" component={Login_JSC}></Route>
			
			<Route path='*' component={NotFound_JSC} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('#render-target'));
});