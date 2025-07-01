import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ModifierArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ▶️ Ajout promotion dans l’état */
  const [formData, setFormData] = useState({
    reference: '', title: '', description: '',
    price: '', label: '', categorie: '', details: '',
    prixAchat: '', prixVente: '', groupe: '',
    specifications: '', stock: 0, disponible: true,
    poids: '', promotion: 0,                     // ← NOUVEAU
    images: []
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [secondaryPreviews, setSecondaryPreviews] = useState([]);
  const [existingSelectedImages, setExistingSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------- CHARGEMENT PRODUIT -------- */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`http://localhost:8080/products/${id}`);
        const data = await res.json();
        setFormData(data);
        setPreview(
          data.img?.startsWith('http')
            ? data.img
            : `http://localhost:8080/uploads/${data.img}`
        );
        setExistingSelectedImages(Array.isArray(data.images) ? data.images : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  /* -------- HANDLERS -------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(f.type) || f.size > 2 * 1024 * 1024)
      return alert('Format ou taille invalide.');
    setImage(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSecondaryChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => ['image/jpeg', 'image/png', 'image/jpg'].includes(f.type) && f.size <= 2 * 1024 * 1024
    );
    setSecondaryImages(files);
    setSecondaryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const toggleExistingImage = (img) => {
    setExistingSelectedImages((p) =>
      p.includes(img) ? p.filter((i) => i !== img) : [...p, img]
    );
  };

  /* -------- SUBMIT -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    [
      'reference', 'title', 'description', 'price',
      'label', 'categorie', 'details', 'prixAchat',
      'prixVente', 'groupe', 'specifications', 'stock',
      'disponible', 'poids', 'promotion'          // ← NOUVEAU
    ].forEach((k) => form.append(k, formData[k] ?? ''));

    if (image) form.append('img', image);
    secondaryImages.forEach((f) => form.append('images', f));
    existingSelectedImages.forEach((n) => form.append('existingImages[]', n));

    try {
      const res = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'PUT',
        body: form
      });
      if (!res.ok) throw new Error();
      alert('Article mis à jour avec succès');
      navigate(`/detailArticle/${id}`);
    } catch {
      alert('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <p>Chargement…</p>;

  /* -------- RENDER -------- */
  return (
    <>
      <Navbar />
      <div className="modifier-container">
        <h2>Modifier l'article</h2>
        <form className="form-style" onSubmit={handleSubmit}>
          {[
            ['reference', 'Référence', 'text'],
            ['title', 'Titre', 'text'],
            ['price', 'Prix affiché', 'number'],
            ['prixAchat', 'Prix d’achat', 'number'],
            ['prixVente', 'Prix de vente', 'number'],
            ['promotion', 'Promotion (%)', 'number'],    /* ← NOUVEAU */
            ['label', 'Marque', 'text'],
            ['categorie', 'Catégorie', 'text'],
            ['groupe', 'Groupe', 'text'],
            ['stock', 'Stock', 'number'],
            ['poids', 'Poids', 'text']
          ].map(([name, label, type]) => (
            <label key={name}>{label}
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'poids'}
                min={type === 'number' ? 0 : undefined}
              />
            </label>
          ))}

          <label>Description
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>

          <label>Spécifications
            <textarea name="specifications" value={formData.specifications} onChange={handleChange} />
          </label>

          <label>Disponible
            <input type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange} />
          </label>

          <label>Image principale
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {preview && <img src={preview} alt="preview" style={{ maxWidth: 200, marginTop: 10 }} />}

          <div>
            <p>Images secondaires existantes (décochez pour supprimer)</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {formData.images.map((img, i) => {
                const src = img.startsWith('http') ? img : `http://localhost:8080/uploads/${img}`;
                return (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={existingSelectedImages.includes(img)}
                      onChange={() => toggleExistingImage(img)}
                    />
                    <img src={src} alt="" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                  </label>
                );
              })}
            </div>
          </div>

          <label>Ajouter des images secondaires
            <input type="file" accept="image/*" multiple onChange={handleSecondaryChange} />
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {secondaryPreviews.map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: 100, height: 100, objectFit: 'cover' }} />
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: 15 }}>
            Enregistrer
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}