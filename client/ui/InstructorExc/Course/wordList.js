import React from 'react';
import shortid from 'shortid';

import Picture_Button from '/imports/ui/picture_Button';



const WordList = (props) => {

   let resultList = [];

   let html_Ver_Examples = [];
   let wordName = "";
   let uniqueId = "";

   for(let word_pair   of    props.courseWords_List){
      if( props.isL2 ){
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
               actFunction={ props.removeBlock_func }
               actFuncParams={ word_pair._id }
               functionContext={ props.funcContext }
            />
            <Picture_Button
               imgURL="/ui/img/Edit_Notepad_Icon.svg"
               className="align-right pointer-hover  moderate-right-margin"      width="27rem" height="27rem"
               actFunction={ props.editBlock_func }
               actFuncParams={ word_pair._id }
               functionContext={ props.funcContext }
            />

            <h4>{ wordName }</h4>
            <div className="single-line-element align-right"> Difficulty: { word_pair.difficultyLevel } </div>
            <br/>

            <div className="_Theme_exampleText_Default_">{ html_Ver_Examples }</div>
         </div>
      );
   }

   return resultList;

};
/* HELPER function of create_EditingWordBlock() */
function create_EditingWordBlock__MapFunc(line_Of_Example){
   uniqueId = shortid.generate();

   return ( <div     key={"exam" + uniqueId}> - {line_Of_Example} <br/></div> );
}



export default WordList;
