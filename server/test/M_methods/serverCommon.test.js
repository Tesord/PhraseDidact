import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base';
import faker from 'faker';

import Courses_Words from '/imports/collections/courses_Words';


beforeEach(function() {
   // setting up default test condition
   resetDatabase();

   DEFAULT_username = "DefaultUser123";
   DEFAULT_email = "DefaultUser123@gmail.com";
   DEFAULT_password = "1234";
   DEFAULT_userId = Accounts.createUser({username: DEFAULT_username, email: DEFAULT_email, password: DEFAULT_password});

   sandbox = sinon.sandbox.create();
});

afterEach(function () {
   sandbox.restore();
});


export function sim_LogInDefaultUser(isInstructor){
   /* Prevents    "Error: Missing 'users' param"   (no user is logged in)    for the Meteor methods
    * by overriding any call to Meteor.userId() with a function that returns new account's assigned 'userId' */
   sandbox.stub(Meteor, 'userId').returns( DEFAULT_userId );
   Meteor.call('userAccount.setAccountType', isInstructor);
}

export function sim_LogInDifferentUser(isInstructor){
   // To speed up testing, the different user account is only created if this method is called
   let username_2 = "DifferentUser123";
   let email_2 = "DifferentUser123@ymail.com";
   let password_2 = "4321";
   let userId_2 = Accounts.createUser({username: username_2, email: email_2, password: password_2});

   sandbox.stub(Meteor, 'userId').returns( userId_2 );
   Meteor.call('userAccount.setAccountType', isInstructor);
}

export function sim_UserIsUnlogged(){
   sandbox.stub(Meteor, 'userId').returns(null);
}


export function genericCourse_Setup(){
   sim_LogInDefaultUser(true);

   test_courseName = "Generic Course 1";
   test_access = "public";
   test_description = faker.lorem.sentences();
   test_tags = faker.lorem.words();
   Meteor.call('instructor.addCourse', test_courseName, test_access, test_description, test_tags );

   sandbox.restore();
}

export function genericWordPair_Setup(){
   sim_LogInDefaultUser(true);

   test_l2_wordName = faker.lorem.word();
   test_l2_examples = faker.lorem.sentences();
   test_l1_wordName = faker.lorem.word();
   test_l1_examples = faker.lorem.sentences();
   test_difficulyLevel = 0;

   // calling the method to test...
   Meteor.call('instructor.addWord', test_courseName, test_l2_wordName, test_l2_examples, test_l1_wordName, test_l1_examples, test_difficulyLevel );

   test_word_pair_id = Courses_Words.findOne({l2_wordName : test_l2_wordName})._id;

   sandbox.restore();
}
