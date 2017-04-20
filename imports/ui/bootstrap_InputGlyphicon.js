import React, {Component} from 'react';


class Bootstrap_InputGlyphicon extends Component {

   render(){
      return (

         <div className="form-group has-feedback">
            <input type="text" className="form-control"        ref={ (this_elem) => {this.input = this_elem;} } />
            <span className={"glyphicon " + this.props.glyphiconClassName +  " form-control-feedback"} ></span>
         </div>

      );
   }

   componentDidMount(){
      if( this.props.typingFunction && this.props.typingFuncContext ){
         this.input.addEventListener('keypress', this.props.typingFunction);
      }
   }

}

export default Bootstrap_InputGlyphicon;
