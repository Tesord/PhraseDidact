import Courses_Words from '/imports/collections/courses_Words';


Meteor.methods({

   'instructor.removeWord': (word_pair_id) => {
      Courses_Words.remove( { "_id" : word_pair_id } );
   }

});
