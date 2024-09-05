import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function NavbarList() {
  return (
    <div>
        <div className='container__navbarList'>
            <div className='content__navbarList'>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-house"></i> Accueil</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-bars"></i> Articles</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-user"></i> Clients</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-list"></i> Categories</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-users"></i> Fournisseurs</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-brands fa-dashcube"></i> Traitement</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-magnifying-glass"></i> Rechercher</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i class="fa-solid fa-user"></i> Profil</NavLink>
        </div>
        </div>
    </div>
  )
}
