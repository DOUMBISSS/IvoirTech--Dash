import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Profil() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (!user) return <p>Chargement...</p>;
  

  return (
    <>
      <Navbar />
      <div className="profil-page">
        <h2>Mon Profil</h2>
        <div className="profil-details">
          {user.photo && (
            <div className="photo-preview">
              <img
                src={`http://localhost:8080${user.photo}`}
                alt="Photo de profil"
                className="user-avatar-2"
              />
            </div>
          )}

          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Prénom :</strong> {user.prenom}</p>
          <p><strong>Surnom :</strong> {user.surnom || "—"}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Numéro :</strong> {user.numero || "—"}</p>
          <p><strong>Adresse :</strong> {user.adresse || "—"}</p>

          <button className="btn-save" onClick={() => navigate(`/modifier-profil/${user.id}`)}>
            Modifier mon profil
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}