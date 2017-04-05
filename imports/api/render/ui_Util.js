import React from 'react';



export function funkyRadio_Handler(e){
   // Space Bar + Enter key toggle
   if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode === 13) {
      // prevent bar-scrolling when space bar is clicked
      e.preventDefault();

      let forElementID = e.target.getAttribute("for");
      document.getElementById(forElementID).checked = true;
   }
}

export function makeFunkyRadio_Deselectable(arrayOfElementID){
   // TODO

}


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
export function create_SingleSelect_fromObj (obj, className, initText){
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

      <select  data-placeholder={initText}    className={className}
         ref={(this_elem) => {selectRef = this_elem;}} >
            {selects}
      </select>

   );


   return {
      jsx,
      selectRef
   };
}

export const no_result_text_create_option = 'No match. To add a new option, press "Tab" after typing. Or press "Enter" now to add:';

   /* TODO document this method */
export function create_MultiSelect_fromObj (obj, className, initText){
   let selects = create_OptionArray_fromObj(obj);
   let selectRef = null;

   /* Prevent a bug (of a custom-implemented feature) where pressing "tab" on a fresh multi-select
    * would automatically choose the last option. (Chosen ignores blank Options) */
   selects.push(
      <option value=""  key=" "> </option>
   );

   let jsx = (
      <select  data-placeholder={initText}    multiple   className={className}
         ref={(this_elem) => {selectRef = this_elem;}} >
            {selects}
      </select>
   );


   return {
      jsx,
      selectRef
   };
}
