import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function DetailClient() {
  const { user, clearUser } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchClient = async () => {
      try {
        const response = await fetch(`https://ivoirtech-innov.onrender.com/clients/${id}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Client introuvable');
        setClient(data);
      } catch (error) {
        console.error('Erreur chargement client :', error);
        toast.error('Client introuvable ou erreur serveur');
        setClient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, user, navigate]);

  const logoutHandler = () => {
    clearUser();
    navigate('/');
  };

  // Calcul total des montants
  const totalAmount = client?.Commande?.reduce((acc, cmd) => {
    const total = parseFloat(cmd.totalAmount || 0);
    return acc + total;
  }, 0) || 0;

  return (
    <>
      <Navbar logoutHandler={logoutHandler} />
    <div className="dashboard-wrapper">
      <div className="content animate-fadein">
        {loading ? (
          <div className="loader">
            <Blocks visible={true} height="80" width="100%" ariaLabel="blocks-loading" />
          </div>
        ) : client ? (
          <>
            <div className="client-header">
              <h2><i className="fa-solid fa-user"></i> Détails client</h2>
              <p><strong>Nom :</strong> {client.name} {client.surname}</p>
              <p><strong>Adresse :</strong> {client.address}</p>
              <p><strong>Ville :</strong> {client.ville}</p>
              <p><strong>Téléphone :</strong> {client.number}</p>
              <p><strong>Email :</strong> {client.email}</p>
              <p><strong>Nombre de commandes :</strong> {client.Commande?.length || 0}</p>
              <p><strong>Montant total :</strong> {totalAmount.toLocaleString()} FCFA</p>
            </div>

            <h3 style={{ marginTop: '30px' }}>🧾 Historique des commandes</h3>

            {client.Commande?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>N° Commande</th>
                    <th>Panier</th>
                    <th>Total</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {client.Commande.map(cmd => (
                    <tr key={cmd._id}>
                      <td>{cmd.createdAt ? new Date(cmd.createdAt).toLocaleDateString() : '—'}</td>
                      <td>{cmd.numeroCommande || '—'}</td>
                      <td>
                        <ul style={{ paddingLeft: '1rem' }}>
                          {cmd.cart?.map((item, idx) => (
                            <li key={idx}>
                              {item.title} — {item.quantity} × {parseFloat(item.price).toLocaleString()} FCFA
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{parseFloat(cmd.totalAmount || 0).toLocaleString()} FCFA</td>
                      <td>{cmd.status}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3">Total général</th>
                    <th>{totalAmount.toLocaleString()} FCFA</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p style={{ marginTop: '1rem' }}>Aucune commande pour ce client.</p>
            )}
          </>
        ) : (
          <p style={{ marginTop: '2rem' }}>Client introuvable.</p>
        )}
      </div>
     
    </div>
     <Footer />
     </>
  );
}