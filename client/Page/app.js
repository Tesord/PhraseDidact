/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Header_JSC from './Common/header';


/* ::L_NOTE:: 
 * When using < *Component name* /> notation, the component name MUST begin with capital letter. */
export default (props) => {
   return (
		<div>
			<Header_JSC />
			{props.children}
		</div>
	);
};