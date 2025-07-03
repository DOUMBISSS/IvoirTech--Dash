import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarList from './NavbarList';

export default function Fournisseurs() {
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // nombre d'éléments par page

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchFournisseurs = async () => {
      try {
        const response = await fetch('https://ivoirtech-innov.onrender.com/fournisseurs');
        const data = await response.json();
        setFournisseurs(data);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFournisseurs();
  }, [user, navigate]);

  // Reset page quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const logoutHandler = () => {
    clearUser();
    navigate('/');
  };

  // Filtrer les fournisseurs selon la recherche
  const filteredFournisseurs = fournisseurs.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination : calculer les fournisseurs à afficher sur la page courante
  const totalPages = Math.ceil(filteredFournisseurs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const fournisseursPagines = filteredFournisseurs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Composant Pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: i === currentPage ? '#8e44ad' : '#eee',
            color: i === currentPage ? 'white' : '#333',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {i}
        </button>
      );
    }
    return <div style={{ marginTop: 20, textAlign: 'center' }}>{pages}</div>;
  };

  return (
    <>
          <Navbar logoutHandler={logoutHandler} />
    <div className="dashboard-wrapper">
      {/* <NavbarList /> */}
      <div className="content animate-fadein">
        <div className="page-header">
          <h1>📦 Fournisseurs</h1>
        </div>
                  <div className="action-bar">
            <input
              type="text" className='form-control'
              placeholder="Recherche fournisseur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/ajouterFournisseur">
              <button className="btn-primary">Ajouter</button>
            </Link>
          </div>

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <>
            <div className="table-container animate-scalein">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Téléphone</th>
                    <th>Détails</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseursPagines.map((fournisseur) => (
                    <tr key={fournisseur._id} className="row-hover">
                      <td>{fournisseur.name}</td>
                      <td>{fournisseur.address}</td>
                      <td>{fournisseur.ville}</td>
                      <td>{fournisseur.number}</td>
                      <td>
                        <Link
                          to={`/detailFournisseur/${fournisseur._id}`}
                          className="btn btn-sm btn-info"
                        >
                          Voir
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(`/modifierFournisseur/${fournisseur._id}`)
                          }
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination />
          </>
        )}
      </div>
    
    </div>
      <Footer />
      </>
  );
}