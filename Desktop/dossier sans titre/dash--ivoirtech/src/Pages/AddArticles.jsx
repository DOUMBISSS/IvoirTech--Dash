/* ------------------------------------------------------------------------ */
/*  AddArticles.jsx                                                         */
/* ------------------------------------------------------------------------ */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* ---------- Listes de base (groupes, catégories, marques) --------------- */
const groupesOptionsBase = [
  'Informatique', 'Téléphonie', 'Image, Audio & Vidéo', 'Maison & Électroménager',
  'Mobilier & Décoration', 'Mode & Beauté', 'Bricolage & Outils', 'Auto & Moto',
  'Jouets & Enfants', 'Hygiène & Santé', 'Cuisine & Alimentation',
  'Culture & Loisirs', 'Sécurité'
];

const categoriesParGroupeBase = {
  Informatique: ['Ordinateurs portables', 'Accessoires PC', 'Imprimantes', 'Composants', 'Stockage'],
  Téléphonie: ['Smartphones', 'Accessoires téléphones', 'Montres connectées'],
  'Image, Audio & Vidéo': ['Casques', 'Écouteurs', 'Caméras', 'Projecteurs', 'Téléviseurs'],
  'Maison & Électroménager': ['Réfrigérateurs', 'Lave-linges', 'Aspirateurs', 'Ventilateurs', 'Luminaires'],
  'Mobilier & Décoration': ['Canapés', 'Chaises', 'Rangements', 'Lits', 'Bureaux'],
  'Mode & Beauté': ['Vêtements', 'Chaussures', 'Maquillage', 'Parfums', 'Soins capillaires'],
  'Bricolage & Outils': ['Perceuses', 'Marteaux', 'Tournevis', 'Peinture'],
  'Auto & Moto': ['Pneus', 'Accessoires voiture', 'Huiles moteur', 'Casques moto'],
  'Jouets & Enfants': ['Jeux éducatifs', 'Jouets électroniques', 'Poussettes'],
  'Hygiène & Santé': ['Désinfectants', 'Thermomètres', 'Masques', 'Gel hydroalcoolique'],
  'Cuisine & Alimentation': ['Batterie de cuisine', 'Mixeurs', 'Plats cuisinés', 'Boissons'],
  'Culture & Loisirs': ['Livres', 'Jeux vidéo', 'Films', 'Instruments de musique'],
  Sécurité: ['Caméras de surveillance', 'Alarmes', 'Détecteurs de fumée']
};

const marquesParGroupeBase = {
  Informatique: ['HP', 'Dell', 'Lenovo', 'Asus', 'Logitech', 'MSI', 'Acer', 'Autres'],
  Téléphonie: ['Samsung', 'Apple', 'Xiaomi', 'Tecno', 'Infinix', 'Huawei', 'Itel', 'Autres'],
  'Image, Audio & Vidéo': ['Sony', 'LG', 'JBL', 'Philips', 'Bose', 'Autres'],
  'Maison & Électroménager': ['LG', 'Samsung', 'Midea', 'Toshiba', 'Hisense', 'Autres'],
  'Mobilier & Décoration': ['IKEA', 'Conforama', 'Maison du Monde', 'Autres'],
  'Mode & Beauté': ['Zara', 'H&M', 'Chanel', 'L\'Oréal', 'Nike', 'Adidas', 'Autres'],
  'Bricolage & Outils': ['Bosch', 'Makita', 'Black & Decker', 'Stanley', 'Autres'],
  'Auto & Moto': ['Michelin', 'Total', 'Castrol', 'Shell', 'Yamaha', 'Autres'],
  'Jouets & Enfants': ['Fisher-Price', 'Lego', 'Chicco', 'Autres'],
  'Hygiène & Santé': ['Dettol', 'Colgate', 'Sensodyne', 'Always', 'Autres'],
  'Cuisine & Alimentation': ['Nestlé', 'Maggi', 'Coca-Cola', 'Nespresso', 'Autres'],
  'Culture & Loisirs': ['PlayStation', 'Xbox', 'Nintendo', 'Autres'],
  Sécurité: ['Hikvision', 'Ring', 'TP-Link', 'Autres']
};
/* ------------------------------------------------------------------------ */

