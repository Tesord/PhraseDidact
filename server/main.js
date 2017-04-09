import { Meteor } from 'meteor/meteor';
import LearnerProfile from '/imports/collections/learnerProfile';

// import AccountConfigs from '/imports/collections/userAccount/accountConfigs';



Meteor.startup(() => {
   // code to run on server at startup

   Meteor.publish('learnerProfile', function() {
      return LearnerProfile.find({ userId: this.userId });
   });

});
