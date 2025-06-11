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


export default function DetailClient() {
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
            <div className="firstly">
              <div className="container__mld__client">
                <div className='container__mld__client__info'>
                <h1 className='header__title'><i className="fa-solid fa-users"></i> ALTERA</h1>
                <p>Nom & Prenom Client : Altera Infrastructure</p>
                <p>Tel : 0777880082</p>
                <p>Adresse : Cocody Angré</p>
                <p>Date de création : 11/05/2025</p>
                <p>Montant Total Cmde. : 1 000 000 FCFA</p>
                </div>
                <div className='container__mld__client__info__btn'>
                <button className='btn__print'> <i className="fa-solid fa-print"></i> Imprimer </button>
                </div>
              </div>

              <h4>Liste des commandes </h4>
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
                    <th className="coler">N° Commande</th>
                    {/* <th className="coler">Prix d'achat</th>
                    <th className="coler">Prix de ventes</th> */}
                    <th className="coler">Adressse</th>
                    <th className="coler">Etat de la livraison</th>
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
                      <td className="coles">{person.tel}</td>
                      <td className="coles">{person.address}</td>
                      <td className="coles">Livré</td>
                      <td className="coles">
                        <Link to='/detailCommande'>
                          <button className="details__btn">Details</button>
                        </Link>
                      </td>
                      <td><i className="fa-solid fa-trash" id='trash'></i> 
                      <Link to='/trasnformer'><i id='trash' className="fa-solid fa-layer-group"></i></Link>
                      <i className="fa-solid fa-print" id='trash'></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}