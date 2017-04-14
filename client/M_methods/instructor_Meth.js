import Courses_Configs from '/imports/collections/courses_Configs';
import Courses_Words from '/imports/collections/courses_Words';


Meteor.methods({

   'instructor.removeWord': (word_pair_id) => {
      Courses_Words.remove( { "_id" : word_pair_id } );
   },

   'instructor.removeCourse': (courseName) => {
      let courseId = Courses_Configs.findOne( {courseName} )._id;

      Courses_Words.remove( {courseId} );
      Courses_Configs.remove( { courseName } );
   }

});
