import React from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
const Language_Select = (props) => {

   let result = null;

   if(props.isSingle){
      result = Ui_Util.create_SingleSelect_fromObj( DB_Const.LANGUAGE__LEARNPROF, props.classNameOfSelect, "Select or type a Language");
   }
   else{
      result = Ui_Util.create_MultiSelect_fromObj( DB_Const.LANGUAGE__LEARNPROF, props.classNameOfSelect, "Select or type Languages...");
   }

   this.selectRef = result.selectRef;
   return result.jsx;

};

export default Language_Select;
