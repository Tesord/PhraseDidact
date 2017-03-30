import React, {Component} from 'react';


class Ui_Util extends Component {

   /* TODO document this method */
   static create_SelectOptions_fromObj (obj){
      let selects = [];

      for (var key in obj) {
         selects.push(

            <option value={key}  key={key}> { obj[key] } </option>

         );
      }


      let selectRef = null;

      let jsx = (
         <div className="h-center-margin    pure-css-select-style theme-default">

            <select     ref={(this_elem) => {selectRef = this_elem;} }>
               {selects}
            </select>

         </div>
      );


      return {
         jsx,
         selectRef
      };
   }

}

export default Ui_Util;
