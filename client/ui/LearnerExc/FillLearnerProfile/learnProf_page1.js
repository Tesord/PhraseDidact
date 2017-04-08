import React, {Component} from 'react';
import { DateField } from 'react-date-picker';


import Chosen_SingleSelect from '/imports/ui/chosen_SingleSelect';
import Chosen_MultiSelect from '/imports/ui/chosen_MultiSelect';

import Ui_Util from '/imports/api/render/ui_Util';
import DB_Const from '/imports/api/functional/db_Const';


/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page1 extends Component {

   render() {
      return(

         <div>

            <p>
               Before you get started, please take a moment of your time to fill out this <b>Learner Profile </b>. <br/>
               All information you fill in will be used by language specialists for research purposes. <br/>
               <br/>
               Filling in / completing this form is not mandatory, but any contribution would greatly help out
               language researchers in their mission to improve the learning process. <br/>
               Thank you. <br/><br/>
            </p>

            <div id="learner-profile-form" className="h-center-margin">

               <annotation>	Gender	</annotation>
               <Chosen_SingleSelect
                  dbDataset={ DB_Const.GENDER__LEARNPROF }
                  defaultText="Select a Gender"

                  width="50%"

                  allow_single_deselect={true}
               />

               <annotation>	Birthday (YYYY-MM-DD)	</annotation>
               <DateField  dateFormat="YYYY-MM-DD" className="h-center-margin" />


               <hr className="_Theme_hr_Default_"/>
               <h3> Residence </h3>
               <br />

               <annotation>	Current Country of residence	</annotation>
               <Chosen_SingleSelect
                  dbDataset={ DB_Const.COUNTRY__LEARNPROF }
                  defaultText="Select a Country"

                  width="50%"

                  allow_single_deselect={true}
               />

               <annotation>	What is the official Language(s) of your country?	</annotation>
               <Chosen_MultiSelect
                  dbDataset={ DB_Const.LANGUAGE__LEARNPROF }
                  defaultText="Select or type Languages..."

                  width="100%"

                  max_selected_options={10}
                  single_backstroke_delete={false}

                  no_results_text={ Ui_Util.no_result_text_create_option }
                  create_option={true}
               />

               <annotation>   What is the dominant Language of the city where you currently reside? 	</annotation>
               <Chosen_SingleSelect
                  dbDataset={ DB_Const.LANGUAGE__LEARNPROF }
                  defaultText="Select or type a Language"

                  width="50%"

                  allow_single_deselect={true}

                  no_results_text={ Ui_Util.no_result_text_create_option }
                  create_option={true}
               />


               <br /><br /><br /><br /><br /><br /><br />
            </div>
         </div>

      );
   }

   componentDidMount() {


   }

};

export default LearnProf_page1;
