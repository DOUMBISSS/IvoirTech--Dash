import React, { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar ({searchQuestion,setSearchQuestion}) {

  const navigate = useNavigate();
  const [user,setUser] = useState("");
  const [display,setDisplay]=useState(false);

  const showProfil =()=>{
    setDisplay(true)
  }
  const closeProfil =()=>{
    setDisplay(false)
  }


  const logout =()=>{
    localStorage.clear();
    navigate('/');

  }

// useEffect(() => {
//   setUser(JSON.parse(localStorage.getItem("user"))) 
//   }, [])

    return (
      <div>
      <header>
      <div className="navbar--left">
            <div className="navbar--logo">
              <div className ="navbar--logo--box" >
              <Link to="/Accueil">
                <img src="data:image/jpeg;base64,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" alt="" />
                </Link>
              </div>
            </div>
          </div>

            <div className='navbar--center'>
                 <h1 className='title'>Police Nationale</h1>
            </div>
          <div className="navbar--right">
            <div className="navbar--right--content">
              <div className='profil'>
                <i className="fa-solid fa-user" onClick={showProfil}> <i className='log'>Mon profil</i> </i>
              </div>
                <div className= {display ? "user--part display--user--part" : "user--part" }>
                  <div className="user--name--content">
                      <div className="user--name">
                            <h6><i className="fa-solid fa-user" onClick={showProfil}></i> Doumbia fode</h6>
                            <h6 className='user--email'> fode7doumbia@gmail.com</h6>
                        </div>
                      <div className='btn--close--login'>
                        <i className="fa-solid fa-xmark" onClick={closeProfil}></i>
                      </div>
                  </div>
                  <button className="logout--btn" onClick={logout}> <i className="fa-solid fa-right-from-bracket"></i> Déconnexion</button>
                </div>
              </div>
            </div>    
    </header>

     </div>
    );
}

