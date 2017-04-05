import React, {Component} from 'react';


import Country_Select__C from './country_Select';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page2 extends Component {

   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> First Language and Educational History </h3>
            <hr className="_Theme_hr_Default_"/>
            <br />

            <annotation>  Where were you born?  	</annotation>
            <Country_Select__C  classNameOfSelect="chosen-select"/>

            <annotation>  How long did you live in the location where you were born?   </annotation>
            <label> <input type="number" className="single-date-or-month-field      form-control-spinner" min="0" /> years </label>

            <annotation>  Spoken proficiency in first language   </annotation>
            <div id="langProfic_Slider"></div>

         </div>

      );
   }

   componentDidMount() {

      // ok to do so as in exceptional cases, the page will be redirected/reloaded
      $('.chosen-select').chosen({
         width: '50%',
         allow_single_deselect: true
      });

      /* TODO Action Listener on change = linear-gradient(90deg, *color* *left of slider*, transparent 0px)
       * for background: of .ui-widget-content
       * Perhaps add this to theme-default? And remove existing background setting for .ui-widget-content of jquery-ui*/
      $('#langProfic_Slider').labeledslider({
         min: 0,
         max: 5,
         tickInterval: 1,
         tickArray: [0, 1, 2, 3, 4, 5],
           tickLabels: {
               0 : DB_Const.LANG_PROFIC__LEARNPROF[0].replace(/\s+/g, '<br />') ,
               1 : DB_Const.LANG_PROFIC__LEARNPROF[1].replace(/\s+/g, '<br />') ,
               2 : DB_Const.LANG_PROFIC__LEARNPROF[2].replace(/\s+/g, '<br />') ,
               3 : DB_Const.LANG_PROFIC__LEARNPROF[3].replace(/\s+/g, '<br />') ,
               4 : DB_Const.LANG_PROFIC__LEARNPROF[4].replace(/\s+/g, '<br />') ,
               5 : DB_Const.LANG_PROFIC__LEARNPROF[5].replace(/\s+/g, '<br />') ,
            }
      });

   }

};

export default LearnProf_page2;
