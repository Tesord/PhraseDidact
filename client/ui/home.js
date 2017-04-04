import React from 'react';
import DocumentTitle from 'react-document-title';



/****** TODO *************
* Add content      **/


/* ::L_NOTE::
 * ( ... ) => {  ...  }    represents a function (es6).
 * The words inside the () brackets are the parameter,
 * The words inside the {} brackets are the function's execution code.
 */
const Home = () => {
   return (
		<DocumentTitle title='Home - PhraseDidact'>

         <div>
            SAMPLE TEXT
         </div>

		</DocumentTitle>
   );
};


/* ::L_NOTE::
 * Enable ability: When	this component is imported in other classes, using the < *reference name of this class' import* /> there
 * will execute the code within the const 'Home'.
 * i.e.	< *Component name* />   represents a function. */
export default Home;
