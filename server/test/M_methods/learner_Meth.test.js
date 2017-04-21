import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import userAccount_Meth from '../../M_methods/learner_Meth';

// TODO save profile method


// TODO, add test for newly added wordId, learnScore (result) too
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
