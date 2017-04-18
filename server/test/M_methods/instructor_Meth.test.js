import faker from 'faker';
import chai, {expect} from 'chai';
import sinon from 'sinon';

import ServerCommon from './serverCommon.test';

import Instructor_Meth from '../../M_methods/instructor_Meth';

import Courses_Configs from '/imports/collections/courses_Configs';


function course_ComparisonChecker(courseName, access, description, tags){
   let tagArray = tags.replace( /\n/g, " " ).split( " " );

   return Courses_Configs.findOne( { userId,
                              courseName: courseName,
                              access: access,
                              description: description,
                              tags: tagArray
                            } );
}


describe("instructor_Meth.js - instructor.addCourse() Meteor method", function() {

   it("An instructor adding a simple course to DB [success]", function () {
      // setting up test data
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      // calling the method to test...
      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      // retrieving the result...
      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);

      // testing the result
      expect(result).to.exist;
   });

   it("A learner adding a simple course to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', false);
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("A unlogged user adding a simple course to DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();
      let test_courseName = "Generic Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with too big (exceptional - 151, 152) Course Names to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = 'a'.repeat(151);
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      // operations should fail
      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      test_courseName = 'a'.repeat(152);

      funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      // check that DB has not been modified
      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 150) Course Name to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = 'a'.repeat(150);
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with an invalid (exceptional) Access to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Error Course 1";
      let test_access = "vip";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with too big (exceptional - 5001, 5002) Description to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Error Course 1";
      let test_access = "public";
      let test_description = 'a'.repeat(5001);
      let test_tags = faker.lorem.words();

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      test_description = 'a'.repeat(5002);

      funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Error );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 5000) Description to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Limit Course 1";
      let test_access = "public";
      let test_description = 'a'.repeat(5000);
      let test_tags = faker.lorem.words();;

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with too big (exceptional - 1001, 1002) Tag sections to DB [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Error Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = 'a'.repeat(1001);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      test_tags = 'a'.repeat(1002);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("An instructor adding a course with an on-limit (extreme - 1000) Tag section to DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Limit Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = 'a'.repeat(1000);

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor adding a course with a Course Name that already exists [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();
      Meteor.call('userAccount.setAccountType', true);
      let test_courseName = "Dup Course 1";
      let test_access = "public";
      let test_description = faker.lorem.sentences();
      let test_tags = faker.lorem.words();

      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );
      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;

      let funcCall = function() { Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags ); };
      expect( funcCall ).to.throw( Meteor.Error );
   });

});



// TODO move this down the block (as it depends on Meteor methods below), plus check Courses_Words too

describe("instructor_Meth.js - instructor.removeCourse() Meteor method", function() {

   beforeEach(function(){
      // setting up test condition for removeCourse() tests only
      ServerCommon.sim_LogInDefaultUser();

      Meteor.call('userAccount.setAccountType', true);

      test_courseName = "Generic Course 1";
      test_access = "public";
      test_description = faker.lorem.sentences();
      test_tags = faker.lorem.words();
      Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

      sandbox.restore();
   });

   it("An instructor removing a simple course that he/she owns from DB [success]", function () {
      ServerCommon.sim_LogInDefaultUser();

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = Courses_Configs.findOne( {} );
      expect(result).to.not.exist;
   });

   it("Another instructor removing a simple course that he/she does NOT own from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser();
      Meteor.call('userAccount.setAccountType', true);

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("A learner removing a course from DB [reject]", function () {
      ServerCommon.sim_LogInDifferentUser();
      Meteor.call('userAccount.setAccountType', false);

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An unlogged user removing a course from DB [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();

      Meteor.call('instructor.removeCourse', test_courseName );

      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

   it("An instructor removing a course that does NOT exist [reject]", function () {
      ServerCommon.sim_LogInDefaultUser();

      Meteor.call('instructor.removeCourse', "thiscoursedoesnotexist" );

      // checking DB is not modified
      let allDBDocs = Courses_Configs.find().fetch();
      expect( allDBDocs ).to.have.lengthOf(1);
      let result = course_ComparisonChecker(test_courseName, test_access, test_description, test_tags);
      expect(result).to.exist;
   });

});
