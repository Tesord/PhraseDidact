import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import BlueCircle_greyBG from '../Loading/blueCircle_greyBG';

<<<<<<< HEAD
=======
import EditWord_Form from './editWord/editWord_Form';

>>>>>>> 704e5621f80a78bbc1d0b970a4271c52bc8913e0
import Func_Util from '/imports/api/functional/func_Util';

import Courses_Words from '/imports/collections/courses_Words';



class EditWord extends Component {


   constructor(){
		super();

		this.state = {
			content: <BlueCircle_greyBG />,
		};
	}

   getReadyAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary">Save</button>

      );
   }

   getLoadingAnim(){
      return (

         <button className="pd-btn  rounded-border	   btn-primary    disabled" disabled aria-disabled="true">Saving...</button>

      );
   }

   backToCourse(){
      var r = confirm("Discard this edit?");
<<<<<<< HEAD
      if (r == true) {
=======
      if (r === true) {
>>>>>>> 704e5621f80a78bbc1d0b970a4271c52bc8913e0
         this.context.router.history.push( "/course/" + this.props.match.params.courseName  + "/edit" );
      }
   }

<<<<<<< HEAD

   save(e){
      e.preventDefault();

      let l2_wordName = this.l2_wordName_Ref.value;
      let l2_examples = this.l2_examples_Ref.value;

      let l1_wordName = this.l1_wordName_Ref.value;
      let l1_examples = this.l1_examples_Ref.value;

      let difficultyLevel = this.difficultyLevel_Ref.value;


      Meteor.call('instructor.addWord', this.props.match.params.courseName, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel, (err, result) => {
=======
   // TODO
   save(e){
      e.preventDefault();

      let l2_wordName = this.mainContent.l2_wordName_Ref.value;
      let l2_examples = this.mainContent.l2_examples_Ref.value;

      let l1_wordName = this.mainContent.l1_wordName_Ref.value;
      let l1_examples = this.mainContent.l1_examples_Ref.value;

      let difficultyLevel = this.mainContent.difficultyLevel_Ref.value;


      Meteor.call('instructor.editWord', this.props.match.params.wordPairId, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel, (err, result) => {
>>>>>>> 704e5621f80a78bbc1d0b970a4271c52bc8913e0

         if(err){
            this.handleErrors(err);
         }
         else{		// successful
            this.context.router.history.push( "/course/" + this.props.match.params.courseName  + "/edit" );
         }
      });


      this.setState( {     content:    this.getMainContent( this.getLoadingAnim() )    });

   }

   handleErrors(err){
      window.alert(err);

      this.setState( {     content:    this.getMainContent( this.getReadyAnim() )    });
   }


   /* TODO display content & search content */
<<<<<<< HEAD
   getMainContent( button, word_Pair ){

      return (
         <div id="add-word-section">
            <form onSubmit={	this.save.bind(this)	}>
               <contentTitle>	Edit word pair	</contentTitle>

               <hr className="_Theme_hr_Default_"/>

               <h3> Word to learn (L2) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     defaultValue={word_Pair.l2_wordName}
                     ref={	(this_elem) => (this.l2_wordName_Ref = this_elem) } />

                  <annotation>	Examples (separate each one by a new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     ref={	(this_elem) => (this.l2_examples_Ref = this_elem) } ></textarea>
               <br />

               <hr className="_Theme_hr_Default_"/>

               <h3> Native word (L1) </h3>

               <annotation>	Word	</annotation>
               <input type="text" className="form-control"   maxLength="150"     required
                     defaultValue={word_Pair.l1_wordName}
                     ref={	(this_elem) => (this.l1_wordName_Ref = this_elem) } />

                  <annotation>	Examples (separate each one by a new line)	</annotation>
               <textarea rows="6"    maxLength="1000"    required
                     ref={	(this_elem) => (this.l1_examples_Ref = this_elem) } ></textarea>

               <hr className="_Theme_hr_Default_"/>

               <annotation>  Level of difficulty   </annotation>
               <label>
                  <input type="number" className="single-date-or-month-field      form-control-spinner"
                     defaultValue={word_Pair.difficultyLevel}     min="0"  max="999"
                     ref={(this_elem) => { this.difficultyLevel_Ref = ( this_elem ); } }      />
               </label>

               <hr className="_Theme_hr_Default_"/>

               <div className="single-line-element">
                  { button }
                  <button className="pd-btn rounded-border	   align-right   btn-default"
                     onClick={ this.backToCourse.bind(this) } >
                     Back
                  </button>
               </div>
            </form>
         </div>

=======
   getMainContent( button, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel  ){

      return (
         <EditWord_Form          ref={(this_elem) => {this.mainContent = this_elem;} }
            isAdd = {false}
            funcContext = {this}
            save_Func = {this.save}
            backToCourse_Func = {this.backToCourse}
            button = { button }
            l2_wordName = { l2_wordName }
            l2_examples = { l2_examples }
            l1_wordName = { l1_wordName }
            l1_examples = { l1_examples }
            difficultyLevel = { difficultyLevel }
         />
>>>>>>> 704e5621f80a78bbc1d0b970a4271c52bc8913e0
      );

   }

   isInstructorAction(){

      // Get required data from DB, while also checks whether user actually owns the course
      Meteor.subscribe("edit_Course_Words", this.props.match.params.courseName, {
         onReady: () => {     // matched, user actually owns the course

            let word_Pair = Courses_Words.findOne({ _id : this.props.match.params.wordPairId });

            this.setState( {
<<<<<<< HEAD
               content: this.getMainContent( this.getReadyAnim(), word_Pair )
=======
               content: this.getMainContent(
                  this.getReadyAnim(),
                  word_Pair.l2_wordName,
                  Func_Util.createStringNewLineSep_FromArray( word_Pair.l2_examples ),
                  word_Pair.l1_wordName,
                  Func_Util.createStringNewLineSep_FromArray( word_Pair.l1_examples ),
                  word_Pair.difficultyLevel
               )
>>>>>>> 704e5621f80a78bbc1d0b970a4271c52bc8913e0
            } );

         },
         onStop: () => {      // no match, user doesn't own the course!

            /* TODO change to "Access denied" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
      } );


      // makes mandatory transition appears seamless
      this.setState( {
         content: <div></div>
      } );

   }

   isOtherAction(){

      /* TODO change to "You are not Learner" or something page */


      /* Redirect without being recorded in Browser Back button history. However, doing so seems to
       * cancel any earlier localStorage setItem() calls... So this function will be delayed a bit. */
      setTimeout( () => { window.location.replace("/notFound"); }, 500);
   }

   componentDidMount() {

      Func_Util.excluPageCheck_OnLoad(this, false, this.isInstructorAction, this.isOtherAction);

   }


   render(){
      return(
         <DocumentTitle title={"Edit word pair: " + this.props.match.params.wordPairId + " - PhraseDidact"}  >
            {this.state.content}
         </DocumentTitle>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
EditWord.contextTypes = {
	router: React.PropTypes.object
};

export default EditWord;
