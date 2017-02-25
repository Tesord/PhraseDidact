import React from 'react';
import ReactDOM from 'react-dom';

import HomeMenu from './Components/HomeMenu';


// TODO
const content = (
    <HomeMenu />
);


Meteor.startup(() => {
	ReactDOM.render(content, document.querySelector('.render-target'));
});