export default function AddArticles() {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  /* ---------------------------- États ----------------------------------- */
  const [loading, setLoading] = useState(true);
  const [fournisseurs, setFournisseurs] = useState([]);

  /** Champ promotion ajouté (valeur par défaut : 0) */
  const [formData, setFormData] = useState({
    title: '', reference: '', label: '', categorie: '',
    prixAchat: '', prixVente: '', price: '', promotion: 0,
    description: '', groupe: '', specifications: '',
    stock: 0, disponible: true, poids: '', fournisseurId: ''
  });

  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  /* Listes dynamiques éditables */
  const [groupesOptions, setGroupesOptions] = useState(groupesOptionsBase);
  const [categoriesParGroupe, setCategoriesParGroupe] = useState(categoriesParGroupeBase);
  const [marquesParGroupe, setMarquesParGroupe] = useState(marquesParGroupeBase);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableMarques, setAvailableMarques] = useState([]);

  /* Pour afficher/masquer les champs d'ajout manuel */
  const [addingGroup, setAddingGroup] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingMarque, setAddingMarque] = useState(false);

  const [newGroup, setNewGroup] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newMarque, setNewMarque] = useState('');

  /* --------------------------- Effects ---------------------------------- */
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  /* Fournisseurs */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://ivoirtech-innov.onrender.com/fournisseurs');
        setFournisseurs(res.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  /* Liste catégories + marques lorsque groupe change */
  useEffect(() => {
    setAvailableCategories(categoriesParGroupe[formData.groupe] || []);
    setAvailableMarques(marquesParGroupe[formData.groupe] || []);
    setFormData((p) => ({ ...p, categorie: '', label: '' }));
  }, [formData.groupe, categoriesParGroupe, marquesParGroupe]);

  /* Prévisualisations images */
  useEffect(() => {
    if (img) {
      const url = URL.createObjectURL(img);
      setImgPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImgPreview(null);
  }, [img]);

  useEffect(() => {
    if (images.length) {
      const urls = images.map((f) => URL.createObjectURL(f));
      setImagesPreview(urls);
      return () => urls.forEach((u) => URL.revokeObjectURL(u));
    }
    setImagesPreview([]);
  }, [images]);

  /* --------------------------- Handlers --------------------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  /* Ajout d’un nouveau groupe */
  const handleAddGroup = () => {
    const g = newGroup.trim();
    if (!g) return alert('Saisissez un groupe.');
    if (groupesOptions.includes(g)) return alert('Ce groupe existe déjà.');
    setGroupesOptions((prev) => [...prev, g]);
    setCategoriesParGroupe((prev) => ({ ...prev, [g]: [] }));
    setMarquesParGroupe((prev) => ({ ...prev, [g]: [] }));
    setFormData((p) => ({ ...p, groupe: g, categorie: '', label: '' }));
    setNewGroup('');
    setAddingGroup(false);
  };

  /* Ajout catégorie */
  const handleAddCategory = () => {
    const c = newCategory.trim();
    if (!c) return alert('Saisissez une catégorie.');
    if (!formData.groupe) return alert('Sélectionnez d’abord un groupe.');
    if ((categoriesParGroupe[formData.groupe] || []).includes(c)) return alert('Existe déjà.');
    setCategoriesParGroupe((prev) => ({
      ...prev,
      [formData.groupe]: [...(prev[formData.groupe] || []), c]
    }));
    setFormData((p) => ({ ...p, categorie: c }));
    setNewCategory('');
    setAddingCategory(false);
  };

  /* Ajout marque */
  const handleAddMarque = () => {
    const m = newMarque.trim();
    if (!m) return alert('Saisissez une marque.');
    if (!formData.groupe) return alert('Sélectionnez d’abord un groupe.');
    if ((marquesParGroupe[formData.groupe] || []).includes(m)) return alert('Existe déjà.');
    setMarquesParGroupe((prev) => ({
      ...prev,
      [formData.groupe]: [...(prev[formData.groupe] || []), m]
    }));
    setFormData((p) => ({ ...p, label: m }));
    setNewMarque('');
    setAddingMarque(false);
  };

  /* Soumission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) return alert('Image principale obligatoire.');
    if (!user?.id) return alert('Session expirée, reconnectez-vous.');

    const data = new FormData();
    const fields = {
      ...formData,
      prixAchat : parseFloat(formData.prixAchat) || 0,
      prixVente : parseFloat(formData.prixVente) || 0,
      price     : parseFloat(formData.price)     || 0,
      promotion : parseFloat(formData.promotion) || 0,
      stock     : parseInt(formData.stock, 10)   || 0,
      disponible: formData.disponible ? 'true' : 'false'
    };
    Object.keys(fields).forEach((k) => data.append(k, fields[k]));

    data.append('img', img);
    images.forEach((f) => data.append('images', f));
    data.append('adminId', user.id);
    data.append('fournisseur', formData.fournisseurId);

    try {
      await axios.post('https://ivoirtech-innov.onrender.com/Newproducts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Produit ajouté avec succès !');
      setTimeout(() => navigate('/articles'), 3000);
    } catch {
      toast.error('Erreur lors de l\'ajout.');
    }
  };

  if (loading) return <div>Chargement…</div>;

  /* --------------------------- Render ----------------------------------- */
  return (
    <div className="add-article-page">
      <Navbar logoutHandler={() => { logout(); navigate('/'); }} />

      <div className="container">
        <h1>Ajouter un produit</h1>

        <form className="article-form" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Champs principaux basiques */}
          {[
            ['title',      'Nom du produit', 'text'],
            ['reference',  'Référence',      'text'],
            ['prixAchat',  'Prix d’achat',   'number'],
            ['prixVente',  'Prix de vente',  'number'],
            ['price',      'Prix affiché',   'number'],
            ['promotion',  'Promotion (%)',  'number'],
            ['stock',      'Stock',          'number'],
            ['poids',      'Poids',          'text']
          ].map(([name, label, type]) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'poids'}
                min={type === 'number' ? 0 : undefined}
              />
            </div>
          ))}

          {/* Sélecteur Groupe + ajout */}
          <div className="form-group">
            <label>Groupe</label>
            <select name="groupe" value={formData.groupe} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              {groupesOptions.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <button type="button" className="add__select" onClick={() => setAddingGroup(!addingGroup)}>+ Ajouter</button>
            {addingGroup && (
              <div style={{ marginTop: 5 }}>
                <input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="Nouveau groupe" />
                <button type="button" onClick={handleAddGroup}>OK</button>
              </div>
            )}
          </div>

          {/* Sélecteur Catégorie + ajout */}
          <div className="form-group">
            <label>Catégorie</label>
            <select name="categorie" value={formData.categorie} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              {availableCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button type="button" className="add__select" onClick={() => setAddingCategory(!addingCategory)}>+ Ajouter</button>
            {addingCategory && (
              <div style={{ marginTop: 5 }}>
                <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nouvelle catégorie" />
                <button type="button" onClick={handleAddCategory}>OK</button>
              </div>
            )}
          </div>

          {/* Sélecteur Marque + ajout */}
          <div className="form-group">
            <label>Marque</label>
            <select name="label" value={formData.label} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              {availableMarques.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <button type="button" className="add__select" onClick={() => setAddingMarque(!addingMarque)}>+ Ajouter</button>
            {addingMarque && (
              <div style={{ marginTop: 5 }}>
                <input value={newMarque} onChange={(e) => setNewMarque(e.target.value)} placeholder="Nouvelle marque" />
                <button type="button" onClick={handleAddMarque}>OK</button>
              </div>
            )}
          </div>

          {/* Fournisseur */}
          <div className="form-group">
            <label>Fournisseur</label>
            <select name="fournisseurId" value={formData.fournisseurId} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              {fournisseurs.map((f) => (
                <option key={f._id} value={f._id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* Textarea Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} />
          </div>

          {/* Textarea Spécifications */}
          <div className="form-group">
            <label>Spécifications</label>
            <textarea name="specifications" value={formData.specifications} onChange={handleChange} rows={4} />
          </div>

          {/* Disponible */}
          <div className="form-group form-check">
            <input id="disponible" type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange} />
            <label htmlFor="disponible">Disponible</label>
          </div>

          {/* Image principale */}
          <div className="form-group">
            <label>Image principale</label>
            <input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} required />
            {imgPreview && (
              <div style={{ marginTop: 10 }}>
                <img src={imgPreview} alt="Preview" style={{ maxWidth: 300, borderRadius: 8 }} />
              </div>
            )}
          </div>

          {/* Images secondaires */}
          <div className="form-group">
            <label>Images secondaires</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
            {imagesPreview.length > 0 && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                {imagesPreview.map((src, i) => <img key={i} src={src} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6 }} />)}
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="form-actions">
            <Link to="/"><button type="button" className="btn cancel">Annuler</button></Link>
            <button type="submit" className="btn save">Enregistrer</button>
          </div>
        </form>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}