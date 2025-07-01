import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const backend = 'http://localhost:8080';

export default function Clients() {
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext();

  const [clients, setClients]       = useState([]);     // liste des clients
  const [ordersMap, setOrdersMap]   = useState({});     // {clientId: nbCmd}
  const [loading, setLoading]       = useState(true);   // loader global
  const [search, setSearch]         = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ──────────────────────────────────────────────────────────
     1)  Récupération clients  +  nombre de commandes
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    (async () => {
      const adminId = user?._id || user?.id;
      if (!adminId) {
        toast.error('adminId manquant, veuillez vous reconnecter');
        setLoading(false);
        return;
      }

      try {
        /* --- A.  Clients --- */
        const resClients  = await fetch(`${backend}/clients?adminId=${adminId}`);
        const dataClients = await resClients.json();
        if (!resClients.ok) throw new Error(dataClients.message || 'Erreur clients');
        setClients(dataClients || []);

        /* --- B.  Commandes --- */
        const resCmds  = await fetch(`${backend}/commandes?adminId=${adminId}`);
        const dataCmds = await resCmds.json();
        if (!resCmds.ok) throw new Error(dataCmds.message || 'Erreur commandes');

        // Agrège les commandes par clientId
        const map = {};
        (dataCmds || []).forEach((cmd) => {
          const id = cmd.clientId || cmd.client?._id;
          if (!id) return;
          map[id] = (map[id] || 0) + 1;
        });
        setOrdersMap(map);
      } catch (err) {
        console.error('Erreur chargement :', err);
        toast.error('Erreur lors du chargement des données.');
        setClients([]);
        setOrdersMap({});
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  /* ──────────────────────────────────────────────────────────
     2)  Recherche & pagination
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const logoutHandler = () => {
    clearUser();
    navigate('/');
  };

  const filteredClients = clients.filter((c) =>
    `${c.name || ''} ${c.surname || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages   = Math.max(1, Math.ceil(filteredClients.length / itemsPerPage));
  const startIndex   = (currentPage - 1) * itemsPerPage;
  const clientsPage  = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  /* ──────────────────────────────────────────────────────────
     3)  Composant pagination
  ────────────────────────────────────────────────────────── */
  const Pagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: i + 1 === currentPage ? '#8e44ad' : '#eee',
              color:             i + 1 === currentPage ? '#fff'   : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────
     4)  Rendu
  ────────────────────────────────────────────────────────── */
  return (
    <>
      <Navbar logoutHandler={logoutHandler} />

      <div className="dashboard-wrapper">
        <div className="content animate-fadein">
          <div className="header">
            <h1>👥 Clients avec commandes</h1>
            <div className="search-bar">
              <input
                className="form-control"
                type="text"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="loader">
              <Blocks visible height="80" width="100" ariaLabel="blocks-loading" />
            </div>
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
                      <th>Email</th>
                      <th>Commandes</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsPage.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Aucun client trouvé.
                        </td>
                      </tr>
                    ) : (
                      clientsPage.map((c) => (
                        <tr key={c._id} className="row-hover">
                          <td>{c.name} {c.surname}</td>
                          <td>{c.address}</td>
                          <td>{c.ville}</td>
                          <td>{c.number}</td>
                          <td>{c.email || '-'}</td>
                          <td>{ordersMap[c._id] || 0} commande(s)</td>
                          <td>
                            <Link
                              to={`/detailClient/${c._id}`}
                              className="btn btn-sm btn-info"
                            >
                              Détails
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
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