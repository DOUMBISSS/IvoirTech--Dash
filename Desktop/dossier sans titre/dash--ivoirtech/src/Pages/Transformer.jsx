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

export default function Transformer() {
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

                                <h6>Categories</h6>
                                <div className="sidebar--item">
                                    <Link to='/devis' className="link__sidebar"><p>Devis</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/bon-de-commande' className="link__sidebar"><p>Bon de commande</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/bon-de-livraison' className="link__sidebar"><p>Bon de Livraison</p></Link>
                                </div>

                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Préparation de commande</p></Link>
                                </div>
  
                                <div className="sidebar--item">
                                    <Link to='/persons' className="link__sidebar"><p>Bon de retour</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Préparation de commande</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/persons' className="link__sidebar"><p>Facture</p></Link>
                                </div>
                                <div className="sidebar--item">
                                    <Link to='/renthome' className="link__sidebar"><p>Facture Comptabilisée</p></Link>
                                </div>
          </div>
          <div className="right">
            <div className="firstly">
              <h1 className='header__title'><i className="fa-solid fa-users"></i> Transformer</h1>
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
                    {/* <th className="coler">Nom</th> */}
                    <th className="coler">Dates</th>
                    <th className="coler">Référence</th>
                    {/* <th className="coler">Désignation</th> */}
                    <th className="coler">N° Devis</th>
                    {/* <th className="coler">Prix d'achat</th>
                    <th className="coler">Prix de ventes</th> */}
                    <th className="coler">Details</th>
                    <th className="coler">Actions / Transformer</th>
                  </tr>
                </thead>
                <tbody>
                  {users.person_id?.filter((person) => {
                    return search === '' || person.name.toLowerCase().includes(search.toLowerCase());
                  }).map((person) => (
                    <tr key={person._id}>
                      <td className="coles">{person.name}</td>
                      <td className="coles">{person.prenom}</td>
                      {/* <td className="coles">{person.tel}</td> */}
                      <td className="coles">{person.address}</td>
                      <td className="coles">
                        <Link to='/detailDevis'>
                          <button className="details__btn">Details</button>
                        </Link>
                      </td>
                      <td><i className="fa-solid fa-trash" id='trash'></i> <i id='trash' className="fa-solid fa-layer-group"></i></td>
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