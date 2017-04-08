import React, {Component} from 'react';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class ICheck_Radio extends Component {

   static defaultRadioClass = "iradio_flat-green";


   render(){
      return ( <input type="radio"     name={this.props.radioName}      value={this.props.value}
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


      /* DeSelectable functionality */
      if(this.props.isDeSelectable){
         let radioSelector = $(this.radio);

         radioSelector.on('ifClicked', function(event){
            if( radioSelector.iCheck('update')[0].checked ){
               radioSelector.iCheck('uncheck');
            }
         });
      }
   }

}

export default ICheck_Radio;
