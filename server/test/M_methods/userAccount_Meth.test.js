import { Random } from 'meteor/random';
import chai, {expect} from 'chai';

import ServerCommon from './serverCommon.test';

import userAccount_Meth from '../../M_methods/userAccount_Meth';


describe("userAccount_Meth.js - userAccount.setAccountType() Meteor method", function() {

   it("Setting a brand new account to LEARN type [success]", function () {
      ServerCommon.sim_LogInDefaultUser(false);

      let result = Roles.userIsInRole( DEFAULT_userId, "LEARN" );

      // testing the result
      expect(result).to.be.true;
   });

   it("Setting a brand new account to INSTR type [success]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Roles.userIsInRole( DEFAULT_userId, "INSTR" );

      expect(result).to.be.true;
   });

   it("Setting an account to LEARN when account type is already set to INSTR [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(true);
      Meteor.call('userAccount.setAccountType', false);

      let result = Roles.userIsInRole( DEFAULT_userId, "INSTR" );

      expect(result).to.be.true;
   });

   it("Setting an account to INSTR when account type is already set to LEARN [reject]", function () {
      ServerCommon.sim_LogInDefaultUser(false);
      Meteor.call('userAccount.setAccountType', true);

      let result = Roles.userIsInRole( DEFAULT_userId, "LEARN" );

      expect(result).to.be.true;
   });

   it("Unlogged user trying to set account type [reject]", function () {
      ServerCommon.sim_UserIsUnlogged();
      Meteor.call('userAccount.setAccountType', false);

      // checking DB is not modified
      let allDBDocs = Meteor.users.find().fetch();
      expect( allDBDocs ).to.have.lengthOf(1);
      expect( Roles.getRolesForUser(DEFAULT_userId) ).to.be.empty;
   });

});


describe("userAccount_Meth.js - userAccount.checkIsInstructor() Meteor method", function() {

   it("Checking if INSTR account returns TRUE", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('userAccount.checkIsInstructor');

      expect(result).to.be.true;
   });

   it("Checking if LEARN account returns FALSE", function () {
      ServerCommon.sim_LogInDefaultUser(false);

      let result = Meteor.call('userAccount.checkIsInstructor');

      expect(result).to.be.false;
   });

   it("Checking if unlogged user returns FALSE", function () {
      ServerCommon.sim_UserIsUnlogged();

      let result = Meteor.call('userAccount.checkIsInstructor');

      expect(result).to.be.false;
   });

});


describe("userAccount_Meth.js - userAccount.checkIsLearner() Meteor method", function() {

   it("Checking if LEARN account returns TRUE", function () {
      ServerCommon.sim_LogInDefaultUser(false);

      let result = Meteor.call('userAccount.checkIsLearner');

      expect(result).to.be.true;
   });

   it("Checking if INSTR account returns FALSE", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('userAccount.checkIsLearner');

      expect(result).to.be.false;
   });

   it("Checking if unlogged user returns FALSE", function () {
      ServerCommon.sim_UserIsUnlogged();

      let result = Meteor.call('userAccount.checkIsLearner');

      expect(result).to.be.false;
   });

});


describe("userAccount_Meth.js - userAccount.getUserDetails() Meteor method", function() {

   // TODO this method might be replaced by a publish function instead
   it("Checking if returned details from an existing user matches what is expected", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('userAccount.getUserDetails', DEFAULT_userId);


      expect( result.userId ).to.equal( DEFAULT_userId );

      let expectedJoinDate = Meteor.users.findOne( {_id : DEFAULT_userId} ).createdAt;
      expect( result.joinDate.toString() ).to.equal( expectedJoinDate.toString() );

      expect( result.username ).to.equal( DEFAULT_username );
      expect( result.role ).to.equal( "INSTR" );
   });

   it("Checking if returned details from an non-existing user matches what is expected [null]", function () {
      ServerCommon.sim_LogInDefaultUser(true);

      let result = Meteor.call('userAccount.getUserDetails', Random.id() );

      expect( result ).to.be.null;
   });

});


describe("userAccount_Meth.js - userAccount.getCourseCreatorsDetails() Meteor method", function() {

   // TODO

   // it("Checking if returned details from an existing user matches what is expected", function () {
   //    ServerCommon.sim_LogInDefaultUser(true);
   //
   //    let result = Meteor.call('userAccount.getCourseCreatorsDetails', DEFAULT_userId);
   //
   //    expect( result.userId ).to.equal( DEFAULT_userId );
   //
   //    let expectedJoinDate = Meteor.users.findOne( {_id : DEFAULT_userId} ).createdAt;
   //    expect( result.joinDate.toString() ).to.equal( expectedJoinDate.toString() );
   //
   //    expect( result.username ).to.equal( username );
   //    expect( result.role ).to.equal( "INSTR" );
   // });

   // it("Checking if returned details from an non-existing user matches what is expected (null)", function () {
   //    let result = Meteor.call('userAccount.getUserDetails', Random.id() );
   //
   //    expect( result ).to.be.null;
   // });

});
