import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
import Footer from './Footer';
import Filter from './Filter';
import { useSelector } from 'react-redux';

function Acheter () {
            
  const rentHomes = useSelector(state =>state.rentHomeReducer.rentHomes);
    return (
     <div>
        <Navbar/>
        <div className='container'>
        <div className="container--header">
                <h2>ACHETER</h2>
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
                {/* <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-23-at-13.18.16-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                          <p className="project">Riviera Golf 4 </p>
                          <p className="name--project">Belle Villa Meublée de 6 Pièces Golf 4 </p>
                          <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                          <p className="home--price"> à partir de <span>5500000 FCFA/mois</span></p>
                       <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>

                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-13-at-11.44.48-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>

                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-06-22-at-15.48.25-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>

                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.26.05-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>
                
                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.24.51-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>

                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-15-at-11.04.35-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                        <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details"><Link to="/details" >Voir l'annonce</Link></button>
                      </div>
                  </div>
                </div>
                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.26.05-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>
                
                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.24.51-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                      <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details">Voir l'annonce</button>
                      </div>
                  </div>
                </div>

                <div className="cards">
                  <div className="cards--box">
                      <div className="cards--box--header">
                        <img src="https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-15-at-11.04.35-525x328.jpeg" alt=""/>
                      </div>
                      <div className="cards--box--content">
                        <p className="project">Cocody , Abidjan , Golf 4</p>
                        <p className="name--project">Villa Triplex de 8 Pièces au Golf 4 Jaques</p>
                        <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                        <p className="home--price"> à partir de <span>119000000 FCFA</span></p>
                      <button className="more--details"><Link to="/details" >Voir l'annonce</Link></button>
                      </div>
                  </div>
                </div> */}
              </div>

        </div>
        <Footer/>
     </div>
    );
}

export default Acheter;
