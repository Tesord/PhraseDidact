import React, {Component} from 'react';

import Ui_Util from '../api/render/ui_Util';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class Chosen_SingleSelect extends Component {

   getSelectedValue(){
      return document.getElementById(this.selectElementId).value;
   }


   render(){
      let result = Ui_Util.create_SingleSelect_fromObj( this.props.dbDataset, this.props.defaultText );

      this.selectElementId = result.elementId;
      return result.jsx;
   }


   componentDidMount() {

      $("#" + this.selectElementId).chosen({
         width: this.props.width,

         allow_single_deselect: this.props.allow_single_deselect,

         no_results_text: this.props.no_results_text,
         create_option: this.props.create_option
      });

   }

}

export default Chosen_SingleSelect;
