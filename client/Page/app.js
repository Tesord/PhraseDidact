/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import Header_JSC from './Common/header';


// Used by jQuery selector
var depressList = " a , button ";


/* ::L_NOTE:: 
 * ES6. */
class App extends Component {
	
	/* By default, Bootstrap keeps all the <a /> + <button /> 'depressed' after clicking them.
	* This jQuery code + block of methods applies the event handling code to get rid of that. */
	depress(event){
		$( event.target ).blur();
	}
	
	addMouseupDepressEvents(){
		$( depressList ).mouseup( this.depress );
	}
	
	removeMouseupDepressEvents(){
		/* The .off() method's selector parameter (suppose to be more efficient) can't be used due to 
		 * some elements not being in ' document ' when this method is called [ during componentWillUpdate() ] (?)*/
		$( depressList ).off( "mouseup", null, this.depress );
	}
	
	componentDidMount() {
		this.addMouseupDepressEvents();
	}
	
	componentWillUpdate(){
		this.removeMouseupDepressEvents();
	}
	
	componentDidUpdate(){
		this.addMouseupDepressEvents();
	}

	/* Below is the usual rendering stuff... */
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
	