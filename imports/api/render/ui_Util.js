import React from 'react';


/* TODO document this method (a private method) */
function create_OptionArray_fromObj(obj){
   let selects = [];

   for (var key in obj) {
      selects.push(

         <option value={key}  key={key}> { obj[key] } </option>

      );
   }

   return selects;
}


   /* TODO document this method (only works if " allow_single_deselect: true " is turned on in jQuery) */
export function create_SingleSelect_fromObj (obj, initText){
   let selects = [];

   if(initText){

      // Allow Chosen (jQuery select boxes) to initiate a select with a default value of *blank*.
      selects.push(

         <option value=""  key=" "> </option>

      );
   }

   selects = selects.concat( create_OptionArray_fromObj(obj) );


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


   /* TODO document this method */
export function create_MultiSelect_fromObj (obj, initText){
   let selects = create_OptionArray_fromObj(obj);
   let selectRef = null;

   let jsx = (
      <select  data-placeholder={initText}    multiple   className="chosen-multiselect"
         ref={(this_elem) => {selectRef = this_elem;}} >
            {selects}
      </select>
   );


   return {
      jsx,
      selectRef
   };
}
