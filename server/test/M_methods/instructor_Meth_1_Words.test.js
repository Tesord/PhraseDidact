import faker from 'faker';
import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import Instructor_Meth from '../../M_methods/instructor_Meth';

import Courses_Words from '/imports/collections/courses_Words';



describe("instructor_Meth.js - instructor.addWord() Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();
   });

   it("An instructor adding simple word pairs to an existing course on DB [success]", function () {
      // setting up test data
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      // calling the method to test...
      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      // retrieving the result...
      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);

      // testing the result
      expect(result).to.exist;


      test_l2_wordName = faker.lorem.word();
      test_l2_examples = faker.lorem.sentences();
      test_l1_wordName = faker.lorem.word();
      test_l1_examples = faker.lorem.sentences();
      test_difficulyLevel = 1;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );
      result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An instructor adding simple word pairs to a non-existing course on DB [reject]", function () {
      // setting up test data
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      // calling the method to test...
      Meteor.call('instructor.addWord', "coursedoesnotexist", test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      // retrieving the result...
      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("A learner adding a simple word pair to DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(false);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("A unlogged user adding a simple word pair to DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a word pair with too big (exceptional - 151, 152) L2 Word Name to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = 'a'.repeat(151);
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      // operations should fail
      let funcCall = function() { Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel ); };
      expect( funcCall ).to.throw( Error );

      test_l2_wordName = 'a'.repeat(152);

      funcCall = function() { Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel ); };
      expect( funcCall ).to.throw( Error );

      // check that DB has not been modified
      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a word pair with an on-limit (extreme - 150) L2 Word Name to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = 'a'.repeat(150);
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An instructor adding a word pair with too big (exceptional - 1001, 1002) L2 Examples section to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = 'a'.repeat(1001);
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      test_l2_examples = 'a'.repeat(1002);

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a word pair with an on-limit (extreme - 1000) L2 Examples section to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = 'a'.repeat(1000);
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An instructor adding a word pair with too big (exceptional - 151, 152) L1 Word Name to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = 'a'.repeat(151);
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      let funcCall = function() { Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel ); };
      expect( funcCall ).to.throw( Error );

      test_l1_wordName = 'a'.repeat(152);

      funcCall = function() { Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel ); };
      expect( funcCall ).to.throw( Error );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a word pair with an on-limit (extreme - 150) L1 Word Name to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = 'a'.repeat(150);
      let test_l1_examples = faker.lorem.sentences();
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An instructor adding a word pair with too big (exceptional - 1001, 1002) L1 Examples section to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = 'a'.repeat(1001);
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      test_l1_examples = 'a'.repeat(1002);

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a word pair with an on-limit (extreme - 1000) L1 Examples section to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let test_l2_wordName = faker.lorem.word();
      let test_l2_examples = faker.lorem.sentences();
      let test_l1_wordName = faker.lorem.word();
      let test_l1_examples = 'a'.repeat(1000);
      let test_difficulyLevel = 0;

      Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

});



describe("instructor_Meth.js - instructor.removeWord() Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();
      ServerCommon.genericWordPair_Setup();
   });

   it("An instructor removing a simple word pair that he/she owns from DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.removeWord', test_word_pair_id );

      let result = Courses_Words.findOne( {} );
      expect(result).to.not.exist;
   });

   it("Another instructor removing a simple word pair that he/she does NOT own from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(true);

      Meteor.call('instructor.removeWord', test_word_pair_id );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("A learner removing a word pair from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      Meteor.call('instructor.removeWord', test_word_pair_id );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An unlogged user removing a word pair from DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('instructor.removeWord', test_word_pair_id );

      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

   it("An instructor removing a word pair that does NOT exist [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.removeWord', "wpdoesnotexist" );

      // checking DB is not modified
      let allDBDocs = Courses_Words.find().fetch();
      expect( allDBDocs ).to.have.lengthOf(1);
      let result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      expect(result).to.exist;
   });

});



describe("instructor_Meth.js - instructor.editWord() Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();
      ServerCommon.genericWordPair_Setup();

      EDIT_l2_wordName = faker.lorem.word();
      EDIT_l2_examples = faker.lorem.sentences();
      EDIT_l1_wordName = faker.lorem.word();
      EDIT_l1_examples = faker.lorem.sentences();
      EDIT_difficulyLevel = 1;
   });

   it("An instructor editing an existing word pair [success]", function () {
      // setting up test data
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.not.exist;
      expect(new_result).to.exist;
   });

   it("An instructor editing a non-existing word pair [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('instructor.editWord', "wpidoesnotexist", EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.exist;
      expect(new_result).to.not.exist;
   });

   it("A learner editing a simple word pair on DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.exist;
      expect(new_result).to.not.exist;
   });

   it("A unlogged user editing a simple word pair on DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.exist;
      expect(new_result).to.not.exist;
   });

   it("An instructor editing a word pair with too big (exceptional - 1001, 1002) L2 Examples section on DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let EDIT_l2_examples = 'a'.repeat(1001);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      EDIT_l2_examples = 'a'.repeat(1002);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.exist;
      expect(new_result).to.not.exist;
   });

   it("An instructor editing a word pair with an on-limit (extreme - 1000) L2 Examples section on DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let EDIT_l2_examples = 'a'.repeat(1000);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.not.exist;
      expect(new_result).to.exist;
   });

   it("An instructor editing a word pair with too big (exceptional - 1001, 1002) L1 Examples section on DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let EDIT_l1_examples = 'a'.repeat(1001);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      EDIT_l1_examples = 'a'.repeat(1002);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.exist;
      expect(new_result).to.not.exist;
   });

   it("An instructor editing a word pair with an on-limit (extreme - 1000) L1 Examples section on DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      let EDIT_l1_examples = 'a'.repeat(1000);

      Meteor.call('instructor.editWord', test_word_pair_id, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel );

      let old_result = ServerCommon.word_ComparisonChecker(test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel);
      let new_result = ServerCommon.word_ComparisonChecker(test_courseName, EDIT_l2_wordName, EDIT_l2_examples, EDIT_l1_wordName, EDIT_l1_examples, EDIT_difficulyLevel);

      expect(old_result).to.not.exist;
      expect(new_result).to.exist;
   });

});
