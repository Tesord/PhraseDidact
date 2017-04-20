import React, {Component} from 'react';

import Tipped from '/public/ui/tipped.js';

import Func_Util from '/imports/api/functional/func_Util';


class Tipped_WordnListTooltip extends Component {

   render(){
      return (

         <div className="simple-tooltip"  id={ this.props.word_id } > { this.props.word } </div>

      );
   }

   componentDidMount(){

      Tipped.create(".simple-tooltip", Func_Util.createStringHRSep_FromArray( this.props.list ),
         { position: "bottom" }
      );

   }

}

export default Tipped_WordnListTooltip;
