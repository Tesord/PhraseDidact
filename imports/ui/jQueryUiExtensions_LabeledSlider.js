import React, {Component} from 'react';


class JQueryUiExtensions_LabeledSlider extends Component {

   getSelectedValue(){
      return $(this.slider).labeledslider("option", "value");
   }


   render(){
      return ( <div ref={ (this_elem) => {this.slider = this_elem; } }></div> );
   }


   componentDidMount() {

      /* TODO Action Listener on change = linear-gradient(90deg, *color* *left of slider*, transparent 0px)
       * for background: of .ui-widget-content
       * Perhaps add this to theme-default? And remove existing background setting for .ui-widget-content of jquery-ui*/
      $( this.slider ).labeledslider({
         min: this.props.min,
         max: this.props.max,
         tickInterval: this.props.tickInterval,
         tickArray: this.props.tickArray,
         tickLabels: this.props.tickLabels
      });

   }

}


export default JQueryUiExtensions_LabeledSlider;
