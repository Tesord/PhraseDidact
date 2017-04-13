import React, {Component} from 'react';


class Picture_Button extends Component {

   render(){
      return (

         <img src={ this.props.imgURL }    width={ this.props.width }    height={ this.props.height }
            tabIndex="0"      className={this.props.className}
            onClick={ this.props.actFunction.bind(this.props.functionContext, this.props.actFuncParams )	}

            ref={ (this_elem) => {this.picture_button = this_elem;} }/>

      );
   }

   componentDidMount(){
      /* Keyboard accessibility */
      this.picture_button.addEventListener('keypress', function(e) {
			// Enter key toggle
			if (e.keyCode == 13) {
				e.target.click();
			}
		});
   }

}

export default Picture_Button;
