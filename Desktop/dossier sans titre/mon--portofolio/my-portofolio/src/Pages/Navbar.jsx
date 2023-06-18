import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar () {
  const [nav , setNav] = useState(false);
  const [display,setDisplay]=useState(false);
  const navigate = useNavigate();

    const openLog = ()=>{
      setNav(true)
    }

  const showProfil =()=>{
    setDisplay(true)
  }
  const closeProfil =()=>{
    setDisplay(false)
  }
  const showMenu = () =>{
    setDisplay(true)
}
const affi = ()=> {
  setDisplay (false)
}



    return (
     <div>
       <header>
  <div className='navbar'>
  <div className="navbar--left">
  <div className='icon--menu' onClick={showMenu}>
       <i className="fa-solid fa-bars"></i>
       </div>
       <div className="navbar--logo">
            <Link to="/" className='header__title'><h5>MY<span>PORTFOLIO</span></h5></Link>
            </div>
  </div>
  <div className="navbar--center">
    <div className="navbar--center--content">
            <Link className='liste' to="/"><i class="fa-solid fa-house"></i> Accueil</Link>
              <Link className='liste' to="/about"><i class="fa-brands fa-slack"></i> About</Link>
              {/* <Link className='liste' to="/conciergerie">Conciergerie</Link> */}
              <Link className='liste' to="/services"><i class="fa-solid fa-bars"></i> Services</Link>
              <Link className='liste' to="/portfolio"><i class="fa-solid fa-folder"></i> Portofolio</Link>
    </div>
  </div>
  <div className="navbar--right">
    <div className='navbar--right--content'>
    <Link className='liste' to="/contact"><i class="fa-solid fa-phone"></i> Contact</Link>
    </div>
  <div className='logo--resp'>
      <div className="navbar--logo--resp">
        <Link to="/" className='header__title'><h5>MY<span>PORTFOLIO</span></h5></Link>
      </div>
    </div>
  </div>
 </div>

<div className={display ? "menu show--menu" : "menu"}>
            <div className='sidebar--menu'>
                <div className='btn--close--sidebar' onClick={affi}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className='menu__content'>
                  <div className='menu__content__liste'>
                    <Link className='list' to="/"><i class="fa-solid fa-bars"></i> Accueil</Link>
                  </div>
                  <div className='menu__content__liste'>
                  <Link className='list' to='/about'><i class="fa-brands fa-slack"></i> About</Link>
                  </div>
                  <div className='menu__content__liste'>
                  <Link className='list' to='/services'><i class="fa-solid fa-bars"></i> Services</Link>
                  </div>
                    <div className='menu__content__liste'>
                    <Link className='list' to='/portfolio'><i class="fa-solid fa-folder"></i> Portfolio</Link>
                    </div>
                    <div className='menu__content__liste'>
                      <Link className='list' to='/contact'> <i class="fa-solid fa-phone"></i> Contact</Link>
                    </div>
                </div>
                </div>

</div>

</header>
    
     </div>
    );
}

