import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Navbar from './Navbar';
import Footer from './Footer';

const DetailArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product,        setProduct]        = useState(null);
  const [selectedImage,  setSelectedImage]  = useState('');
  const [allImages,      setAllImages]      = useState([]);
  const [loading,        setLoading]        = useState(true);

  const backendURL = 'https://ivoirtech-innov.onrender.com';

  /* ----------- chargement du produit ----------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/products/${id}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération du produit');
        const data = await res.json();

        setProduct(data);

        /* fusionne img principale + images[] sans doublons */
        const imgs = [];
        if (data.img) imgs.push(data.img);
        if (Array.isArray(data.images))
          data.images.forEach(img => { if (img && img !== data.img) imgs.push(img); });

        setAllImages(imgs);
        setSelectedImage(imgs[0] || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  /* ----------- suppression ----------- */
  const handleDelete = async () => {
    const ok = window.confirm('Voulez-vous vraiment supprimer cet article ?');
    if (!ok) return;

    try {
      const res = await fetch(`${backendURL}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Suppression impossible');
      alert('Article supprimé');
      navigate('/articles');          // ← change ce chemin si besoin
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  /* ----------- helpers ----------- */
  const getImageUrl = img => (img?.startsWith('http') ? img : `${backendURL}/uploads/${img}`);

  if (loading)     return <div className="loader">Chargement...</div>;
  if (!product)    return <div>Aucun produit trouvé</div>;

  /* ----------- rendu ----------- */
  return (
    <div>
      <Navbar />

      <div className="detail-container">
        {/* ---------- galerie ---------- */}
        <div className="gallery-section">
          <div className="thumbnails">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt={`Thumbnail ${i + 1}`}
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="main-image-container">
            {selectedImage && (
              <Zoom>
                <img
                  src={getImageUrl(selectedImage)}
                  alt={product.title}
                  className="main-image"
                />
              </Zoom>
            )}
          </div>
        </div>

        {/* ---------- infos ---------- */}
        <div className="info-section">
          <h1>{product.title}</h1>
          <p className="description">{product.description}</p>
          <p><strong>Catégorie :</strong> {product.categorie}</p>
          <p><strong>Référence :</strong> {product.reference}</p>
          <p><strong>Marque :</strong> {product.label}</p>
          <p><strong>Prix affiché :</strong> {product.price} F CFA</p>
          <p><strong>Prix d'achat :</strong> {product.prixAchat} F CFA</p>
          <p><strong>Prix de vente :</strong> {product.prixVente} F CFA</p>
          <p><strong>Groupe :</strong> {product.groupe || 'N/A'}</p>
          <p><strong>Spécifications :</strong> {product.specifications || 'N/A'}</p>
          <p><strong>Stock :</strong> {product.stock ?? 'N/A'}</p>
          <p><strong>Disponible :</strong> {product.disponible ? 'Oui' : 'Non'}</p>
          <p><strong>Poids :</strong> {product.poids || 'N/A'}</p>
          <p><strong>Fournisseur :</strong> {product.fournisseur?.name || 'N/A'}</p>
           <p><strong>Promotion (%):</strong> {product.promotion || 'N/A'}</p>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link to={`/modifierArticle/${product._id}`}>
              <button className="btn-primary">Modifier l'article</button>
            </Link>

            {/* ---- bouton suppression ---- */}
            <button className="btn-danger" onClick={handleDelete}>
              Supprimer l'article
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailArticle;