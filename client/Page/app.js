/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import Header_JSC from './Common/header';


/* ::L_NOTE:: 
 * ES6. */
class App extends Component {
	
	mouseupDepresser(){
		/* By default, Bootstrap keeps all the <a /> + <button /> 'depressed' after clicking them.
		* This jQuery code select procedure applies the event handling code to get rid of that (provided that
		* all the selected HTML DOM elements have the ID attribute). */
		$(" a , button ").mouseup(function(event) {
			$("#" + event.target.id ).blur();
		});
	}
	
	componentDidMount() {
		this.mouseupDepresser();
	}
	
	componentDidUpdate(){
		this.mouseupDepresser();
	}

	render() {
		return (
			<div>
				<Header_JSC />
				{this.props.children}
			</div>
		);
	}
}

/* ::L_NOTE:: 
 * When using < *Component name* /> notation, the component name MUST begin with capital letter. */
export default App;
	