import React, {Component} from 'react';


import Country_Select__C from './country_Select';
import Language_Select__C from './language_Select';

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


/* TODO Remember, setState() is async! So this method must be modified to allow parameter pre-determined values
 * TODO perhaps give  a warning message when limit is reached?
 */
   addAnotherLangBlock(){

      // maximum block restriction
      if( this.state.anotherLangSection.length < 10){

         if( this.langName_Refs === undefined ){
            this.langName_Refs = [];
         }
         if( this.educLevel_Refs === undefined ){
            this.educLevel_Refs = [];
         }
         if( this.specField_Refs === undefined ){
            this.specField_Refs = [];
         }


         let uniqueNumber = new Date().getTime();     // Unless you can travel back in time!

         let newBlock = (

            <div  key={ uniqueNumber } >
               <br />

               <annotation>   What language is it? 	</annotation>
               <Language_Select__C  classNameOfSelect="chosen-select-create-option"   isSingle={true}
                  ref={(this_elem) => { this.langName_Refs.push(this_elem); } } />

               <annotation>  Highest level of education completed in this language  </annotation>
               <div className="educLevel_Slider"  ref={(this_elem) => { this.educLevel_Refs.push(this_elem); } }  ></div>
               <br /><br /><br /><br /><br /><br />

               <annotation> 	If you went to university in this language, what field did you specialize in?   </annotation>
               <input className="form-control"  ref={(this_elem) => { this.specField_Refs.push(this_elem); } }  />


               <br />
               <hr className="_Theme_hr_Default_"/>

            </div>

         );


         this.setState({
            anotherLangSection : this.state.anotherLangSection.concat([newBlock])
         })

      }
   }


   componentDidUpdate(){
      this.updateSelectCreateOption();
      this.updateSliders();
   }

   /* HELPER of componentDidUpdate() */
   updateSelectCreateOption(){

      let len = this.langName_Refs.length;

      if( len > 0 ){

         // only need to apply settings to the most recent one!
         $( "#" + this.langName_Refs[len - 1].getSelectElementId() ).chosen({
            width: '50%',
            allow_single_deselect: true,

            no_results_text: Ui_Util.no_result_text_create_option ,
            create_option: true
         });

      }
   }

   /* HELPER of componentDidUpdate() */
   updateSliders(){

      let len = this.educLevel_Refs.length;

      if( len > 0 ){

         $( this.educLevel_Refs[len - 1] ).labeledslider({
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
            <br />

            <annotation>  Did you every go to school where school subjects were taught in a language other than your first language?   	</annotation>
            <annotation>  If yes, please click the "<b>Add new language</b>" button below. </annotation>

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


}

export default LearnProf_page3;
