import AccountConfigs from '/imports/collections/userAccount/accountConfigs';


/** TODO If Meteor method on server folder, then when it is called, the server runs it instead;
 * but Client can run "expected" version through stub.
 * If on "imports" folder, then both server & client runs it (client run miniMongo version).
 * If on "client" only, then only client runs the method (no much point).
 **/

/** TODO Error handling at the client's side, when error of SimpleSchema is thrown to client,
using Meteor.call()'s callback function **/

/** TODO Make sure multiple userId is not inserted into database (unique) **/

Meteor.methods({
   'userAccount.create': (isInstructor) => {

      // Will throw exception if unsuccessful. This method blocks until complete.
      AccountConfigs.insert({
         userId: Meteor.userId(),
         isInstructor
      });


      // TODO     Success, set account defaults
      console.log("Complete success");

   }
});
