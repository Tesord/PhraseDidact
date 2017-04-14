import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';

import Courses_Configs from '/imports/collections/courses_Configs';



class Learner_Home extends Component {

   constructor(){
      super();

      this.state = {
         courses:    [],
         progress:   "Nothing yet!"
      };
   }


   load(){
      let courseList = Courses_Configs.find().fetch();

      Meteor.call("userAccount.getCourseCreatorsDetails", courseList, (err, result) => {

         this.setState( {
            courses: this.create_CourseBlocks(courseList, result)
         } );

      });

   }


   startCourse(courseName){
      this.context.router.history.push("/course/" + courseName);
   }

   create_CourseBlocks(courseList, creatorDetailList){

      let resultList = [];

      let username = "";
      let uniqueId = "";

      for(let i = 0; i < courseList.length ; i++){

         /* Get username of the creator of the current course by cycling through the list of
          * creators (for the rendering courses only), and the retrieving the username when a match is found. */
         for(detail  of  creatorDetailList){
            if(detail.userId === courseList[i].userId){
               username = detail.username;
            }
         }

         uniqueId = shortid.generate();

         // TODO Keyboard accessibility = put into a component?
         resultList.push(
            <div key={"clb" + uniqueId}  className="course-block  pointer-hover   _Theme_innerItem_Default_"
                  tabIndex="0"
                  onClick={ this.startCourse.bind( this, courseList[i].courseName ) }>
               <h4 className="align-right"> By <b>{ username }</b> </h4>

               <h4>{ courseList[i].courseName }</h4>
               <div className="single-line-element align-right"> Access: { courseList[i].access } </div>
               <br/>

               <div className="_Theme_exampleText_Default_">{ courseList[i].description }</div>
            </div>
         );
      }

      return resultList;
   }





   componentWillMount(){
      // Get required data from DB, while also checks whether user actually owns the course
      Meteor.subscribe("available_Courses", {
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
         <div id="learner-dashboard-section">
            <div id="learner-courses" className="_Theme_outerBorder_Default_">
               <contentTitle>	Courses	</contentTitle>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {this.state.courses}

               </div>
            </div>

            <div id="learner-progress" className="_Theme_outerBorder_Default_">
               <contentTitle>	Progress	</contentTitle>

               <div className="_Theme_innerBorder_Default_">
                  <Bootstrap_InputGlyphicon  glyphiconClassName="glyphicon-search"
                        typingFuncContext={this} />
                  <hr className="_Theme_hr_Default_"/>

                  {this.state.progress}

               </div>
            </div>
         </div>
      );
   }

}

// ask for `router` from context, helper for router-router Programatic Navigation
Learner_Home.contextTypes = {
	router: React.PropTypes.object
};


export default Learner_Home;
