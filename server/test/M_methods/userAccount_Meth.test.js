import { Accounts } from 'meteor/accounts-base';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import chai, {expect} from 'chai';
import sinon from 'sinon';

import userAccount_Meth from '../../M_methods/userAccount_Meth';


describe("Server's userAccount_Meth.js - userAccount.setAccountType() Meteor method", function() {

   beforeEach(function() {
      resetDatabase();
      sandbox = sinon.sandbox.create();
   });

   it("Setting a brand new account to LEARN type", function () {
      // setting up test condition
      let userId = Accounts.createUser({username: "GenericUser123", email: "GenericUser123@gmail.com", password: "1234"});

         /* Prevents    "Error: Meteor.userId can only be invoked in method calls."    for the Meteor methods
          * by overwriting any call to Meteor.userId() with a function that returns new account's assigned 'userId' */
      sandbox.stub(Meteor, 'userId').returns(userId);

      // calling the method to test...
      Meteor.call('userAccount.setAccountType', false);

      let result = Roles.userIsInRole( userId, "LEARN" );

      // testing the result
      expect(result).to.be.true;

   });


});
