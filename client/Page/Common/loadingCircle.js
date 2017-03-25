import React, {Component} from 'react';


/*
 * USAGE: Should only be rendered in one location.
 */
class LoadingCircle extends Component{

   componentDidMount(){
      LoadingCircle.hide();
   }

   /* As long as this component has been rendered somewhere in the app, no reference to it
    * will be required to call these methods! */
   static show(){
      document.getElementById("loading-circle").style.visibility = "visible";
   }

   static hide(){
      document.getElementById("loading-circle").style.visibility = "hidden";
   }

	render(){
		return (
         <div className="align-left"  id="loading-circle" ></div>
		);
	}
}


export default LoadingCircle;
