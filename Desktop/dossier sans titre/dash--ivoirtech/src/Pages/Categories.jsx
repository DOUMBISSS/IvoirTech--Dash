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

export default function Categories() {
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
      <div className="container">
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
              <h1><i className="fa-solid fa-users"></i> Categories</h1>
              <div className="container__paiement">
              <div className="filter--container--content">
              {/* <div class="form-floating col-12">
                <input type="text" placeholder="Rechercher un locataire...." value={search} onChange={handleSearch}/>
                </div> */}
                <div className="col-md-12">
                       {/* <label htmlFor="validationDefault02" className="form-label">Date de paiement</label> */}
                       <input type="text" placeholder="Rechercher un locataire...." required value={search} onChange={handleSearch}/>
                        </div>
                </div>
                <div className="paiement__blockt">
                <button className="btn__add" onClick={() => navigate(`/addPerson/${user?.id}`)}>
                  <i className="fa-solid fa-plus"></i> Ajouter un locataire
                </button>
                </div>
  
              </div>
              {loading ? (
                <Blocks
                  visible={true}
                  height="80"
                  width="100%"
                  ariaLabel="blocks-loading"
                />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="coler">Nom</th>
                      <th className="coler">Prénom(s)</th>
                      <th className="coler">Contacts</th>
                      <th className="coler">Adresse</th>
                      <th className="coler">Details</th>
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
                        <td className="coles">
                          <Link to={`/detailPerson/${person._id}`}>
                            <button className="details__btn">Details</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}