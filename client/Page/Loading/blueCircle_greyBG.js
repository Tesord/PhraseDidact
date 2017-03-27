import React, {Component} from 'react';


class BlueCircle_greyBG extends Component{


   static show(){
      let loading_circle = document.getElementById("loading-circle");

      if( loading_circle ){
         loading_circle.style.visibility = "visible";
         return true;
      }

      return false;
   }

   static hide(){
      let loading_circle = document.getElementById("loading-circle");

      if( loading_circle ){
         loading_circle.style.visibility = "hidden";
         return true;
      }

      return false;
   }

	render(){
		return (
         <div id="loading-bg">
            <div id="loading-circle" ></div>
         </div>
		);
	}
}


export default BlueCircle_greyBG;
