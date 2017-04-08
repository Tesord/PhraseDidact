import React, {Component} from 'react';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class ICheck_Radio extends Component {

   static defaultRadioClass = "iradio_flat-green";


   render(){
<<<<<<< HEAD
      return ( <input type="radio" name={this.props.radioName}
=======
      return ( <input type="radio"     name={this.props.radioName}      value={this.props.value}
>>>>>>> 7a9db7844928b37709a5db1e01139fdea4916c9a
                  ref={ (this_elem) => {this.radio = this_elem; } }  /> );
   }


   componentDidMount() {

<<<<<<< HEAD
=======
      /* Styling assign */
>>>>>>> 7a9db7844928b37709a5db1e01139fdea4916c9a
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

<<<<<<< HEAD
=======

      /* DeSelectable functionality */
      if(this.props.isDeSelectable){
         let radioSelector = $(this.radio);

         radioSelector.on('ifClicked', function(event){
            if( radioSelector.iCheck('update')[0].checked ){
               radioSelector.iCheck('uncheck');
            }
         });
      }
>>>>>>> 7a9db7844928b37709a5db1e01139fdea4916c9a
   }

}

export default ICheck_Radio;
