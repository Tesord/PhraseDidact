/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

import React from 'react';

import Header from './Common/Header';

import GetStarted from './LogHome/GetStarted';
import ProgressMenu from './LogHome/ProgressMenu';
import DailyGoal from './LogHome/DailyGoal';

*/ 

const LogHome = () => {
	let status_menu = null;
		
	/************ TODO ***************
	 if new user, then display status screen with placement test focused */
	// if	
		status_menu = <GetStarted />;
		
	/* else we display normal menu
	*/
	// else if(){
		
	//}
	
	
   return (
		<div>
			<Header />
			{status_menu}
		</div>	
   );
};


export default LogHome;
	
	