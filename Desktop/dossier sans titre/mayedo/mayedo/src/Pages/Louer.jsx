import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar';
import Filter from './Filter';
import Footer from './Footer';

function Louer () {
  const rentHomes = useSelector(state =>state.rentHomeReducer.rentHomes);
    return (
    <div>
        <Navbar />
        <div className='container'>
              <div className="container--header">
                <h2>LOCATIONS</h2>
                <p>Grâce à notre maîtrise de la cartographie Abidjanaise et les connexions solides que nous avons tissés avec les partenaires du secteur depuis plusieurs années 
                  (Agences immobilières, Promoteurs, Notaires, Agents d’affaires),
                   nous recherchons pour vous les biens les plus en adéquation avec vos critères de sélection et vous accompagnons dans la réalisation de toutes les formalités. </p>
              </div>
              <Filter/>
              <div className="container--content">
              {rentHomes.map((rentHome) =>
                <div key={rentHome.id} className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src={rentHome.img} alt=""/>
                      </div>
                      <div className="cards--box--content">
                          <p className="project">{rentHome.project}</p>
                          <p className="name--project">{rentHome.name}</p>
                          <p className="project--descrption">{rentHome.description}</p>
                          <p className="home--price"> à partir de <span>{rentHome.prices} FCFA/mois</span></p>
                       <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
                      </div>
                  </div>
                </div>
                )};
              </div>

        </div>
        <Footer/>
    </div>
    );
}

export default Louer;