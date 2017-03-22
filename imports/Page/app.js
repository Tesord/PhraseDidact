/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import Header_C from './Common/header';


/* ::L_NOTE::
 * ES6. */
class App extends Component {

	render() {
		return (
			<div>
				<Header_C />
				{this.props.children}
			</div>
		);
	}
}

/* ::L_NOTE::
 * When using < *Component name* /> notation, the component name MUST begin with capital letter. */
export default App;
