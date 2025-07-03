import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);
  const prevNotifCount = useRef(0);
  const audioRef = useRef(null);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    let interval;
    const fetchNotifications = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`https://ivoirtech-innov.onrender.com/commandes?adminId=${user._id}`);
        const data = await res.json();
        const commandesAtraiter = data.filter(c =>
          c.status === 'en attente' || c.status === 'à livrer'
        );
        const newCount = commandesAtraiter.length;

        // Détection d'une nouvelle commande
        if (newCount > prevNotifCount.current) {
          toast.info("🆕 Nouvelle commande à traiter !");
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio error", e));
          }
        }

        prevNotifCount.current = newCount;
        setNotifCount(newCount);
      } catch (err) {
        console.error("Erreur notification commandes :", err);
      }
    };

    fetchNotifications();
    interval = setInterval(fetchNotifications, 300000); // toutes les 60 sec --5min(300 000)

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="navbar-global">
      <header className="navbar-top">
        <div className="navbar-left">
          <Link to="/accueil">
            <img
              src={`${process.env.PUBLIC_URL}/logo df.png`}
              alt="Logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        <div className="navbar-center">
          <h2 className="navbar-title"> D&F Manager</h2>
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="navbar-user-info">
              <img
                src={
                  user.photo
                    ? `https://ivoirtech-innov.onrender.com${user.photo}`
                    : "https://i.pravatar.cc/40?img=3"
                }
                alt="profil"
                className="user-avatar"
              />
              <span className="username">
                {user.nom || user.email || "Utilisateur"}
              </span>

              <Link to="/Mon--profil" className="btn-profil">
                <i className="fa-solid fa-user-circle"></i> Profil
              </Link>

              <button onClick={logoutHandler} className="btn-logout">
                <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
              </button>
            </div>
          ) : (
            <Link to="/" className="btn-login">Login</Link>
          )}
        </div>
      </header>

      {/* Menu Navigation Principal */}
      <nav className="navbar-menu">
        <NavLink to="/articles" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fa-solid fa-building"></i> Structures
        </NavLink>

        <NavLink to="/traitement" className={({ isActive }) => isActive ? 'active notification-link' : 'notification-link'}>
          <i className="fa-solid fa-cart-shopping"></i> Mes Commandes
          {notifCount > 0 && (
            <span className="notif-badge">{notifCount}</span>
          )}
        </NavLink>

        <NavLink to="/clients" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fa-solid fa-users"></i> Clients
        </NavLink>

        <NavLink to="/nos--fournisseurs" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fa-solid fa-truck"></i> Fournisseurs
        </NavLink>

        <NavLink to="/Mes--statistiques" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fa-solid fa-chart-line"></i> Statistiques
        </NavLink>
      </nav>

      <audio ref={audioRef} src="/notification.mp3" preload="auto" />

      <ToastContainer position="top-right" />
      
      <style jsx="true">{`
        .notification-link {
          position: relative;
        }

        .notif-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background-color: red;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.75rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}