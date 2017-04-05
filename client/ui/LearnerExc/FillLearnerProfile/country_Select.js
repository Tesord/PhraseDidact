import React from 'react';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
const Country_Select = (props) => {

   let result = Ui_Util.create_SingleSelect_fromObj( DB_Const.COUNTRY__LEARNPROF, props.classNameOfSelect, "Select a Country" );

   this.selectRef = result.selectRef;
   return result.jsx;

};

export default Country_Select;
