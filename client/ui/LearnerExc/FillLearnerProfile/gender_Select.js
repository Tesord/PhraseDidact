import React, {Component} from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class Gender_Select extends Component {

   getSelectElementId(){
      return this.selectElementId;
   }

   render(){
      let result = Ui_Util.create_SingleSelect_fromObj( DB_Const.GENDER__LEARNPROF, this.props.classNameOfSelect, "Select a Gender" );

      this.selectElementId = result.elementId;
      return result.jsx;
   }

}

export default Gender_Select;
