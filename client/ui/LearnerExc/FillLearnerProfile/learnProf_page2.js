import React, {Component} from 'react';


import Chosen_SingleSelect from '/imports/ui/chosen_SingleSelect';
import JQueryUiExtensions_LabeledSlider from '/imports/ui/jQueryUiExtensions_LabeledSlider';

import DB_Const from '/imports/api/functional/db_Const';


/* TODO If slider is not moved, treat as NOT answered */

/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page2 extends Component {


   save(){
      let fieldNameArray = [];
      let valueArray = [];

      /* REF: Edit when database field increases
       */
      fieldNameArray.push("bornCountry");
      valueArray.push( this.bornCountry_Ref.getSelectedValue() );

      fieldNameArray.push("bornCountryNumYear");
      valueArray.push( this.bornCountryNumYear_Ref.value  );

      fieldNameArray.push("firstLangSpokenProfic");
      /* Since an extra label of "no answer" is added to every JQueryUiExtensions_LabeledSlider here, the index of
       * of the tickLabels became +1 than their DB_Const counterpart. The " -1 " offset that differences. */
      valueArray.push( this.firstLangSpokenProfic_Ref.getSelectedValue() - 1 );

      fieldNameArray.push("firstLangHighestEduc");
      valueArray.push( this.firstLangHighestEduc_Ref.getSelectedValue() - 1 );

      fieldNameArray.push("univSpec");
      valueArray.push( this.univSpec_Ref.value  );


      Meteor.call('learner.saveLearningProfile', fieldNameArray, valueArray, (err, result) => {

         /* TODO Standardlised error handling method in Ui_Util? */

         }

      );

   }


   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> First Language and Educational History </h3>
            <hr className="_Theme_hr_Default_"/>
            <br />

            <annotation>  Where were you born?  	</annotation>
            <Chosen_SingleSelect          ref={(this_elem) => { this.bornCountry_Ref = ( this_elem ); } }
               dbDataset={ DB_Const.COUNTRY__LEARNPROF }
               defaultText="Select a Country"

               width="50%"

               allow_single_deselect={true}
            />

            <annotation>  How long did you live in the location where you were born?   </annotation>
            <label>
               <input type="number" className="single-date-or-month-field      form-control-spinner" min="0"
                  ref={(this_elem) => { this.bornCountryNumYear_Ref = ( this_elem ); } }      /> years
            </label>

            <annotation>  Spoken proficiency in first language   </annotation>
            <JQueryUiExtensions_LabeledSlider         ref={(this_elem) => { this.firstLangSpokenProfic_Ref = ( this_elem ); } }
               min={0}
               max={6}
               tickInterval={1}
               tickArray={ [0, 1, 2, 3, 4, 5, 6] }
               tickLabels={
                  {
                     0 : "<i>No answer<i/>",
                     1 : DB_Const.LANG_PROFIC__LEARNPROF[0].replace(/\s+/g, '<br />') ,
                     2 : DB_Const.LANG_PROFIC__LEARNPROF[1].replace(/\s+/g, '<br />') ,
                     3 : DB_Const.LANG_PROFIC__LEARNPROF[2].replace(/\s+/g, '<br />') ,
                     4 : DB_Const.LANG_PROFIC__LEARNPROF[3].replace(/\s+/g, '<br />') ,
                     5 : DB_Const.LANG_PROFIC__LEARNPROF[4].replace(/\s+/g, '<br />') ,
                     6 : DB_Const.LANG_PROFIC__LEARNPROF[5].replace(/\s+/g, '<br />') ,
                  }
               }
            />
            <br /><br /><br />

            <annotation>  Highest level of education completed in first language  </annotation>
            <JQueryUiExtensions_LabeledSlider      ref={(this_elem) => { this.firstLangHighestEduc_Ref = ( this_elem ); } }
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

            <annotation> 	If you went to university, what field did you specialize in?   </annotation>
            <input className="form-control"     ref={(this_elem) => { this.univSpec_Ref = ( this_elem ); } }  />

            <br /><br />
         </div>

      );
   }

   componentDidMount() {

   }

};

export default LearnProf_page2;
