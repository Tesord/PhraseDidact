/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import Header_JSC from './Common/header';


<<<<<<< HEAD
const depressHTMLTagList = " a , button ";

/* ::L_NOTE:: 
 * ES6. */
class App extends Component {
	
	mouseupDepresser(){
		let alreadySet = [];
		
		/* By default, Bootstrap keeps all the <a /> + <button /> 'depressed' after clicking them.
		* This jQuery select procedure applies the event handling code to get rid of that */
		$( depressHTMLTagList ).filter( 
			// i.e. only DOM elements that meet this condition (-1 means not found in array) will get the event written
			function( index, element ) {
				return	$.inArray(element.id , alreadySet) === -1;
			}
		)		
		.mouseup(function(event) {
			
			console.log( event.target.id  );
			alreadySet.push( event.target.id );
			$("#" + event.target.id ).blur();
			
		});
	}
	
	componentDidMount() {
		this.mouseupDepresser();
	}
	
	componentDidUpdate(){
		this.mouseupDepresser();
	}

=======
/* ::L_NOTE::
 * ES6. */
class App extends Component {
	
>>>>>>> ff6b580198bd72cc2a2a7ecf5160ffb5793a41c4
	render() {
		return (
			<div>
				<Header_JSC />
				{this.props.children}
			</div>
		);
	}
}

<<<<<<< HEAD
/* ::L_NOTE:: 
 * When using < *Component name* /> notation, the component name MUST begin with capital letter. */
export default App;
	
=======
/* ::L_NOTE::
 * When using < *Component name* /> notation, the component name MUST begin with capital letter. */
export default App;
>>>>>>> ff6b580198bd72cc2a2a7ecf5160ffb5793a41c4
