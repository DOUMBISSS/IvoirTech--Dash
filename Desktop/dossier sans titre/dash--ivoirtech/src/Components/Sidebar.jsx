import { Link ,useNavigate} from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";


export default function Sidebar(){

    const [user,setUser] = useState("");
  
    const notify = (e) => {
        toast.info('Veuillez vous connecter svp !!', {
          position: "top-right",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      };

 

    
    const navigate = useNavigate();
    // const logout = (e) => {
    //     e.preventDefault();
    //       signOut(auth)
    //     .then(() => {
    //       console.log(auth)
    //       navigate("/") 
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
    //     notify('')
    // }

    const logout =()=>{
        localStorage.clear();
        navigate('/');
        notify('')
    
      }
    
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user"))) 
      }, [])

    return (
        <div>
                        
                            <div className="sidebar">
                                <h6></h6>
                                <div className="sidebar--item">
                                    <Link to='/Accueil' className="link__sidebar"><p><i class="fa-brands fa-dashcube"></i> Tableau de bord</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/articles' className="link__sidebar"><p><i class="fa-solid fa-users"></i> Articles</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/clients' className="link__sidebar"><p><i class="fa-solid fa-house"></i> Clients</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/nos--fournisseurs' className="link__sidebar"><p><i class="fa-solid fa-gauge-high"></i> Fournisseurs</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/stocks' className="link__sidebar"><p><i class="fa-solid fa-gauge-high"></i> Mon stock</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/traitement' className="link__sidebar"><p><i class="fa-solid fa-house"></i> Traitement</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/searchArticle' className="link__sidebar"><p><i class="fa-solid fa-gauge-high"></i> Rechercher</p></Link>
                                </div>
                            </div>
                            <ToastContainer position="top-right" autoClose={3001} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false}  pauseOnFocusLoss draggable  pauseOnHover theme="colored"  />
        </div>
    )
}