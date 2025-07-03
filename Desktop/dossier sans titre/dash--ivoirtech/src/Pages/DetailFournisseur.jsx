// DetailFournisseur.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailFournisseur() {
  const { id }              = useParams();
  const navigate            = useNavigate();
  const { user, clearUser } = useUserContext();

  const [fournisseur,    setFournisseur]    = useState(null);
  const [products,       setProducts]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [produitsLivres, setProduitsLivres] = useState([]);
  const [newProduit,     setNewProduit]     = useState({
    groupe: '', categorie: '', product: '', dateLivraison: '',
    status: 'en attente', quantity: 1
  });

  /* ---------- listes dynamiques ---------- */
  const groupes        = [...new Set(products.map(p => p.groupe))];
  const categories     = [...new Set(products
                            .filter(p => p.groupe === newProduit.groupe)
                            .map(p => p.categorie))];
  const produitsFiltres= products.filter(
    p => p.groupe === newProduit.groupe && p.categorie === newProduit.categorie
  );

  /* ------------------------------------------------------------------ */
  const getProductId = (prod) =>
    prod ? (typeof prod === 'object' ? prod._id : prod) : null;
  /* ------------------------------------------------------------------ */

  /* ---------- chargement ---------- */
  useEffect(() => {
    if (!user) { navigate('/'); return; }

    (async () => {
      try {
        const r1 = await fetch(`https://ivoirtech-innov.onrender.com/fournisseur/${id}`);
        const d1 = await r1.json();
        setFournisseur(d1);
        setProduitsLivres(d1.produitsLivres || []);

        const adminId = user._id || user.id;
        const r2 = await fetch(`https://ivoirtech-innov.onrender.com/admin/${adminId}`);
        const d2 = await r2.json();
        setProducts(d2.admin?.products || []);
      } catch (err) {
        console.error(err);
        toast.error('Erreur chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user, navigate]);

  /* ---------- handlers ---------- */
  const handleDeleteProduitLivre = (idx) => {
    if (window.confirm('Supprimer ce produit livré ?')) {
      const upd = [...produitsLivres];
      upd.splice(idx, 1);
      setProduitsLivres(upd);
      toast.info('Produit supprimé');
    }
  };

  const handleChange = (idx, field, val) => {
    const upd = [...produitsLivres];
    upd[idx][field] = val;
    setProduitsLivres(upd);
  };

  const handleSaveModifications = async () => {
    try {
      const toSend = produitsLivres
        .map(it => {
          const pid = getProductId(it.product);
          return pid
            ? { product: pid, dateLivraison: it.dateLivraison, status: it.status, quantity: it.quantity }
            : null;
        })
        .filter(Boolean);

      const payload = {
        name: fournisseur.name,
        address: fournisseur.address,
        ville: fournisseur.ville,
        number: fournisseur.number,
        produitsLivres: toSend
      };

      const res = await fetch(`https://ivoirtech-innov.onrender.com/fournisseur/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      res.ok ? toast.success('Modifications enregistrées')
             : toast.error('Erreur lors de l’enregistrement');
    } catch (err) {
      console.error(err);
      toast.error('Erreur sauvegarde');
    }
  };

  const handleAddProduitLivre = () => {
    if (!newProduit.product) {
      toast.warning('Sélectionnez un produit');
      return;
    }
    setProduitsLivres([...produitsLivres, { ...newProduit }]);
    setNewProduit({
      groupe: '', categorie: '', product: '', dateLivraison: '',
      status: 'en attente', quantity: 1
    });
  };

  /* ---------- total ---------- */
  const totalPrix = produitsLivres.reduce((tot, it) => {
    const pid   = getProductId(it.product);
    if (!pid) return tot;                  /* 🔒 sécurité */
    const prod  = products.find(p => p._id === pid);
    const prix  = prod?.price ? parseInt(prod.price, 10) : 0;
    return tot + prix * (parseInt(it.quantity || 1, 10));
  }, 0);

  /* ---------- logout ---------- */
  const logoutHandler = () => { clearUser(); navigate('/login'); };

  /* ---------- rendu ---------- */
  if (loading)        return <div>Chargement…</div>;
  if (!fournisseur)   return <div>Fournisseur introuvable</div>;

  return (
    <div>
      <Navbar logoutHandler={logoutHandler} />

      <div className="fournisseur-container">
        {/* header */}
        <div className="header-section">
          <h1><i className="fa-solid fa-users" /> Détail Fournisseur</h1>
          <div className="fournisseur-info">
            <p><strong>Nom :</strong> {fournisseur.name}</p>
            <p><strong>Adresse :</strong> {fournisseur.address}</p>
            <p><strong>Ville :</strong> {fournisseur.ville}</p>
            <p><strong>Tél :</strong> {fournisseur.number}</p>
          </div>
        </div>

        {/* table */}
        <div className="produits-section">
          <h2>Produits Livrés</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Date</th><th>Produit</th><th>Statut</th>
                <th>Quantité</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produitsLivres.map((it, idx) => {
                const prod = products.find(p => p._id === getProductId(it.product));
                return (
                  <tr key={idx}>
                    <td>
                      <input
                        type="date"
                        value={it.dateLivraison?.substring(0, 10) || ''}
                        onChange={e => handleChange(idx, 'dateLivraison', e.target.value)}
                      />
                    </td>
                    <td>
                      {prod
                        ? `${prod.title} (${prod.groupe}/${prod.categorie})`
                        : 'Produit supprimé'}
                    </td>
                    <td>
                      <select
                        value={it.status}
                        onChange={e => handleChange(idx, 'status', e.target.value)}
                      >
                        <option value="en attente">En attente</option>
                        <option value="livré">Livré</option>
                        <option value="annulé">Annulé</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={e => handleChange(idx, 'quantity', e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className="delete-btns"
                        onClick={() => handleDeleteProduitLivre(idx)}
                      >
                        <i className="fa-solid fa-trash-can" /> Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="total-section">
          Total Général : <span>{totalPrix.toLocaleString()} FCFA</span>
        </h3>

        {/* ajout */}
        <div className="ajout-section">
          <h2>Ajouter un produit livré</h2>
          <div className="ajout-form">
            <select
              value={newProduit.groupe}
              onChange={e =>
                setNewProduit({ ...newProduit, groupe: e.target.value, categorie: '', product: '' })
              }
            >
              <option value="">Sélectionner un groupe</option>
              {groupes.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <select
              value={newProduit.categorie}
              disabled={!newProduit.groupe}
              onChange={e =>
                setNewProduit({ ...newProduit, categorie: e.target.value, product: '' })
              }
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={newProduit.product}
              disabled={!newProduit.categorie}
              onChange={e => setNewProduit({ ...newProduit, product: e.target.value })}
            >
              <option value="">Sélectionner un produit</option>
              {produitsFiltres.map(p => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>

            <input
              type="date"
              value={newProduit.dateLivraison}
              onChange={e => setNewProduit({ ...newProduit, dateLivraison: e.target.value })}
            />

            <input
              type="number"
              min="1"
              value={newProduit.quantity}
              onChange={e =>
                setNewProduit({ ...newProduit, quantity: parseInt(e.target.value, 10) || 1 })
              }
            />

            <select
              value={newProduit.status}
              onChange={e => setNewProduit({ ...newProduit, status: e.target.value })}
            >
              <option value="en attente">En attente</option>
              <option value="livré">Livré</option>
              <option value="annulé">Annulé</option>
            </select>

            <button className="add-btn" onClick={handleAddProduitLivre}>
              Ajouter
            </button>
          </div>
        </div>

        <div className="btn-save">
          <button className="save-btn" onClick={handleSaveModifications}>
            Enregistrer les modifications
          </button>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}