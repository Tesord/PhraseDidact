import React from 'react';
import shortid from 'shortid';

import Picture_Button from '/imports/ui/picture_Button';


// Space Bar + Enter key toggle
export const standardKB_Toggle_KeyCode = [0, 32, 13];


export function funkyRadio_KBstandardSelect_Handler(e){

   if ( standardKB_Toggle_KeyCode.indexOf(e.keyCode) > -1 ) {
      // prevent bar-scrolling when space bar is clicked
      e.preventDefault();

      let forElementID = e.target.getAttribute("for");
      document.getElementById(forElementID).checked = true;
   }
}


export function funkyRadio_KBdeSelectable_Handler(e){

   if ( standardKB_Toggle_KeyCode.indexOf(e.keyCode) > -1 ) {
      e.preventDefault();
      funkyRadio_MouseDeSelectable_Handler(e);
   }
}


export function funkyRadio_MouseDeSelectable_Handler(e){
      // overwrite regular click "For" event
      e.preventDefault();

      let forElementID = e.target.getAttribute("for");
      let forElement = document.getElementById(forElementID);

      if( forElement.checked ){
         forElement.checked = false;
      }
      else{
         forElement.checked = true;
      }

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
export function create_SingleSelect_fromObj (obj, initText){
   let selects = [];

   if(initText){
      // Allow Chosen (jQuery select boxes) to initiate a select with a default value of *blank*.
      selects.push(
         <option value=""  key=" "> </option>
      );
   }

   selects = selects.concat( create_OptionArray_fromObj(obj) );

   // React's ref system does not work, since the component has not been mounted yet. So elementId is used instead [See chosen_SingleSelect.js].
   let elementId = "ssfo" + shortid.generate();
   let jsx = (

      <select  data-placeholder={initText}   id={ elementId } >
            {selects}
      </select>

   );


   return {
      jsx,
      elementId
   };
}


export const no_result_text_create_option = 'No match. To add a new option, press "Tab" after typing. Or press "Enter" now to add:';

   /* TODO document this method */
export function create_MultiSelect_fromObj (obj, initText){
   let selects = create_OptionArray_fromObj(obj);
   let selectRef = null;

   /* Prevent a bug (of a custom-implemented feature) where pressing "tab" on a fresh multi-select
    * would automatically choose the last option. (Chosen ignores blank Options) */
   selects.push(
      <option value=""  key=" "> </option>
   );


   let elementId = "msfo" + shortid.generate();
   let jsx = (
      <select  data-placeholder={initText}    multiple   id={ elementId } >
            {selects}
      </select>
   );


   return {
      jsx,
      elementId
   };
}


/* PhraseDidact specific */

export function create_EditingWordBlock(course_Words, isL2, funcContext, editBlock_func, removeBlock_func){

   let resultList = [];

   let html_Ver_Examples = [];
   let wordName = "";
   let uniqueId = "";

   for(let word_pair   of    course_Words){
      if( isL2 ){
         html_Ver_Examples = word_pair.l2_examples.map(
            create_EditingWordBlock__MapFunc
         );

         wordName = word_pair.l2_wordName;
      }
      else{
         html_Ver_Examples = word_pair.l1_examples.map(
            create_EditingWordBlock__MapFunc
         );

         wordName = word_pair.l1_wordName;
      }

      uniqueId = shortid.generate();

      resultList.push(
         <div key={"ewb" + uniqueId}  className="editing-word-block    _Theme_innerItem_Default_">
            <Picture_Button
               imgURL="/ui/img/close_cross_in_circular_outlined_interface.svg"
               className="align-right pointer-hover"      width="30rem" height="30rem"
               actFunction={ removeBlock_func }
               actFuncParams={ word_pair._id }
               functionContext={ funcContext }
            />
            <Picture_Button
               imgURL="/ui/img/Edit_Notepad_Icon.svg"
               className="align-right pointer-hover  moderate-right-margin"      width="27rem" height="27rem"
               actFunction={ editBlock_func }
               actFuncParams={ word_pair._id }
               functionContext={ funcContext }
            />

            <h4>{ wordName }</h4>
            <div className="single-line-element align-right"> Difficulty: { word_pair.difficultyLevel } </div>
            <br/>

            <div className="_Theme_exampleText_Default_">{ html_Ver_Examples }</div>
         </div>
      );
   }

   return resultList;
}
/* HELPER function of create_EditingWordBlock() */
function create_EditingWordBlock__MapFunc(line_Of_Example){
   uniqueId = shortid.generate();

   return ( <div     key={"exam" + uniqueId}> - {line_Of_Example} <br/></div> );
}
