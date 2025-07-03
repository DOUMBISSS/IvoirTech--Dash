import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ModifierProfil() {
  const { user, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    surnom: "",
    email: "",
    numero: "",
    adresse: "",
    password: "",
    confirmPassword: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoDeleted, setPhotoDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || "",
        prenom: user.prenom || "",
        surnom: user.surnom || "",
        email: user.email || "",
        numero: user.numero || "",
        adresse: user.adresse || "",
        password: "",
        confirmPassword: "",
      });
      setPhotoPreview(user.photo ? `https://ivoirtech-innov.onrender.com${user.photo}` : null);
      setPhotoFile(null);
      setPhotoDeleted(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoDeleted(false);
    }
  };

  const handleDeletePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoDeleted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    try {
      const data = new FormData();
      // On n’envoie pas l’email car non modifiable
      ["nom", "prenom", "surnom", "numero", "adresse", "password", "confirmPassword"].forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      if (photoFile) {
        data.append("photo", photoFile);
      } else if (photoDeleted) {
        // Supprimer photo côté backend
        data.append("photo", "");
      }

      const res = await axios.put(`https://ivoirtech-innov.onrender.com/admin/${user.id}`, data);

      toast.success("Profil mis à jour avec succès !");
      setUser(res.data);

      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setPhotoDeleted(false);
      setPhotoFile(null);
      setPhotoPreview(res.data.photo ? `https://ivoirtech-innov.onrender.com${res.data.photo}` : null);

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profil-page">
        <h2>Modifier mon Profil</h2>
        <form className="profil-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Prénom</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Surnom</label>
            <input type="text" name="surnom" value={formData.surnom} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} disabled />
          </div>

          <div className="form-group">
            <label>Numéro</label>
            <input type="tel" name="numero" value={formData.numero} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Laisser vide pour ne pas changer"/>
          </div>

          <div className="form-group">
            <label>Confirmer mot de passe</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmer le nouveau mot de passe" />
          </div>

          <div className="form-group">
            <label>Photo de profil</label>
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview" className="user-avatar" />
                <button type="button" onClick={handleDeletePhoto} className="btn-delete-photo">
                  Supprimer la photo
                </button>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          <button type="submit" className="btn-save">
            Enregistrer les modifications
          </button>
        </form>
        <ToastContainer position="top-right" />
      </div>
      <Footer />
    </>
  );
}