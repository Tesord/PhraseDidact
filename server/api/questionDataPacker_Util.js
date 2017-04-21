import Words_Attempts from '/imports/collections/words_Attempts';



export function pack(next_Word, questionType){

   switch(questionType){
      case "TEXT":
         return text_Pack(next_Word, questionType);
   
   }

}

export function text_Pack(next_Word, questionType){
   return {
      type: questionType,
      wordId : next_Word._id,
      l2_wordName : next_Word.l2_wordName,
      l2_examples : next_Word.l2_examples,
   };
}
