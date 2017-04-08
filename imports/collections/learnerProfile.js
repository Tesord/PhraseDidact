import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import DB_Const from '../api/functional/db_Const';


const learnerProfile = new Mongo.Collection('learnerProfile');


const Schemas = {};

/******** TODO Make sure for Client to catch examples of these error using local Javascript code,
before sending it to server (as double-safe). Method method Server errors will not be catched though.
- Unique
- Max length
- Incorrect type...
***************/

Schemas.LearnerProfile = new SimpleSchema({
   userId: {
      type: String,
      label: "userId",
      max: 20,
      index: true,
      unique: true
   },
   birthday: {
      type: Date,
      label: "birthday",
      optional: true
   },
   gender: {
      type: String,
      label: "gender",
      allowedValues: DB_Const.GENDER__LEARNPROF.keys(),
      optional: true
   },
   country: {
      type: String,
      label: "country",
      allowedValues: DB_Const.COUNTRY__LEARNPROF.keys(),
      optional: true
   },
});

learnerProfile.attachSchema(Schemas.LearnerProfile);

export default learnerProfile;
