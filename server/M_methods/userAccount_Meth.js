
/** TODO If Meteor method on server folder, then when it is called, the server runs it instead;
 * but Client can run "expected" version through stub.
 * If on "imports" folder, then both server & client runs it (client run miniMongo version).
 * If on "client" only, then only client runs the method (no much point).
 **/

/** TODO Error handling at the client's side, when error of SimpleSchema is thrown to client,
using Meteor.call()'s callback function **/

/** TODO Make sure multiple userId is not inserted into database (unique) **/

Meteor.methods({


   'userAccount.setAccountType': (isInstructor) => {

      if( Meteor.userId() &&
            !Roles.userIsInRole( Meteor.userId(), "LEARN" ) &&
            !Roles.userIsInRole( Meteor.userId(), "INSTR" )
         ){

         // Will throw exception if unsuccessful. This method blocks until complete.
         if(isInstructor){
            Roles.addUsersToRoles(Meteor.userId(), "INSTR" );
         }
         else{
            Roles.addUsersToRoles(Meteor.userId(), "LEARN" );
         }

      }

   },

   // Roles.userIsInRole() does not work correctly in client [ specifically componentDidMount() ]
   'userAccount.checkIsInstructor' : () => {
      return Roles.userIsInRole( Meteor.userId(), "INSTR" );
   },
   'userAccount.checkIsLearner' : () => {
      return Roles.userIsInRole( Meteor.userId(), "LEARN" );
   },

   'userAccount.getUserDetails' : (userId) => {
      let user = Meteor.users.findOne( {_id : userId} );

      if(user){
         return {
            userId : user._id,
            joinDate : user.createdAt,
            username: user.username,
            role: Roles.getRolesForUser( userId )[0]
         };
      }
      else{
         return null;
      }

   },


   'userAccount.getCourseCreatorsDetails' : (courseList) => {
      let userIdArray = [];
      // get userId of the creators of all the courses
      for(let course    of   courseList){
         userIdArray.push( course.userId );
      }

      // get users DB record for each creator
      let users = Meteor.users.find( { _id: { $in: userIdArray } } ).fetch();


      let resultArray = [];

      for(let userDetail    of    users){
         resultArray.push(
            {
               userId : userDetail._id,
               joinDate : userDetail.createdAt,
               username: userDetail.username,
            }
         );
      }

      return resultArray;
   }


});
