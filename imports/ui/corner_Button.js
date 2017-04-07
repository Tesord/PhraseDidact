import React, {Component} from 'react';


class Corner_Button extends Component {

   render(){
      return (

         <img src={ this.props.imgURL }    width={ this.props.width }    height={ this.props.height }
            tabIndex="0"
            onClick={ this.props.actFunction.bind(this.props.functionContext, this.props.actFuncParams )	}

            ref={ (this_elem) => {this.corner_button = this_elem;} }/>

      );
   }

   componentDidMount(){
      /* Keyboard accessibility */
      this.corner_button.addEventListener('keypress', function(e) {
			// Enter key toggle
			if (e.keyCode == 13) {
				e.target.click();
			}
		});


      let className = "";

      switch( this.props.type ){
         case "TR":
            className = "top-right-corner-button";
            break;
         default:
            className = "top-right-corner-button";
      }


      this.corner_button.className = className;
   }

}

export default Corner_Button;
