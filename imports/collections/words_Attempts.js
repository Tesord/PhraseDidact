import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


const words_Attempts = new Mongo.Collection('words_Attempts');
const Schemas = {};


Schemas.Words_Attempts = new SimpleSchema({
   wordId: {
      type: String,
      label: "wordId",
      max: 20,
   },
   courseId: {
      type: String,
      label: "courseId",
      max: 20,
   },
   userId: {
      type: String,
      label: "wordId",
      max: 20,
   },
   nextReviewDate: {
      type: Date,
      label: "nextReviewDate",
   },

   attempts: {
      type: SimpleSchema.Integer,
      label: "attempts",
      defaultValue: 0
   },
   createdAt: {
      type: Date
   }
});

words_Attempts.attachSchema(Schemas.Words_Attempts);


export default words_Attempts;
