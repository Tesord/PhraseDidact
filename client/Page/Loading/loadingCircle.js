import React, {Component} from 'react';


/*
 * USAGE: Should only be rendered in one location.
 */
class LoadingCircle extends Component{

   componentDidMount(){
      LoadingCircle.hide();
   }


   /**
    * Remember to call this in the componentDidUnmount() method of every component that have an initialisation animation.
    */
   static show(){
      document.getElementById("loading-circle").style.visibility = "visible";
   }

   /**
    * Remember to call this in the componentWillUnmount() method of every component that have an initialisation animation,
    * as well as when the initialisation has ended.
    */
   static hide(){
      document.getElementById("loading-circle").style.visibility = "hidden";
   }

	render(){
		return (
         <div id="loading-bg">
            <div id="loading-circle" ></div>
         </div>
		);
	}
}


export default LoadingCircle;
