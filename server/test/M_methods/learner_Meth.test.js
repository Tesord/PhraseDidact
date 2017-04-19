import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import userAccount_Meth from '../../M_methods/learner_Meth';


describe("learner_Meth.js - learner.doCourse Meteor method", function() {

   beforeEach(function(){
      ServerCommon.genericCourse_Setup();

      ServerCommon.genericWordPair_Setup();
      ServerCommon.secondWordPair_Setup();
   });

   it("A learner starting a brand new course [success]", function () {
      ServerCommon.sim_LogInDifferentUser(false);

      Meteor.call('learner.doCourse', test_courseName );

      let resultArray = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, DIFF_userId);
      let finalResult = ServerCommon.wordsAttempts_ArrayChecker(resultArray, 2);

      expect(finalResult).to.be.true;
   });

   it("An instructor starting a brand new course [reject]", function () {
      ServerCommon.sim_LogInDifferentUser(true);

      Meteor.call('learner.doCourse', test_courseName );

      let resultArray = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, DIFF_userId);
      let finalResult = ServerCommon.wordsAttempts_ArrayChecker(resultArray, 2);

      expect(finalResult).to.be.false;
   });

   it("A unlogged user starting a brand new course [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('learner.doCourse', test_courseName );

      let resultArray = ServerCommon.wordsAttempts_ContentRetriever(TEST_courseId, DIFF_userId);
      let finalResult = ServerCommon.wordsAttempts_ArrayChecker(resultArray, 2);

      expect(finalResult).to.be.false;
   });

});
