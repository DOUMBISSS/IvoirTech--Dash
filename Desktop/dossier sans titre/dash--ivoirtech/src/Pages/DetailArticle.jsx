import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../contexts/UserContext';
import Sidebar from '../Components/Sidebar';
import Navbar from './Navbar';
import { getAllPerson, getUser } from '../Redux/actions';
import { Blocks } from 'react-loader-spinner';
import Footer from './Footer';
import NavbarList from './NavbarList';
import Zoom from "react-medium-image-zoom";

export default function DetailArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext(); // Access context
  const persons = useSelector((state) => state.peopleReducer.persons);
  const users = useSelector((state) => state.peopleReducer.users);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect if not logged in
      return;
    }

    const fetchData = async () => {
      try {
        const personResponse = await fetch('https://mayedo.onrender.com/persons');
        const userResponse = await fetch(`https://mayedo.onrender.com/users/${user?.id}`);

        const personData = await personResponse.json();
        const userData = await userResponse.json();

        dispatch(getAllPerson(personData));
        dispatch(getUser(userData));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, dispatch, navigate]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const logoutHandler = () => {
    clearUser();
    navigate('/login');
  };

  console.log(user)

  return (
    <div>
      <Navbar logoutHandler={logoutHandler} />
      <NavbarList/>
      <div className="containers">
        <div className="dashboard">
          <div className="left">
          <Sidebar/>
                  
                    
          </div>
          <div className="right">
            <div className="firstly">
              <h1 className='header__title'><i className="fa-solid fa-file"></i> Detail Article</h1>
              <div className="container__mld">
              <div className="filter--container--content">
                {/* <div className="col-md-2">
                <select class="form-select form-select-sm" aria-label="Small select example">
                <option selected>Categories</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div> */}
              {/* <div className="col-md-2">
                <select class="form-select form-select-sm" aria-label="Small select example">
                <option selected>Articles</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div> */}

              {/* <div className="col-md-2">
                <select class="form-select form-select-sm" aria-label="Small select example">
                <option selected>Caracteristique</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div> */}
              
              
              {/* <div className="col-md-4">
                       <input type="text" placeholder="Rechercher un article...." required value={search} onChange={handleSearch}/>
                        </div> */}
                
                        {/* <button className="btn__devis" onClick={() => navigate(`/addPerson/${user?.id}`)}>
                  <i className="fa-solid fa-plus"></i> Ajouter un nouveau devis
                </button> */}

                {/* <div className="col-md-2">
                        <select class="form-select form-select-sm" aria-label="Small select example">
                        <option selected>Imprimer</option>
                        <option value="1">Devis</option>
                        <option value="2">Bon de livraison</option>
                        <option value="3">Bon de commande</option>
                        <option value="2">Facture</option>
                        <option value="3">Bon de retour</option>
                    </select>
                    </div> */}

                    {/* <div className="col-md-2">
                        <select class="form-select form-select-sm" aria-label="Small select example">
                        <option selected>Transformer</option>
                        <option value="1">Devis</option>
                        <option value="2">Bon de livraison</option>
                        <option value="3">Bon de commande</option>
                        <option value="2">Facture</option>
                        <option value="3">Bon de retour</option>
                    </select>
                    </div> */}
              </div>
  
              </div>
              {/* {loading ? (
                <Blocks visible={true} height="80" width="100%" ariaLabel="blocks-loading"/>
              ) : (
                <table className="table">
                <thead>
                  <tr>
                  <th className="coler">N° Devis</th>
                    <th className="coler">Référence</th>
                    <th className="coler">Désignation</th>
                    <th className="coler">Quantité</th>
                    <th className="coler">Prix d'achat</th>
                  </tr>
                </thead>
                <tbody>
                  {users.person_id?.filter((person) => {
                    return search === '' || person.name.toLowerCase().includes(search.toLowerCase());
                  }).map((person) => (
                    <tr key={person._id}>
                      <td className="coles">{person.name}</td>
                      <td className="coles">{person.prenom}</td>
                      <td className="coles">{person.tel}</td>
                      <td className="coles">{person.address}</td>
                      <td>15 000 000 FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )
              } */}
                   <div className="container--article">
                    <div className="container--article--left--part">
                        <div className="container--article--left--part--content">
                        <div className='container--thumbnail--gallery'>
                          {/* <div className="thumbnail-gallery">
                            {product.images && product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={`${process.env.PUBLIC_URL}/${img}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div> */}
                          </div>
                            <div className="container--article--left--part--content--image">  
                                {/* <img src={selectedImage} alt={product.title} className="main-image" /> */}
                               
                                    {/* <img src={`${process.env.PUBLIC_URL}/${selectedImage}`} alt={product.title} className="main-image" /> */}
                                    <img src="logo192.png" alt="" />
                                
                            </div> 
                         
                        </div> 
                    </div>

                    <div className="container--article--right--part">
                        <h5 className='label'></h5>
                        <h4 className="name--article"></h4>
                        <h6>Intel Core i7-8550U (8M Cache, 1.8 GHz), 16GB LPDDR3 2133MHz, 512GB PCIe SSD, 13.3'' 4K Ultra HD Touch 3840 x 2160 InfinityEdge, WLAN, Bluetooth, WebCam, Windows 10 Pro 64-bit</h6>
                        <p className='label'>Marque : </p>
                        <p className='reference--article'>Référence: </p>
                        <p className='rating'>3 ratings</p>
                        <p className='availability'>En stock</p>
                        <p className='warranty'> Garantie: 1 mois </p>
                        <p className="price"> FCFA</p>
                        {/* <button className='btn__print'> <i className="fa-solid fa-print"></i> Imprimer </button> */}
                          <button className='btn__print__trash'> <i className="fa-solid fa-trash"></i> Supprimer </button>
                    </div>         
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}