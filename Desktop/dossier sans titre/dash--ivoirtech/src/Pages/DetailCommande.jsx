
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function DetailCommande() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, clearUser } = useUserContext();

  const [commande, setCommande]         = useState(null);
  const [loading, setLoading]           = useState(true);
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [message, setMessage]           = useState('');
  const [stockNotification, setStockNotification] = useState('');
  const [showConfirmModal, setShowConfirmModal]   = useState(false);

  /* ------------------------------------------------------------------ */
  const fetchCommande = useCallback(async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`https://ivoirtech-innov.onrender.com/commandes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) {
        setMessage('Commande introuvable ou erreur serveur.');
        setCommande(null);
        return;
      }
      const data = await res.json();
      setCommande(data);

      const msg = data.cart
        .filter(it => it.productId?.stock < 5)
        .map(it => `Stock faible pour "${it.productId.title}" : ${it.productId.stock} unité(s).`);
      setStockNotification(msg.join('\n'));
    } catch (err) {
      console.error(err);
      setMessage('Erreur réseau.');
      setCommande(null);
    } finally {
      setLoading(false);
    }
  }, [id, user.token]);

  useEffect(() => {
    if (!user) return navigate('/');
    fetchCommande();
  }, [user, fetchCommande, navigate]);

  /* ---------- helpers ---------- */
  const cleanPriceString = str => (typeof str === 'string' ? str.replace(/\//g, '').trim() : str);
  const formatPrice = price => {
    const n = Number(cleanPriceString(price));
    return isNaN(n) ? price : n.toLocaleString('fr-FR') + ' FCFA';
  };

  /* ---------- ACTIONS ---------- */
  const generateInvoice = async () => {
    setLoadingInvoice(true);
    setMessage('');
    try {
      const res = await fetch(`https://ivoirtech-innov.onrender.com/commandes/${id}/facture`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}`, Accept: 'application/pdf' },
      });
      if (!res.ok) {
        const d = await res.json();
        setMessage(d.message || 'Erreur lors de la génération de la facture.');
      } else {
        const blob = await res.blob();
        const url  = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href        = url;
        link.download    = `facture_commande_${commande.numeroCommande}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setMessage('Facture téléchargée avec succès.');
      }
    } catch (e) {
      setMessage('Erreur réseau.');
    } finally {
      setLoadingInvoice(false);
    }
  };

  const sendInvoiceEmail = async () => {
    setLoadingEmail(true);
    setMessage('');
    try {
      const res = await fetch(`https://ivoirtech-innov.onrender.com/commandes/${id}/send-invoice`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
      });
      const d = await res.json();
      setMessage(res.ok ? 'Facture envoyée par email.' : d.message || "Erreur lors de l'envoi email.");
    } catch (e) {
      setMessage('Erreur réseau.');
    } finally {
      setLoadingEmail(false);
    }
  };

  const marquerCommePayee = async () => {
    setLoadingPayment(true);
    setMessage('');
    try {
      const res = await fetch(`https://ivoirtech-innov.onrender.com/commandes/${id}/payer`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const d = await res.json();
      if (res.ok) {
        setMessage(d.message);
        await fetchCommande();
      } else setMessage(d.message || 'Erreur lors du traitement.');
    } catch (e) {
      setMessage('Erreur réseau.');
    } finally {
      setLoadingPayment(false);
    }
  };

  /* ---------- rendu ---------- */
  if (loading)   return <div>Chargement…</div>;
  if (!commande) return <div>Commande introuvable</div>;

  /* données client (préférence pour .client) */
  const cli   = commande.client || {};
  const nom   = cli.name ? `${cli.name} ${cli.surname || ''}`.trim() : commande.name;
  const tel   = cli.number  || commande.number  || 'N/A';
  const mail  = cli.email   || 'N/A';
  const adr   = cli.address || commande.address || 'N/A';
  const vil   = cli.ville   || commande.ville   || '';
  const adrLine = vil ? `${adr}, ${vil}` : adr;

  /* nouvelle destination éventuelle renvoyée par le backend */
  const alt   = commande.livraisonAlt || {};   // ex: { address:'…', ville:'…' }
  const hasAlt= alt.address || alt.ville;

  return (
    <>
          <Navbar logoutHandler={() => { clearUser(); navigate('/'); }} />
         
    <div className="detail-page" style={{ fontFamily:'Segoe UI, Tahoma, sans-serif', paddingBottom:40 }}>


      <div className="container" style={{ maxWidth:900, margin:'auto', padding:'20px' }}>
        <h1 style={{ fontWeight:700, fontSize:'1.8rem', marginBottom:20 }}>
          <i className="fa-solid fa-receipt" style={{ marginRight:10 }} />
          Détail Commande N°{commande.numeroCommande}
        </h1>

        {/* ---------- bloc infos client ---------- */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:25, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280, marginRight:20, background:'#f9f9f9', padding:15, borderRadius:8 }}>
            <h2 style={{ borderBottom:'2px solid #117a65', marginBottom:12, color:'#117a65' }}>Informations Client</h2>

            <p><strong>Nom&nbsp;:</strong> {nom}</p>
            <p><strong>Email&nbsp;:</strong> {mail}</p>
            <p><strong>Téléphone&nbsp;:</strong> {tel}</p>
            <p><strong>Date&nbsp;:</strong> {new Date(commande.createdAt).toLocaleDateString()}</p>
            <p><strong>Adresse&nbsp;:</strong> {adrLine}</p>

            {hasAlt && (
              <p style={{ marginTop:6 }}>
                <strong>Nouvelle adresse&nbsp;:</strong>{' '}
                {`${alt.address || '-'}${alt.ville ? ', ' + alt.ville : ''}`}
              </p>
            )}

            <p><strong>Montant&nbsp;:</strong> {formatPrice(commande.totalAmount)}</p>

            <p>
              <strong>Statut :</strong>{' '}
              <span style={{
                color: ['payé','payée'].includes((commande.paymentStatus||'').toLowerCase()) ? 'green' : 'red',
                fontWeight:'bold'
              }}>
                {commande.paymentStatus || 'Non payé'}
              </span>
            </p>

            {!['payé','payée'].includes((commande.paymentStatus||'').toLowerCase()) && (
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={loadingPayment}
                style={{ marginTop:12, background:'#007bff', color:'#fff', padding:'10px 20px',
                         border:'none', borderRadius:8 }}>
                Marquer comme Payée
              </button>
            )}

            {stockNotification && (
              <div style={{ marginTop:15, padding:10, background:'#fff3cd',
                            borderRadius:6, color:'#856404', whiteSpace:'pre-line' }}>
                ⚠️ {stockNotification}
              </div>
            )}
          </div>

          {/* ---------- actions ---------- */}
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:15 }}>
            <button onClick={generateInvoice}
                    disabled={loadingInvoice}
                    className="btn-saas-pro">
              {loadingInvoice ? 'Téléchargement...' : 'Générer Facture PDF'}
            </button>
            <button onClick={sendInvoiceEmail}
                    disabled={loadingEmail}
                    className="btn-saas-pro green">
              {loadingEmail ? 'Envoi...' : 'Envoyer la facture par email'}
            </button>
          </div>
        </div>

        {/* ---------- tableau produits ---------- */}
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ background:'#117a65', color:'#fff' }}>
            <tr>
              <th style={{ textAlign:'left', padding:8 }}>Réf. Produit</th>
              <th style={{ textAlign:'left', padding:8 }}>Produit</th>
              <th style={{ textAlign:'center', padding:8 }}>Image</th>
              <th style={{ textAlign:'center', padding:8 }}>Quantité</th>
              <th style={{ textAlign:'center', padding:8 }}>PU</th>
              <th style={{ textAlign:'center', padding:8 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {commande.cart.map((item, idx) => {
              const p      = item.productId;
              const imgUrl = p.img?.startsWith('http') ? p.img : `https://ivoirtech-innov.onrender.com/uploads/${p.img}`;
              return (
                <tr key={idx} style={{ background: idx%2 ? '#f7f9f9' : '#fff' }}>
                  <td style={{ padding:10 }}>{p.reference || '—'}</td>
                  <td style={{ padding:10 }}>{p.title}</td>
                  <td style={{ textAlign:'center' }}>
                    <img src={imgUrl} alt={p.title}
                         style={{ width:60, height:60, objectFit:'cover', borderRadius:6 }} />
                  </td>
                  <td style={{ textAlign:'center' }}>{item.quantity}</td>
                  <td style={{ textAlign:'center' }}>{formatPrice(p.price)}</td>
                  <td style={{ textAlign:'center', fontWeight:'bold' }}>
                    {formatPrice(p.price * item.quantity)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background:'#e1f5e4' }}>
              <td colSpan={6} style={{ textAlign:'center', fontWeight:700, padding:12 }}>
                Total général&nbsp;: {formatPrice(commande.totalAmount)}
              </td>
            </tr>
          </tfoot>
        </table>

        {message && (
          <div style={{ marginTop:20, padding:15, background:'#d1ecf1',
                        color:'#0c5460', fontWeight:600 }}>
            {message}
          </div>
        )}
      </div>

      {/* ---------- Modal animé ---------- */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div className="modal-overlay"
                      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-box"
                        initial={{ scale:0.8 }} animate={{ scale:1 }} exit={{ scale:0.8 }}>
              <h3>Confirmer</h3>
              <p>Voulez-vous marquer cette commande comme payée&nbsp;?</p>
              <div className="modal-actions">
                <button onClick={() => setShowConfirmModal(false)}>Annuler</button>
                <button onClick={async () => { setShowConfirmModal(false); await marquerCommePayee(); }}>
                  {loadingPayment ? 'Traitement...' : 'Confirmer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <style jsx>{`
        .btn-saas-pro {
          padding: 12px 25px;
          background: linear-gradient(135deg, #00b09b, #96c93d);
          color: #fff;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-saas-pro.green {
          background: linear-gradient(135deg, #28a745, #71c77a);
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }
        .modal-box {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          gap: 10px;
        }
        .modal-actions button {
          padding: 8px 15px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }
        .modal-actions button:first-child {
          background-color: #ccc;
        }
        .modal-actions button:last-child {
          background-color: #28a745;
          color: white;
        }
      `}</style>
    </div>
        <Footer />
       </>
  );
}