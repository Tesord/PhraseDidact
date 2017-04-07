import React, {Component} from 'react';

import Ui_Util from '../api/render/ui_Util';
import DB_Const from '../api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class Chosen_MultiSelect extends Component {

   render(){
      let result = Ui_Util.create_MultiSelect_fromObj( this.props.dbDataset, this.props.defaultText);

      this.selectElementId = result.elementId;
      return result.jsx;
   }


   componentDidMount() {

      $("#" + this.selectElementId).chosen({
         width: this.props.width,

         max_selected_options: this.props.max_selected_options,
         single_backstroke_delete: this.props.single_backstroke_delete,

         no_results_text: this.props.no_results_text,
         create_option: this.props.create_option
      });

   }

}

export default Chosen_MultiSelect;
