import React, {Component} from 'react';


import Chosen_SingleSelect from '/imports/ui/chosen_SingleSelect';
import JQueryUiExtensions_LabeledSlider from '/imports/ui/jQueryUiExtensions_LabeledSlider';

import DB_Const from '/imports/api/functional/db_Const';


/* TODO If slider is not moved, treat as NOT answered */

/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page2 extends Component {

   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> First Language and Educational History </h3>
            <hr className="_Theme_hr_Default_"/>
            <br />

            <annotation>  Where were you born?  	</annotation>
            <Chosen_SingleSelect
               dbDataset={ DB_Const.COUNTRY__LEARNPROF }
               defaultText="Select a Country"

               width="50%"

               allow_single_deselect={true}
            />

            <annotation>  How long did you live in the location where you were born?   </annotation>
            <label> <input type="number" className="single-date-or-month-field      form-control-spinner" min="0" /> years </label>

            <annotation>  Spoken proficiency in first language   </annotation>
            <JQueryUiExtensions_LabeledSlider
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
            <JQueryUiExtensions_LabeledSlider
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
            <input className="form-control" />

            <br /><br />
         </div>

      );
   }

   componentDidMount() {

   }

};

export default LearnProf_page2;
