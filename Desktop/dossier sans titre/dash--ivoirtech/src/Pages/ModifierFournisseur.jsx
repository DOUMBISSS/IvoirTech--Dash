import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUserContext } from '../contexts/UserContext';

export default function ModifierFournisseur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext(); // Admin connecté

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    ville: '',
    number: '',
    produitsLivres: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !user?._id) throw new Error("ID manquant");

        // Charger les produits de l'admin connecté
        const res = await fetch(`https://ivoirtech-innov.onrender.com/admin/${user._id}`);
        if (!res.ok) throw new Error("Erreur récupération admin");
        const adminData = await res.json();
        const productData = adminData.products || [];
        setProducts(productData);

        // Charger le fournisseur
        const fournisseurRes = await fetch(`https://ivoirtech-innov.onrender.com/fournisseur/${id}`);
        if (!fournisseurRes.ok) throw new Error("Fournisseur introuvable");
        const fournisseurData = await fournisseurRes.json();

        // Normaliser produits livrés
        const normalisedProduits = (fournisseurData.produitsLivres || []).map(p => ({
          product: p.product?._id || p.product,
          dateLivraison: p.dateLivraison?.substring(0, 10) || '',
          status: p.status || 'en attente',
          quantity: p.quantity || 1
        }));

        setForm({
          name: fournisseurData.name || '',
          address: fournisseurData.address || '',
          ville: fournisseurData.ville || '',
          number: fournisseurData.number || '',
          produitsLivres: normalisedProduits
        });
      } catch (err) {
        console.error("Erreur lors du chargement :", err.message);
        alert("Erreur lors du chargement des données.");
      }
    };

    fetchData();
  }, [id, user?._id]);

  // Pour affichage lecture seule des produits livrés
  const produitsLivresAvecDetails = form.produitsLivres.map(pl => {
    const prod = products.find(p => p._id === pl.product);
    return {
      ...pl,
      productTitle: prod ? prod.title : "(Produit supprimé ou non trouvé)"
    };
  });

  const handleAddProduct = () => {
    setForm(prev => ({
      ...prev,
      produitsLivres: [...prev.produitsLivres, { product: '', dateLivraison: '', status: 'en attente', quantity: 1 }]
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...form.produitsLivres];
    if (field === 'quantity') {
      updated[index][field] = Math.max(1, Number(value));
    } else {
      updated[index][field] = value;
    }
    setForm({ ...form, produitsLivres: updated });
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm("Supprimer ce produit livré ?")) {
      const updated = [...form.produitsLivres];
      updated.splice(index, 1);
      setForm({ ...form, produitsLivres: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://ivoirtech-innov.onrender.com/fournisseur/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erreur backend :", errorText);
        alert("Échec de la modification.");
        return;
      }

      alert('Fournisseur modifié avec succès');
      navigate('/nos--fournisseurs');
    } catch (err) {
      console.error("Erreur soumission :", err.message);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>✏️ Modifier le fournisseur</h2>

        {/* Affichage lecture seule des produits livrés existants */}
        {produitsLivresAvecDetails.length > 0 && (
          <div style={{ marginBottom: 30, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 6 }}>
            <h3>Produits déjà livrés :</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Produit</th>
                  <th style={{ padding: '8px' }}>Date livraison</th>
                  <th style={{ padding: '8px' }}>Quantité</th>
                  <th style={{ padding: '8px' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {produitsLivresAvecDetails.map((pl, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px' }}>{pl.productTitle}</td>
                    <td style={{ padding: '8px' }}>{pl.dateLivraison}</td>
                    <td style={{ padding: '8px' }}>{pl.quantity}</td>
                    <td style={{ padding: '8px', textTransform: 'capitalize' }}>{pl.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Formulaire éditable */}
        <form onSubmit={handleSubmit} className="form-card" style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="form-group">
            <label>Nom du fournisseur</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Ville</label>
            <input type="text" value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input type="text" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} />
          </div>

          <hr />
          <h4 style={{ marginTop: 20 }}>📦 Produits livrés (édition)</h4>
          {form.produitsLivres.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
              <select value={item.product} onChange={e => handleProductChange(index, 'product', e.target.value)} required style={{ flex: 2 }}>
                <option value="">Sélectionner un produit</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>

              <input type="date" value={item.dateLivraison} onChange={e => handleProductChange(index, 'dateLivraison', e.target.value)} required style={{ flex: 1.5 }} />

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => handleProductChange(index, 'quantity', e.target.value)}
                style={{ width: 70, flexShrink: 0 }}
                title="Quantité livrée"
                required
              />

              <select value={item.status} onChange={e => handleProductChange(index, 'status', e.target.value)} style={{ flex: 1 }}>
                <option value="en attente">En attente</option>
                <option value="livré">Livré</option>
                <option value="annulé">Annulé</option>
              </select>

              <button type="button" onClick={() => handleDeleteProduct(index)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: 'red' }}>🗑</button>
            </div>
          ))}

          <button type="button" onClick={handleAddProduct} style={{ backgroundColor: '#3498db', color: '#fff', padding: '8px 16px', borderRadius: 6, marginTop: 10, border: 'none' }}>
            + Ajouter un produit livré
          </button>

          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button type="submit" className="submit-btn" style={{ padding: '12px 24px', backgroundColor: '#27ae60', color: '#fff', borderRadius: 8, border: 'none' }}>
              💾 Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}