import React, {Component} from 'react';


import Country_Select__C from './country_Select';

import DB_Const from '/imports/api/functional/db_Const';
import Ui_Util from '/imports/api/render/ui_Util';



/* TODO document how you can get ref from this class instance in fillLearnerProfile */
class LearnProf_page3 extends Component {

   constructor(){
      super();

      this.state = {
         anotherLangSection: []
      }
   }


/* TODO Remember, setState() is async! So this method must be modified to allow parameter pre-determined values */
   addAnotherLangBlock(){
      if( this.anotherLangBlockRefs === undefined ){
         this.anotherLangBlockRefs = [];
      }

      let newBlock = (

         <div ref={(this_elem) => { this.anotherLangBlockRefs.push(this_elem); } }     key={this.state.anotherLangSection.length} >
            <br />

            <annotation>  Highest level of education completed in this language  </annotation>
            <div className="anotherLangEducLevel_Slider"></div>
            <br /><br /><br /><br /><br /><br />

            <annotation> 	If you went to university in this language, what field did you specialize in?   </annotation>
            <input className="form-control" />


            <br />
            <hr className="_Theme_hr_Default_"/>

         </div>

      );


      this.setState({
         anotherLangSection : this.state.anotherLangSection.concat([newBlock])
      })
   }


   showAnotherLangBlock(){
      // if(){
      //
      // }
   }

   hideAnotherLangBlock(){

   }

   componentDidUpdate(){

      let sliders_Selector = $(".anotherLangEducLevel_Slider");

      if( sliders_Selector.length > 0 ){

         sliders_Selector.labeledslider({
            min: 0,
            max: 7,
            tickInterval: 1,
            tickArray: [0, 1, 2, 3, 4, 5, 6, 7],
              tickLabels: {
                  0 : "<i>No answer<i/>",
                  1 : DB_Const.EDUC_LEVEL__LEARNPROF[0].replace(/\s+/g, '<br />') ,
                  2 : DB_Const.EDUC_LEVEL__LEARNPROF[1].replace(/\s+/g, '<br />') ,
                  3 : DB_Const.EDUC_LEVEL__LEARNPROF[2].replace(/\s+/g, '<br />') ,
                  4 : DB_Const.EDUC_LEVEL__LEARNPROF[3].replace(/\s+/g, '<br />') ,
                  5 : DB_Const.EDUC_LEVEL__LEARNPROF[4].replace(/\s+/g, '<br />') ,
                  6 : DB_Const.EDUC_LEVEL__LEARNPROF[5].replace(/\s+/g, '<br />') ,
                  7 : DB_Const.EDUC_LEVEL__LEARNPROF[6].replace(/\s+/g, '<br />')
               }
         });

      }

   }


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

            <hr className="_Theme_hr_Default_"/>

            {this.state.anotherLangSection}

            <a className="pd-btn rounded-border	   single-line-element   btn-info" href="javascript:void(0)"
               onClick={this.addAnotherLangBlock.bind(this)} >
               Add new language
            </a>
            <hr className="_Theme_hr_Default_"/>
         </div>

      );
   }

   componentDidMount() {
      /* Keyboard accessibility + Deselect compatibility for FunkyRadio */
      this.diff_first_lang_Yes_lbl.addEventListener('keypress', Ui_Util.funkyRadio_KBdeSelectable_Handler );
      this.diff_first_lang_No_lbl.addEventListener('keypress', Ui_Util.funkyRadio_KBdeSelectable_Handler );
      this.diff_first_lang_Yes_lbl.addEventListener('click', Ui_Util.funkyRadio_MouseDeSelectable_Handler );
      this.diff_first_lang_No_lbl.addEventListener('click', Ui_Util.funkyRadio_MouseDeSelectable_Handler );

      /* Toggle additional info block */
      // this.diff_first_lang_Yes_lbl.addEventListener('keypress', this.showAnotherLangBlock );
      // this.diff_first_lang_No_lbl.addEventListener('keypress', this.hideAnotherLangBlock );
      // this.diff_first_lang_Yes_lbl.addEventListener('click', this.showAnotherLangBlock );
      // this.diff_first_lang_No_lbl.addEventListener('click', this.hideAnotherLangBlock );

   }

}

export default LearnProf_page3;
