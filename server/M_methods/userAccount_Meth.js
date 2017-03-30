
/** TODO If Meteor method on server folder, then when it is called, the server runs it instead;
 * but Client can run "expected" version through stub.
 * If on "imports" folder, then both server & client runs it (client run miniMongo version).
 * If on "client" only, then only client runs the method (no much point).
 **/

/** TODO Error handling at the client's side, when error of SimpleSchema is thrown to client,
using Meteor.call()'s callback function **/

/** TODO Make sure multiple userId is not inserted into database (unique) **/

Meteor.methods({


   'userAccount.addRole': (isInstructor) => {

      // Will throw exception if unsuccessful. This method blocks until complete.
      if(isInstructor){
         Roles.addUsersToRoles(Meteor.userId(), "INSTR" );
      }
      else{
         Roles.addUsersToRoles(Meteor.userId(), "LEARN" );
      }

   },

   // Roles.userIsInRole() does not work correctly in client [ specifically componentDidMount() ]
   'userAccount.checkIsInstructor' : () => {
      return Roles.userIsInRole( Meteor.userId(), "INSTR" );
   },
   'userAccount.checkIsLearner' : () => {
      return Roles.userIsInRole( Meteor.userId(), "LEARN" );
   }

});
