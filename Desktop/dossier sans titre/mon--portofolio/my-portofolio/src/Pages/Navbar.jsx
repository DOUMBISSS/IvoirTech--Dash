import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar () {

    return (
      <header>
          {/* <div className="navbar--header">
            <div className="navbar--logo">
              <Link to="/"><img src={`${process.env.PUBLIC_URL}/27.png`} alt=''/></Link>
              
            </div>
          </div> */}
          <div className="navbar--content">
              <ul>
              <Link to='/' className='li'><li className='liste'><i class="fa-solid fa-house"></i> Accueil</li></Link>
              <Link to='/about'className='li' ><li className='liste'> <i class="fa-solid fa-user"></i> About</li></Link>
              <Link to='/services' className='li'><li className='liste'><i class="fa-solid fa-bars"></i> Services</li></Link>
              <Link to='/portfolio' className='li'><li className='liste'><i class="fa-sharp fa-solid fa-briefcase"></i> Portfolio</li></Link>
              <Link to='/contact'className='li'><li className='liste'><i class="fa-solid fa-comments"></i> contact</li></Link>
              </ul>
          </div>
    </header>
    );
}

