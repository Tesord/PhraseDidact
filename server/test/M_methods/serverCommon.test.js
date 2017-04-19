import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base';
import faker from 'faker';

import Courses_Words from '/imports/collections/courses_Words';
import Courses_Configs from '/imports/collections/courses_Configs';


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
   DIFF_username = "DifferentUser123";
   DIFF_email = "DifferentUser123@ymail.com";
   DIFF_password = "4321";
   DIFF_userId = Accounts.createUser({username: DIFF_username, email: DIFF_email, password: DIFF_password});

   sandbox.stub(Meteor, 'userId').returns( DIFF_userId );
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

export function diffCourse_Setup(){
   sim_LogInDifferentUser(true);

   DIFF_courseName = "Generic Course 2";
   DIFF_access = "private";
   DIFF_description = faker.lorem.sentences();
   DIFF_tags = faker.lorem.words();
   Meteor.call('instructor.addCourse', DIFF_courseName, DIFF_access, DIFF_description, DIFF_tags );

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


export function course_ComparisonChecker(courseName, access, description, tags){
   let tagArray = tags.replace( /\n/g, " " ).split( " " );

   return Courses_Configs.findOne( {
                              userId: DEFAULT_userId,
                              courseName,
                              access,
                              description,
                              tags: tagArray
                            } );
}

export function word_ComparisonChecker(courseName, l2_wordName, l2_examples, l1_wordName, l1_examples, difficultyLevel){
   let l2_example_Array = l2_examples.split( "\n" );
   let l1_example_Array = l1_examples.split( "\n" );

   return Courses_Words.findOne( {
                              userId: DEFAULT_userId,
                              l2_wordName,
                              l2_examples : l2_example_Array,
                              l1_wordName,
                              l1_examples : l1_example_Array,
                              difficultyLevel
                            } );
}
