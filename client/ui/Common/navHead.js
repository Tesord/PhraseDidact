import React from 'react';

import { Link } from 'react-router-dom';


const NavHead = () => {

   return (
      <div id="nav-head" className="align-left">
         <div className="navbar-title">PhraseDidact</div>

         <Link to="/" className="navbar-menu-items">Home</Link>
      </div>
   );
};


export default NavHead;
