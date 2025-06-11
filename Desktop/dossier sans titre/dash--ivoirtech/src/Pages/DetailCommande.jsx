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

export default function DetailDevis() {
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
          {/* <div className="sidebar">
                  
                            </div> */}
                                <h6>Categories</h6>
                                <div className="sidebar--item">
                                    <Link to='/persons' className="link__sidebar"><p>Bon de commande</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Préparation de commande</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/Accueil' className="link__sidebar"><p>Bon de Livraison</p></Link>
                                </div>

                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Préparation de commande</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Facture Comptabilisée</p></Link>
                                </div>
          </div>
          <div className="right">
            <div className="firstly">
              <h1 className='header__title'><i className="fa-solid fa-users"></i> Detail Commande N°CMD0004151</h1>
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
                <div className='container--detailCommande'>
                    <div className='container--detailCommande--content'>
                        <div className='container--detailCommande--content--header'>
                        <div className='container--detailCommande--content--header--info'>
                        <p className=''>Nom & Prenom Client : Altera Infrastructure</p>
                        <p>Tel : 0777880082</p>
                        <p>Date de livraion : 11/05/2025 </p>
                        <p>Lieu de livraion : Cocody Angré</p>
                        <p>Livré par : Yango Livraison</p>
                        <p>Montant Total réglé : 1 000 000 FCFA</p>
                        </div>
                        <div className='container--detailCommande--content--header--btn'>
                          <button className='btn__print'> <i className="fa-solid fa-print"></i> Imprimer </button>
                          <button className='btn__print__trash'> <i className="fa-solid fa-trash"></i> Supprimer </button>
                        <button className='btn__print__trash'> <i className="fa-solid fa-trash"></i> Valider </button>
                        </div>
                        
                        </div>
                        <div className='detailCommande--content'>
                            <div className='detailCommande--content--cards'>
                                <div className='detailCommande--content--cards--left'>
                                    <div className='detailCommande--content--cards--left--image'>
                                      <Link to='/detailArticle'><img src="logo192.png" alt="" /></Link>
                                    </div>
                                </div>
                                <div className='detailCommande--content--cards--right'>
                                  <p>Samsung S25 ultra 8/256Gb</p>
                                  <p> Smartphone</p>
                                  <p>500 000 FCFA</p>
                                </div>
                            </div>
                            <div className='detailCommande--content--cards'>
                                <div className='detailCommande--content--cards--left'>
                                    <div className='detailCommande--content--cards--left--image'>
                                    <Link to='/detailArticle'><img src="logo192.png" alt="" /></Link>
                                    </div>
                                </div>
                                <div className='detailCommande--content--cards--right'>
                                  <p>Samsung S25 ultra 8/256Gb</p>
                                  <p> Smartphone</p>
                                  <p>500 000 FCFA</p>
                                </div>
                            </div>
                            <div className='detailCommande--content--cards'>
                                <div className='detailCommande--content--cards--left'>
                                    <div className='detailCommande--content--cards--left--image'>
                                    <Link to='/detailArticle'><img src="logo192.png" alt="" /></Link>
                                    </div>
                                </div>
                                <div className='detailCommande--content--cards--right'>
                                  <p>Samsung S25 ultra 8/256Gb</p>
                                  <p> Smartphone</p>
                                  <p>500 000 FCFA</p>
                                </div>
                            </div>
                        </div>
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