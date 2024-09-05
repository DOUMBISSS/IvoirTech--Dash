import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";



export default function Navbar (){
  const [toogleHelp,setToogle]=useState(false)
  const [sidebar,setSidebar]=useState(false)
  const [user,setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"))) 
    }, [])


  const sidebarMenu = () =>{
    setSidebar(true)
  }

  const sidebarToogle = () =>{
    setToogle(true)
  }
  
  const closeNav = () =>{
    setSidebar(false)
  }

  const Help = () =>{
    setToogle(true)
  }
  const display = ()=>{
    setToogle(false)
  }

    const navigate = useNavigate();
  
        


    const logoutHandler =()=>{
      localStorage.clear();
      
      navigate('/');
  
    }
    // console.log(user)
  
    return(
        <div>
            <header>
           <div className="navbar--left">
                {/* <div className="navbagr--menu">
                <i className="fa-solid fa-bars" onClick={sidebarToogle}></i>
                </div> */}
                      <div className="navbar--left--box">
                    <Link to="/Accueil"> <img src={`${process.env.PUBLIC_URL}/lo.png`} alt=''/></Link>
                </div>
           </div>
           <div className="navbar--center">
                {/* <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}

             {/* <div className="user--name--box">
                            <h6 className="user--name"><i className="fa-solid fa-user"></i> {user.username}</h6>
                            <h6 className='user--email'> {user.email}</h6>
                        </div> */}
                      
           </div>
           <div className="navbar--right">
                    {/* <button type="button" class="btn btn-primary">
                        Notifications <span class="badge text-bg-secondary">4</span>
                        </button> */}
                         <button className="btn__help" onClick={Help}> <i class="fa-solid fa-circle-question"></i> Aide </button>
       {user ? (
            <>
              <span><i className="fa-solid fa-user"></i> {user.email}</span>
              <button onClick={logoutHandler} className="btn__logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn__login">
              Login
            </Link>
          )}
                         {/* <button className="btn__log" onClick={logout}> <i class="fa-solid fa-right-from-bracket"></i> Deconnexion</button> */}
           </div>
            </header>
            {/* <div className="navbar__display">
              <div className="navbar__display__left">
                    <p onClick={sidebarMenu}><i class="fa-solid fa-bars"></i> Menu</p>
              </div>
              <div className="navbar__display__center">
                      <div className="navbar__display__center__logo">
                      <Link to="/Accueil"> <img src={`${process.env.PUBLIC_URL}/27.PNG`} alt=''/></Link>
                      </div>
              </div>
              <div className="navbar__display__right">
                <button className="btn__help" onClick={sidebarToogle}> <i class="fa-solid fa-circle-question"></i> Aide </button>
              </div>

            </div> */}
           

                          

              
        </div>
    )
}

// 