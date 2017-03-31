import React, {Component} from 'react';


class Ui_Util extends Component {

   /* TODO document this method */
   static create_SingleSelect_fromObj (obj, initText){
      let selects = [];

      if(initText){
         // Allow Chosen (jQuery select boxes) to initiate a select with a default value of *blank*.

         selects.push(

            <option value=""  key=" "> </option>

         );
      }


      for (var key in obj) {
         selects.push(

            <option value={key}  key={key}> { obj[key] } </option>

         );
      }


      let selectRef = null;

      let jsx = (
         <select  data-placeholder={initText}    className="chosen-select"
            ref={(this_elem) => {selectRef = this_elem;}} >
               {selects}
         </select>
      );


      return {
         jsx,
         selectRef
      };
   }

}

export default Ui_Util;
