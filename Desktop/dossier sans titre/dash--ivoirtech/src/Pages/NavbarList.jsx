import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function NavbarList() {
  return (
    <div>
        <div className='container__navbarList'>
            <div className='content__navbarList'>
        <NavLink  to="/accueil" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-house"></i> Accueil</NavLink>
        <NavLink  to="/articles" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-house"></i> Structures</NavLink>
        {/* <NavLink  to="/articles" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-bars"></i> Articles</NavLink> */}
        {/* <NavLink  to="/clients" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-user"></i> Clients</NavLink> */}
        {/* <NavLink  to="/stocks" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-store"></i> Mon stock</NavLink> */}
        {/* <NavLink  to="/nos--fournisseurs" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-users"></i> Fournisseurs</NavLink> */}
        <NavLink  to="/traitement" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-brands fa-dashcube"></i> Mes Commandes</NavLink>
        <NavLink  to="/searchArticle" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-magnifying-glass"></i> Rechercher</NavLink>
        <NavLink  to="/" className={({ isActive }) => isActive ? 'active' : ''}><i class="fa-solid fa-user"></i> Profil</NavLink>
        </div>
        </div>
    </div>
  )
}
