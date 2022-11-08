import React from 'react';
import {Link} from 'react-router-dom';

function Navbar ({setDisplay,display}) {
            
  const afficher = () => {
    setDisplay(true)
  }
  // const affi = ()=>{
  //   setDisplay(false)
  // }

    return (
      <div>
      <header>
        <nav>
          <div className="navbar--left">
            <div className="navbar--logo">
              <Link to="/"> <img src="27.png" alt=""/></Link>
            </div>
          </div>
          <div className="navbar--right">
            <div className="navbar--right--content">
              <Link className='liste' to="/">Accueil</Link>
              {/* <Link className='liste' to="/vente">Vente</Link> */}
              {/* <Link className='liste' to="/acheter">Acheter</Link> */}
              <Link className='liste' to="/louer">Locations</Link>
              <Link className='liste' to="/contact">Contacts</Link>
              <Link className='liste' to="/propos">A propos</Link>
              <form>
                <input className="form-control me-2" type="text" placeholder="Search" />
              </form>
            </div>
               <div className={display ? "sidebar show--sidebar " :'sidebar'}></div>
                    <div className='icons'>
                      <div className='icon--menu' onClick={afficher}>
                          <i class="fa-solid fa-bars"></i>
                      </div>
                      {/* <div className='icon--search'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </div> */}
                    </div>
          </div>
        </nav>
    </header>

              </div>
    );
}

export default Navbar;
