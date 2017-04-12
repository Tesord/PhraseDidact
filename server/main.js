import { Meteor } from 'meteor/meteor';

import Learner_LProfile from '/imports/collections/learner_LProfile';
import Instructor_Courses from '/imports/collections/instructor_Courses';

// import AccountConfigs from '/imports/collections/userAccount/accountConfigs';



Meteor.startup(() => {
   // code to run on server at startup

   Meteor.publish('learner_LProfile', function() {
      return Learner_LProfile.find({ userId: this.userId });
   });

   Meteor.publish('instructor_Courses', function() {
      return Instructor_Courses.find({ userId: this.userId });
   });

});
