import React, {Component} from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class Language_Select extends Component {

   render(){
      let result = null;

      if(this.props.isSingle){
         result = Ui_Util.create_SingleSelect_fromObj( DB_Const.LANGUAGE_LEARNPROF, this.props.classNameOfSelect, "Select or type a Language");
      }
      else{
         result = Ui_Util.create_MultiSelect_fromObj( DB_Const.LANGUAGE_LEARNPROF, this.props.classNameOfSelect, "Select or type Languages...");
      }

      this.selectRef = result.selectRef;
      return result.jsx;
   }

}

export default Language_Select;
