import React, {Component} from 'react';


import Country_Select__C from './country_Select';

import DB_Const from '/imports/api/functional/db_Const';
import Ui_Util from '/imports/api/render/ui_Util';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page3 extends Component {

   render() {
      return(

         <div id="learner-profile-form" className="h-center-margin">

            <h3> Other languages and educational history  </h3>
            <hr className="_Theme_hr_Default_"/>
            <br />

            <annotation>  Did you every go to school where school subjects were taught in a language other than your first language?   	</annotation>
            <div className="funkyradio">
					<div className="funkyradio-success">
		            <input type="radio" name="radio" id="diff-first-lang-Yes" />
                  <label htmlFor="diff-first-lang-Yes"	tabIndex="0"
							 ref={ (this_elem) => {this.diff_first_lang_Yes_lbl = this_elem;} } >
								Yes
						</label>
		      	</div>

					<div className="funkyradio-danger">
		            <input type="radio" name="radio" id="diff-first-lang-No"  />
                  <label htmlFor="diff-first-lang-No"	tabIndex="0"
							 ref={ (this_elem) => {this.diff_first_lang_No_lbl = this_elem;} }>
								No
						</label>
		        	</div>
				</div>


         </div>

      );
   }

   componentDidMount() {

   	/* Keyboard accessibility */
   		this.diff_first_lang_Yes_lbl.addEventListener('keypress', Ui_Util.funkyRadio_Handler );
   		this.diff_first_lang_No_lbl.addEventListener('keypress', Ui_Util.funkyRadio_Handler );
   }

}

export default LearnProf_page3;
