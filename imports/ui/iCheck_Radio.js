import React, {Component} from 'react';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class ICheck_Radio extends Component {

   static defaultRadioClass = "iradio_flat-green";


   getSelectedValue_OfRadioGroup(){
      return $('input[name=' + this.props.radioName + ']:checked').val();
   }


   render(){
      return ( <input type="radio"     name={this.props.radioName}      value={this.props.value}   defaultChecked={this.props.checked}
                  ref={ (this_elem) => {this.radio = this_elem; } }  /> );
   }


   componentDidMount() {

      /* Styling assign */
      let radioClass = "";

      if( !this.props.radioClass ){
         radioClass = ICheck_Radio.defaultRadioClass;
      }
      else{
         radioClass = this.props.radioClass;
      }

      $( this.radio ).iCheck({
         radioClass: radioClass
      });

   }

}

export default ICheck_Radio;
