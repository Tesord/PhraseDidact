import React, {Component} from 'react';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class ICheck_Radio extends Component {

   static defaultRadioClass = "iradio_flat-green";


   render(){
      return ( <input type="radio"     name={this.props.radioName}
                  ref={ (this_elem) => {this.radio = this_elem; } }  /> );
   }


   componentDidMount() {

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
