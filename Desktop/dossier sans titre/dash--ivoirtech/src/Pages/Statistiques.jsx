import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarList from './NavbarList';



export default function Statistiques() {
 

  const logoutHandler = () => {
    // Ta fonction de déconnexion
  };

  return (
    <div>
      <Navbar logoutHandler={logoutHandler} />
      {/* <NavbarList />  */}

     

      <Footer />
    </div>
  );
}