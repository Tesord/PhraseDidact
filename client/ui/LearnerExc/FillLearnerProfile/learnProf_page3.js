import React, {Component} from 'react';
import shortid from 'shortid';

import Chosen_SingleSelect from '/imports/ui/chosen_SingleSelect';
import JQueryUiExtensions_LabeledSlider from '/imports/ui/jQueryUiExtensions_LabeledSlider';
import Corner_Button from '/imports/ui/corner_Button';

import DB_Const from '/imports/api/functional/db_Const';
import Ui_Util from '/imports/api/render/ui_Util';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page3 extends Component {

   constructor(){
      super();

      this.state = {
         langSection: []
      }
   }


/* TODO Remember, setState() is async! So this method must be modified to allow parameter pre-determined values
 * TODO perhaps give  a warning message when limit is reached?
 */
   addLangBlock(){

      // maximum block restriction
      if( this.state.langSection.length < 10){

         if( this.langName_Refs === undefined ){
            this.langName_Refs = [];
         }
         if( this.educLevel_Refs === undefined ){
            this.educLevel_Refs = [];
         }
         if( this.specField_Refs === undefined ){
            this.specField_Refs = [];
         }


         let uniqueNumber = shortid.generate();

         let newBlock = (

            <div  key={ uniqueNumber }  id="learnProf-page3-block">
               <br />

                  <Corner_Button imgURL="/img/ui/close_cross_in_circular_outlined_interface.svg"
                     type="TR"            width="40rem" height="40rem"
                     actFunction={this.removeLangBlock}     actFuncParams={this.state.langSection.length}
                     functionContext={this}
                  />


               <annotation>   What language is it? 	</annotation>
               <Chosen_SingleSelect             ref={(this_elem) => { this.langName_Refs.push(this_elem); } }
                  dbDataset={ DB_Const.LANGUAGE__LEARNPROF }
                  defaultText="Select or type a Language"

                  width="50%"

                  allow_single_deselect={true}

                  no_results_text={ Ui_Util.no_result_text_create_option }
                  create_option={true}
               />

               <annotation>  Highest level of education completed in this language  </annotation>
               <JQueryUiExtensions_LabeledSlider      ref={(this_elem) => { this.educLevel_Refs.push(this_elem); } }
                  min={0}
                  max={7}
                  tickInterval={1}
                  tickArray={ [0, 1, 2, 3, 4, 5, 6, 7] }
                  tickLabels={
                     {
                        0 : "<i>No answer<i/>",
                        1 : DB_Const.EDUC_LEVEL__LEARNPROF[0].replace(/\s+/g, '<br />') ,
                        2 : DB_Const.EDUC_LEVEL__LEARNPROF[1].replace(/\s+/g, '<br />') ,
                        3 : DB_Const.EDUC_LEVEL__LEARNPROF[2].replace(/\s+/g, '<br />') ,
                        4 : DB_Const.EDUC_LEVEL__LEARNPROF[3].replace(/\s+/g, '<br />') ,
                        5 : DB_Const.EDUC_LEVEL__LEARNPROF[4].replace(/\s+/g, '<br />') ,
                        6 : DB_Const.EDUC_LEVEL__LEARNPROF[5].replace(/\s+/g, '<br />') ,
                        7 : DB_Const.EDUC_LEVEL__LEARNPROF[6].replace(/\s+/g, '<br />')
                     }
                  }
               />
               <br /><br /><br /><br /><br /><br />

               <annotation> 	If you went to university in this language, what field did you specialize in?   </annotation>
               <input className="form-control"  ref={(this_elem) => { this.specField_Refs.push(this_elem); } }  />

               <br />
               <hr className="_Theme_hr_Default_"/>

            </div>

         );


         this.setState({
            langSection : this.state.langSection.concat([newBlock])
         })

      }
   }

   removeLangBlock(langBlock_Index){
      this.setState({
         langSection : this.state.langSection.slice(0, langBlock_Index).concat(
                                                            this.state.langSection.slice(langBlock_Index + 1) )
      })
   }


   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> Other languages and educational history  </h3>
            <br />

            <annotation>  Did you every go to school where school subjects were taught in a language other than your first language?   	</annotation>
            <annotation>  If yes, please click the "<b>Add new language</b>" button below. </annotation>

            <hr className="_Theme_hr_Default_"/>

            {this.state.langSection}

            <a className="pd-btn rounded-border	   single-line-element   btn-info" href="javascript:void(0)"
               onClick={this.addLangBlock.bind(this)} >
               Add new language
            </a>
            <hr className="_Theme_hr_Default_"/>
         </div>

      );
   }


}

export default LearnProf_page3;
