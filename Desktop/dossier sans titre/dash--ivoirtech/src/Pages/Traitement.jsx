import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Traitement() {
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext();

  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCommandes = async () => {
      const adminId = user?._id || user?.id;
      if (!adminId) {
        toast.error("adminId manquant, veuillez vous reconnecter");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/commandes?adminId=${adminId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur serveur");

        if (Array.isArray(data)) {
          const previousCount = parseInt(localStorage.getItem('lastCommandeCount') || '0', 10);
          localStorage.setItem('lastCommandeCount', data.length.toString());

          if (data.length > previousCount && previousCount > 0) {
            toast.info(`🛒 ${data.length - previousCount} nouvelle(s) commande(s) reçue(s)`, {
              position: "top-right",
              autoClose: 5000,
            });
          }

          setCommandes(data);
        } else {
          toast.error("Format des données incorrect pour les commandes");
          setCommandes([]);
        }
      } catch (err) {
        console.error("Erreur chargement commandes admin:", err);
        toast.error("Erreur lors de la récupération des commandes.");
        setCommandes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, [user]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/commandes/${id}/status`, { status: newStatus });
      toast.success("Statut mis à jour !");
      setCommandes((prev) =>
        prev.map((cmd) => (cmd._id === id ? { ...cmd, status: newStatus } : cmd))
      );
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'livrée': return '#28a745';
      case 'à livrer': return '#fd7e14';
      case 'en attente': return '#0d6efd';
      case 'annulé': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const filteredCommandes = commandes.filter((c) => {
    const matchSearch = (c?.client?.name || c?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? c.status === statusFilter : true;
    const matchDate = dateFilter ? c.createdAt?.startsWith(dateFilter) : true;
    return matchSearch && matchStatus && matchDate;
  });

  const totalPages = Math.ceil(filteredCommandes.length / itemsPerPage);
  const paginatedCommandes = filteredCommandes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const logoutHandler = () => {
    clearUser();
    navigate('/');
  };

  return (
    <>
      <Navbar logoutHandler={logoutHandler} />
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="right">
            <h1><i className="fa-solid fa-truck me-2"></i>Mes commandes</h1>

            <div className="filter--container--content mb-3">
              <input className='form-control'
                type="text"
                placeholder="Rechercher par client..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tous les statuts</option>
                <option value="en attente">En attente</option>
                <option value="à livrer">À livrer</option>
                <option value="livrée">Livré</option>
                <option value="annulé">Annulé</option>
              </select>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {loading ? (
              <div className="d-flex justify-content-center mt-4">
                <Blocks visible={true} height="80" width="80" />
              </div>
            ) : (
              <>
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>Total</th>
                      <th>Statut</th>
                      <th>Changer</th>
                      <th>Détails</th>
                      <th>Alerte stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCommandes.map((c) => (
                      <tr key={c._id}>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td>{c.name || c.client?.name || 'Inconnu'}</td>
                        <td>{c.address || c.client?.address || 'N/A'}</td>
                        <td>{c.number || c.client?.number || 'N/A'}</td>
                        <td>{c.totalAmount?.toLocaleString()} FCFA</td>
                        <td>
                          <span style={{
                            backgroundColor: getStatusColor(c.status),
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={c.status}
                            onChange={(e) => handleStatusUpdate(c._id, e.target.value)}
                          >
                            <option value="en attente">En attente</option>
                            <option value="à livrer">À livrer</option>
                            <option value="livrée">Livrée</option>
                            <option value="annulé">Annulé</option>
                          </select>
                        </td>
                        <td>
                          <Link to={`/detailCommande/${c._id}`}>
                            <button className="btn btn-sm btn-info">Détails</button>
                          </Link>
                        </td>
                        <td>
                          {c.cart?.some(item => item.stockInsuffisant) ? (
                            <span style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '10px',
                              fontSize: '0.9em'
                            }}>
                              Stock insuffisant
                            </span>
                          ) : (
                            <span style={{ color: '#28a745', fontSize: '0.9em' }}>OK</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {paginatedCommandes.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center">Aucune commande trouvée</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="d-flex justify-content-center my-3 gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ◀ Précédent
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={currentPage === i + 1 ? 'btn btn-dark' : 'btn btn-outline-dark'}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Suivant ▶
                  </button>
                </div>
                <p className="text-center">Total : {filteredCommandes.length} commande(s)</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
}