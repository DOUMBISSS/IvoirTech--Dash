import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';


function Navbar ({search,setSearch}) {
  const [display, setDisplay] = useState(false);
  // const [searchHome,setSearchHome] = useState()
            
  const afficher = () => {
    setDisplay(true)
  }

  const affi = ()=>{
    setDisplay(false)
  }

    return (
      <div>
      <header>
          <div className='navbar'>
          <div className="navbar--left">
          <div className='icons'>
                      <div className='icon--menu' onClick={afficher}>
                          <i className="fa-solid fa-bars"></i>
                      </div>
                      {/* <div className='icon--search'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </div> */}
                  </div>
            <div className="navbar--logo">
            {/* <Link to="/" className='header__title'><h5>SHOPPING<span>BAG</span></h5></Link> */}
              <Link to="/"> <img src="/logopurepro.png" alt='...' /></Link>
            </div>
          </div>
          <div className="navbar--center">
            <div className="navbar--center--content">
              <Link className='liste' to="/"><p>Accueil</p></Link>
              {/* <Link className='liste' to="/Notre--actualité"><p>Actualités</p></Link> */}
              <Link className='liste' to="/Nos__prestations"><p>Nos prestations</p></Link>
              <Link className='liste' to="/Qui--sommes-nous" ><p>Qui sommes-nous ?</p></Link>
              {/* <Link className='liste' to="/obtenir_devis"><p>Devis</p></Link> */}
              <Link className='liste' to="/contactez--nous"><p>Contactez-nous</p></Link>
            </div>
            <div className='logo--resp'>
              <div className="navbar--logo--resp">
              <Link to="/"> <img src={`${process.env.PUBLIC_URL}/log.jpg`} alt=""/></Link>
              </div>
            </div>
          </div>
         </div>

         <div className={display ? "sidebar show-sidebar" : "sidebar"}>
          <div className='sidebar--menu'>
            <div className='btn--close--sidebar' onClick={affi}>X</div>
            <Link className='liste' to="/"><p>Accueil</p></Link>
              <Link className='liste' to="/Qui--sommes-nous" ><p>Qui sommes-nous ?</p></Link>
              {/* <Link className='liste' to="/Notre--actualité"><p>Actualités</p></Link> */}
              <Link className='liste' to="/Nos__prestations"><p>Nos prestations</p></Link>
              {/* <Link className='liste' to="/obtenir_devis"><p>Devis</p></Link> */}
              <Link className='liste' to="/contactez--nous"><p>Contactez-nous</p></Link>
          </div>
    </div>

    </header>
          

              </div>
    );
}

export default Navbar;
