import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';
import Picture_Button from '/imports/ui/picture_Button';

import Courses_Configs from '/imports/collections/courses_Configs';


class Instructor_Home extends Component {

   constructor(){
      super();

      this.state = {
         courses:    "Nothing yet!",
         students:   "No one yet!"
      };
   }


   load(){
      let courseList = Courses_Configs.find( {userId : Meteor.userId()} ).fetch();

      this.setState( {
         courses: this.create_CourseBlocks(courseList)
      } );
   }


   editBlock(courseName){
      this.context.router.history.push("/course/" + courseName + "/edit");
   }

   removeBlock(courseName){
      var r = confirm("Remove this course? This CANNOT be undone!");

      if (r == true) {
         try {
            Meteor.call('instructor.removeCourse', courseName);
         } catch (err) {
            this.handleErrors(err);
         }

         this.load();
      }
   }


   create_CourseBlocks(courseList){

      let resultList = [];

      let uniqueId = "";

      for(let course   of    courseList){

         uniqueId = shortid.generate();

         resultList.push(
            <div key={"clb" + uniqueId}  className="course-block    _Theme_innerItem_Default_">
               <Picture_Button
                  imgURL="/ui/img/close_cross_in_circular_outlined_interface.svg"
                  className="align-right pointer-hover"      width="30rem" height="30rem"
                  actFunction={ this.removeBlock }
                  actFuncParams={ course.courseName }
                  functionContext={ this }
               />
               <Picture_Button
                  imgURL="/ui/img/Edit_Notepad_Icon.svg"
                  className="align-right pointer-hover  moderate-right-margin"      width="27rem" height="27rem"
                  actFunction={ this.editBlock }
                  actFuncParams={ course.courseName }
                  functionContext={ this }
               />

               <h4>{ course.courseName }</h4>
               <div className="single-line-element align-right"> Access: { course.access } </div>
               <br/>

               <div className="_Theme_exampleText_Default_">{ course.description }</div>
            </div>
         );
      }

      return resultList;
   }


   componentWillMount(){
      // Get required data from DB, while also checks whether user actually owns the course
      Meteor.subscribe("created_Courses", {
         onReady: () => {     // matched, user actually owns the course
            this.load();
         },
         onStop: () => {      // no match, user doesn't own the course!

            /* TODO change to "Something went wrong?" or something page */

            setTimeout( () => { window.location.replace("/notFound"); }, 500);
         }
      } );


   }


   /* TODO display content & search content */
   render(){
      return(
         <div id="instructor-dashboard-section">
            <div id="instructor-courses" className="_Theme_outerBorder_Default_">
               <contentTitle>	Courses	</contentTitle>

               <Link to="/addCourse" className="pd-btn  rounded-border	   btn-primary">Add course</Link>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {this.state.courses}

               </div>
            </div>

            <div id="instructor-students" className="_Theme_outerBorder_Default_">
               <contentTitle>	Students	</contentTitle>

               <button className="pd-btn  rounded-border	   btn-primary">Add student</button>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {this.state.students}

               </div>
            </div>
         </div>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
Instructor_Home.contextTypes = {
	router: React.PropTypes.object
};


export default Instructor_Home;
