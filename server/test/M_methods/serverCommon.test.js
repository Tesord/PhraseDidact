import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base';


beforeEach(function() {
   // setting up test condition
   resetDatabase();

   username = "GenericUser123";
   email = "GenericUser123@gmail.com";
   password = "1234";
   userId = Accounts.createUser({username, email, password});

   sandbox = sinon.sandbox.create();
});

afterEach(function () {
   sandbox.restore();
});


export function sim_LogInDefaultUser(){
   /* Prevents    "Error: Missing 'users' param"   (no user is logged in)    for the Meteor methods
    * by overriding any call to Meteor.userId() with a function that returns new account's assigned 'userId' */
   sandbox.stub(Meteor, 'userId').returns(userId);
}

export function sim_LogInDifferentUser(){
   sandbox.stub(Meteor, 'userId').returns(Random.id());
}

export function sim_UserIsUnlogged(){
   sandbox.stub(Meteor, 'userId').returns(null);
}
