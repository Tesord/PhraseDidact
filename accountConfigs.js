// import {Mongo} from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';
//
// const accountConfigs = new Mongo.Collection('accountConfigs');
//
//
// const Schemas = {};
//
// /******** TODO Make sure for Client to catch examples of these error using local Javascript code,
// before sending it to server (as double-safe). Method method Server errors will not be catched though.
// - Unique
// - Max length
// - Incorrect type...
// ***************/
//
//
// Schemas.AccountConfigs = new SimpleSchema({
//    userId: {
//       type: String,
//       label: "userId",
//       max: 20,
//       index: true,
//       unique: true
//    },
//    isInstructor: {
//       type: Boolean,
//       label: "isInstructor"
//    },
// });
//
// accountConfigs.attachSchema(Schemas.AccountConfigs);
//
// export default accountConfigs;
