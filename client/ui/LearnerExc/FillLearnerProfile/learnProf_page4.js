import React, {Component} from 'react';

import Chosen_SingleSelect from '/imports/ui/chosen_SingleSelect';
import ICheck_Radio from '/imports/ui/iCheck_Radio';
import JQueryUiExtensions_LabeledSlider from '/imports/ui/jQueryUiExtensions_LabeledSlider';
import Chosen_MultiSelect from '/imports/ui/chosen_MultiSelect';


import DB_Const from '/imports/api/functional/db_Const';
import Ui_Util from '/imports/api/render/ui_Util';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page4 extends Component {

   save(){
      let fieldNameArray = [];
      let valueArray = [];

      /* REF: Edit when database field increases
      */
      fieldNameArray.push("langWantLearn");
      valueArray.push( this.langWantLearn_Ref.getSelectedValue() );


      fieldNameArray.push("learnReason");
      valueArray.push( this.learnReason_Ref.getSelectedValue_OfRadioGroup()  );

      switch ( this.learnReason_Ref.getSelectedValue_OfRadioGroup() ){
         case "travel_1":
            fieldNameArray.push("learnReason_travel_1");
            valueArray.push( this.learnReason_travel_1_Ref.value  );
            break;
         case "education_1":
            fieldNameArray.push("learnReason_education_1");
            valueArray.push( this.learnReason_education_1_Ref.getSelectedValue() - 1 );
            break;
         case "other":
            fieldNameArray.push("learnReason_other");
            valueArray.push( this.learnReason_other_Ref.value );
            break;
         default:
      }


      fieldNameArray.push("countriesWhileLearning");
      valueArray.push( this.countriesWhileLearning_Ref.getSelectedValueArray()  );


      Meteor.call('learner.saveLearningProfile', fieldNameArray, valueArray, (err, result) => {

         /* TODO Standardlised error handling method in Ui_Util? */

         }

      );

   }

   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> Learning language </h3>
            <hr className="_Theme_hr_Default_"/>
            <br />


            <annotation>  What language do you want to learn with this software?  	</annotation>
            <Chosen_SingleSelect          ref={(this_elem) => { this.langWantLearn_Ref = ( this_elem ); } }
               dbDataset={ DB_Const.LANGUAGE__LEARNPROF }
               defaultText="Select or type a Language"

               width="50%"

               allow_single_deselect={true}

               no_results_text={ Ui_Util.no_result_text_create_option }
               create_option={true}
            />
            <br /><br />


            <annotation>  Why do you want to learn this language?   </annotation>

            <h5> Travel </h5>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="travel_0" 
                     ref={(this_elem) => { this.learnReason_Ref = ( this_elem ); } }  /> { DB_Const.REASON__LEARNPROF.travel_0 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="travel_1"  /> { DB_Const.REASON__LEARNPROF.travel_1 }
               <input type="number" className="single-date-or-month-field      form-control-spinner" min="0"
                     ref={(this_elem) => { this.learnReason_travel_1_Ref = ( this_elem ); } }      /> months
            </label>

            <h5> Education </h5>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="education_0"  /> { DB_Const.REASON__LEARNPROF.education_0 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="education_1"  /> { DB_Const.REASON__LEARNPROF.education_1 }
            </label>
            <JQueryUiExtensions_LabeledSlider     ref={(this_elem) => { this.learnReason_education_1_Ref = ( this_elem ); } }
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

            <h5> Employment </h5>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="employment_0"  /> { DB_Const.REASON__LEARNPROF.employment_0 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="employment_1"  /> { DB_Const.REASON__LEARNPROF.employment_1 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="employment_2"  /> { DB_Const.REASON__LEARNPROF.employment_2 }
            </label>
            <br/>

            <h5> Immigration / Changing residence </h5>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="residence_0"  /> { DB_Const.REASON__LEARNPROF.residence_0 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="residence_1"  /> { DB_Const.REASON__LEARNPROF.residence_1 }
            </label>
            <br/>

            <h5> Personal </h5>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="personal_0"  /> { DB_Const.REASON__LEARNPROF.personal_0 }
            </label>
            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="personal_1"  /> { DB_Const.REASON__LEARNPROF.personal_1 }
            </label>
            <br/>

            <label className="single-line-element">
               <ICheck_Radio radioName="choice" value="other"  /> Other reason:
               <input className="form-control"     ref={(this_elem) => { this.learnReason_other_Ref = ( this_elem ); } }   />
            </label>
            <br />


            <annotation>  In what country(ies) will you be in when learning this language?	</annotation>
            <Chosen_MultiSelect           ref={(this_elem) => { this.countriesWhileLearning_Ref = ( this_elem ); } }
               dbDataset={ DB_Const.COUNTRY__LEARNPROF }
               defaultText="Select Countries..."

               width="100%"

               max_selected_options={10}
               single_backstroke_delete={false}
            />


            <br /><br /><br /><br /><br />
         </div>

      );
   }

}

export default LearnProf_page4;
