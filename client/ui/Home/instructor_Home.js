import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bootstrap_InputGlyphicon from '/imports/ui/bootstrap_InputGlyphicon';


class Instructor_Home extends Component {

   constructor(){
      super();

      this.state = {
         courses:    "Nothing yet!",
         students:   "No one yet!"
      };
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


export default Instructor_Home;
