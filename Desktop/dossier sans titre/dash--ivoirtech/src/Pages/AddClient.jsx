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

export default function AddClient() {
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
          <div className="sidebar">
                                <h6>Categories</h6>
                                <div className="sidebar--item">
                                    <Link to='/persons' className="link__sidebar"><p>Facture</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Facture Comptabilisée</p></Link>
                                </div>
                            </div>
                                
          </div>
          <div className="right">
            <div className="firstly">
              <h1 className='header__title'><i className="fa-solid fa-users"></i> Ajouter un nouveau client</h1>
            
                      <div className='container__addArticles'>
                      <form className="row g-3">
                                    <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Référence</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="validationDefault02" className="form-label">Nom(s) du client</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="validationDefault02" className="form-label">Désignation</label>
                                        <input type="text" className="form-control" id="validationDefault02" required />
                                    </div>

                                      <div className="col-md-3">
                                      <label htmlFor="validationDefault02" className="form-label">Categories</label>
                                      <select className="form-select" aria-label="Default select example" required>
                                        <option selected>Sélectionner</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    </div>

                                    {/* <div className="col-md-3">
                                      <label htmlFor="validationDefault02" className="form-label">Marques</label>
                                      <select className="form-select" aria-label="Default select example" required>
                                        <option selected>Sélectionner</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    </div> */}
{/* 
                                    <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Quantité</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Prix Unitaire</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Prix d'Achat</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Prix de Vente</label>
                                        <input type="text" className="form-control" id="validationDefault02" required/>
                                    </div> */}

                                    {/* <div className="col-md-2">
                                    <label htmlFor="validationDefault02" className="form-label">HT</label>
                                            <select class="form-select" aria-label="Default select example" required >
                                                <option selected>Sélectionner</option>
                                                <option value="M">HT </option>
                                                <option value="F">HT+TVA</option>
                                                </select>
                                    </div> */}
                                    {/* <div className="col-md-2">
                                        <label htmlFor="validationDefault02" className="form-label">Sexe</label>
                                        <input type="text" className="form-control" id="validationDefault02" required onChange={handleSexe} value={sexe}/>
                                    </div> */}                              

                                    <div className="btn--block--update">
                                            <Link to='/'><button className="btn__">Annuler</button></Link>
                                            <button className="btn__">Enregistrer</button>
                                    </div>
                                    </form>
                      </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}