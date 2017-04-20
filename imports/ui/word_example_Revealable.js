import React, {Component} from 'react';

import Tipped from '/public/ui/tipped.js';


class Word_Example_Revealable extends Component {

   render(){
      return (

         <div>
            <h3 className="simple-tooltip"> { this.props.word } </h3>
         </div>

      );
   }

   componentDidMount(){

      Tipped.create(".simple-tooltip", "<br> TODO change me to be dyanmic ",
         { position: "bottom" }
      );

   }

}

export default Word_Example_Revealable;
