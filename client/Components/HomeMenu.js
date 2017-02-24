/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Header from './Common/Header';


/* ::L_NOTE:: 
 * ( ... ) => {  ...  }    represents a function (es6).
 * The words inside the () brackets are the parameter,
 * The words inside the {} brackets are the function's execution code.
 */
const HomeMenu = () => {
    return (
        <Header />
    );
};


/* ::L_NOTE:: 
 * Enable ability: When	<HomeMenu /> is used in other classes, the code within the const 'HomeMenu' will be executed.
 * i.e.	< *Component name* />   represents a function. */
export default HomeMenu;

