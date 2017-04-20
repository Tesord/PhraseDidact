import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import userAccount_Meth from '../../M_methods/learner_Meth';


describe("learner_Meth.js - learner.addWordAttempt Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();

      ServerCommon.genericWordPair_Setup();
      ServerCommon.secondWordPair_Setup();
   });

   it("Initialising a learner's word_Attempt on a never-visitied-before course [SUCCESS]", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      Meteor.call('learner.addWordAttempt', TEST_wordId );
      let result = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, TEST_wordId, DIFF_userId);
      expect(result).to.exist;

      Meteor.call('learner.addWordAttempt', SECOND_wordId );
      result = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, SECOND_wordId, DIFF_userId);
      expect(result).to.exist;
   });

   it("Initialising an instructor's word_Attempt [REJECT]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      Meteor.call('learner.addWordAttempt', TEST_wordId );

      let result = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, TEST_wordId, DIFF_userId);
      expect(result).to.not.exist;
   });

   it("Initialising an unlogged user's word_Attempt [REJECT]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('learner.addWordAttempt', TEST_wordId );

      let result = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, TEST_wordId, DIFF_userId);
      expect(result).to.not.exist;
   });

});


describe("learner_Meth.js - learner.getNextQuestion Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();

      ServerCommon.genericWordPair_Setup();
      ServerCommon.secondWordPair_Setup();
      ServerCommon.thirdWordPair_Setup();
   });

   it("Checking when a learner is starting the FIRST question from an existing course, the returned result matches what is expected", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      let result = Meteor.call('learner.getNextQuestion', test_courseName );

      expect( result.l2_wordName ).to.equal( SECOND_l2_wordName );
      let l2_example_Array = SECOND_l2_examples.split( "\n" );
      expect( result.l2_examples ).to.eql( l2_example_Array );

   });

   it("Checking when an instructor is starting a question, the returned result matches what is expected [undefined]", function () {
      ServerCommon.sim_LogInDifferentUser(true);

      let result = Meteor.call('learner.getNextQuestion', test_courseName );

      expect( result ).to.not.exist;
   });

   it("Checking when an unlogged user is starting a question, the returned result matches what is expected [undefined]", function () {
      ServerCommon.sim_UserIsUnlogged();

      let result = Meteor.call('learner.getNextQuestion', test_courseName );

      expect( result ).to.not.exist;
   });

});
