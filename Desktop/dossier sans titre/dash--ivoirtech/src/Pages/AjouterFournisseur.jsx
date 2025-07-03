import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AjouterFournisseur() {
  const { user } = useUserContext();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    ville: '',
    number: '',
    produitsLivres: []
  });
  const [submitting, setSubmitting] = useState(false);

  /* -------------------------------------------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const adminId = user?._id || user?.id;
      if (!adminId) {
        toast.error('adminId manquant, veuillez vous reconnecter');
        return;
      }
      try {
        const res  = await fetch(`https://ivoirtech-innov.onrender.com/admin/${adminId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erreur serveur');
        if (Array.isArray(data.admin?.products)) setProducts(data.admin.products);
        else toast.error('Format des données incorrect pour les produits');
      } catch (err) {
        console.error(err);
        toast.error('Erreur lors de la récupération des produits');
      }
    };
    if (user) fetchProducts();
  }, [user]);
  /* -------------------------------------------------- */

  const handleAddProduct = () =>
    setForm(f => ({
      ...f,
      produitsLivres: [
        ...f.produitsLivres,
        { product: '', dateLivraison: '', status: 'en attente', quantity: 1 }
      ]
    }));

  const handleProductChange = (i, field, value) => {
    const upd = [...form.produitsLivres];
    upd[i][field] =
      field === 'quantity'
        ? Math.max(1, parseInt(value) || 1)
        : value;
    setForm({ ...form, produitsLivres: upd });
  };

  const handleDeleteProduct = (i) => {
    const upd = [...form.produitsLivres];
    upd.splice(i, 1);
    setForm({ ...form, produitsLivres: upd });
  };

  /* -------- validation rapide -------- */
  const validateForm = () => {
    if (!form.name.trim() || !form.address.trim() || !form.ville.trim() || !form.number.trim()) {
      toast.warn('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    for (const pl of form.produitsLivres) {
      if (!pl.product || !pl.dateLivraison || !pl.quantity) {
        toast.warn('Complétez chaque ligne produit');
        return false;
      }
    }
    return true;
  };

  /* -------- submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const payload = {
      ...form,
      produitsLivres: form.produitsLivres.map(pl => ({
        ...pl,
        dateLivraison: new Date(pl.dateLivraison).toISOString()
      }))
    };

    try {
      const res = await fetch('https://ivoirtech-innov.onrender.com/fournisseur', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success('🎉 Fournisseur ajouté avec succès');
        setForm({ name: '', address: '', ville: '', number: '', produitsLivres: [] });
      } else {
        const err = await res.json();
        toast.error(err.message || 'Erreur serveur');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------- JSX ------------- */
  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: 900, margin: 'auto' }}>
        <h2>Ajouter un fournisseur</h2>

        <form onSubmit={handleSubmit} className="form-group">
          <input
            className="form-control my-2" placeholder="Nom"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            disabled={submitting} required
          />
          <input
            className="form-control my-2" placeholder="Adresse"
            value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
            disabled={submitting} required
          />
          <input
            className="form-control my-2" placeholder="Ville"
            value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
            disabled={submitting} required
          />
          <input
            className="form-control my-2" placeholder="Téléphone"
            value={form.number} onChange={e => setForm({ ...form, number: e.target.value })}
            disabled={submitting} required
          />

          <h4>Produits livrés</h4>
          {form.produitsLivres.length > 0 && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Produit</th><th>Date Livraison</th><th>Status</th>
                  <th>Quantité</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {form.produitsLivres.map((pl, i) => (
                  <tr key={i}>
                    <td>
                      <select
                        className="form-control"
                        value={pl.product}
                        onChange={e => handleProductChange(i, 'product', e.target.value)}
                        disabled={submitting} required
                      >
                        <option value="">Sélectionner</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date" className="form-control"
                        value={pl.dateLivraison}
                        onChange={e => handleProductChange(i, 'dateLivraison', e.target.value)}
                        disabled={submitting} required
                      />
                    </td>
                    <td>
                      <select
                        className="form-control"
                        value={pl.status}
                        onChange={e => handleProductChange(i, 'status', e.target.value)}
                        disabled={submitting}
                      >
                        <option value="en attente">En attente</option>
                        <option value="livré">Livré</option>
                        <option value="annulé">Annulé</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number" min="1" className="form-control"
                        value={pl.quantity}
                        onChange={e => handleProductChange(i, 'quantity', e.target.value)}
                        disabled={submitting} required
                      />
                    </td>
                    <td>
                      <button
                        type="button" className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProduct(i)} disabled={submitting}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            type="button" className="btn btn-secondary my-2"
            onClick={handleAddProduct} disabled={submitting}
          >
            + Ajouter un produit
          </button>

          <button
            type="submit" className="btn btn-primary my-2"
            disabled={submitting}
          >
            {submitting ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      </div>
      <Footer />
      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}