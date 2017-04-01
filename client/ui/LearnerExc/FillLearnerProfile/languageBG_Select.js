import React, {Component} from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LanguageBG_Select extends Component {

   render(){
      let result = Ui_Util.create_MultiSelect_fromObj( DB_Const.LANGUAGE_LEARNPROF, "Select Languages..." );

      this.selectRef = result.selectRef;
      return result.jsx;
   }

}

export default LanguageBG_Select;
