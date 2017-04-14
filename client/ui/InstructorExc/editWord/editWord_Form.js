import React, {Component} from 'react';


class EditWord_Form extends Component{

   /* TODO search content */
   render(){
      let title = "";

      if(this.props.isAdd){
         title = "Add word pair";
      }
      else{
         title = "Edit word pair";
      }

      let difficulty = 0;

      if(this.props.difficultyLevel){
         difficulty = this.props.difficultyLevel;
      }


      return (
         <div id="add-word-section">
            <form onSubmit={	this.props.save_Func.bind( this.props.funcContext )	}>
               <contentTitle>	{title}	</contentTitle>

               <hr className="_Theme_hr_Default_"/>

               <h3> Word to learn (L2) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     defaultValue={ this.props.l2_wordName }
                     ref={	(this_elem) => (this.l2_wordName_Ref = this_elem) } />

               <annotation>	Examples (separate each one by new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     defaultValue={ this.props.l2_examples }
                     ref={	(this_elem) => (this.l2_examples_Ref = this_elem) } ></textarea>
               <br />

               <hr className="_Theme_hr_Default_"/>

               <h3> Native word (L1) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     defaultValue={ this.props.l1_wordName }
                     ref={	(this_elem) => (this.l1_wordName_Ref = this_elem) } />

               <annotation>	Examples (separate each one by new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     defaultValue={ this.props.l1_examples }
                     ref={	(this_elem) => (this.l1_examples_Ref = this_elem) } ></textarea>

               <hr className="_Theme_hr_Default_"/>

               <annotation>  Level of difficulty   </annotation>
               <label>
                  <input type="number" className="single-date-or-month-field      form-control-spinner"
                     defaultValue={ difficulty }     min="0"  max="999"
                     ref={(this_elem) => { this.difficultyLevel_Ref = ( this_elem ); } }      />
               </label>

               <hr className="_Theme_hr_Default_"/>

               <div className="single-line-element">
                  { this.props.button }
                  <button className="pd-btn rounded-border	   align-right   btn-default"
                     onClick={ this.props.backToCourse_Func.bind( this.props.funcContext ) } >
                     Back
                  </button>
               </div>
            </form>
         </div>

      );

   }
};


export default EditWord_Form;
