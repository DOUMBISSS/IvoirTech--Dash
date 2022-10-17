import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
// import {Link} from 'react-router-dom';

function details () {
            
    return (
     <div>
        <Navbar/>
        <div className='container'>
        <div className="container--header">
            <h2>Achat</h2>
          </div>
          {/* <div class="contacts">
            <i class="fa-solid fa-message"></i>
          </div> */}
          {/* <div className="card--contact">
              <div className="btn--close--card--contacts">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h5>Remplissez notre formulaires</h5>
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Noms complets</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Numéro de téléphone</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="N° de telephone"/>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Votre message</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Je suis intéressé par ...'></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
              </form>
                  <p>Aidez-nous à mieux comprendre vos besoins</p>
                          <p>Adresse : Cocody Angré 7eme Tranche / Abidjan – Plateau – 01 BP 2076 Abidjan 01</p>
                          <p>Tel : +225 07 77 88 00 82 / +225 07 89 80 08 62</p>
                          <p> E-mail : sci-mayedo@gmail.com</p>
                          <p>site web : www.sci-mayedo.com</p>
            </div> */}
              <div className="container--home">
                <div className="container--home--left--part">
                  <div className="container--home--left--part--content">
                    <div className="container--home--left--part--content--image">  
                      <div className="container--home--left--part--content--image--box">
                        <img src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt=""/>
                      </div>
                    </div> 
                    <div className="container--home--left--part--content--images">
                        <div className="images--thumbails">
                          <div className="images--thumbails--box">
                            <img src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" alt=""/>
                          </div>
                      </div>
                        <div className="images--thumbails">
                          <div className="images--thumbails--box">
                            <img src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" alt=""/>
                          </div>
                        </div>
                        <div className="images--thumbails">
                          <div className="images--thumbails--box">
                            <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" alt=""/>
                          </div>
                        </div>
                        <div className="images--thumbails">
                          <div className="images--thumbails--box">
                            <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" alt=""/>
                          </div>
                        </div>
                    </div> 
                  </div> 
                
                </div>
                <div className="container--home--right--part">
                  <div className="container--home--right--part--content">
                    <div className="container--home--left--part--content--header">
                      <p className="project">Riviera Golf 4 </p>
                      <p className="name--project">Belle Villa Meublée de 6 Pièces Golf 4 </p>
                      <p className="home--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                    </div>
                    <div className="container--home--left--part--content--description">
                      <div className="description--property">
                        <h6>Description</h6>
                        <p>Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune :</p>
                        <p>- chambre principale autonome </p>
                        <p>– salle d’eau extérieure à la seconde chambre</p>
                        <p>– toilette visiteur </p>
                        <p>– séjour staffé </p>
                        <p>– cuisine européenne </p>
                        <p>- immense terrasse et immense cour</p>
                        <p className="home--price"> à partir de <span>5500000 FCFA/mois</span></p>                
                      </div>
                        <div className="button--block">
                          <Link to="/contact"><button className="btn--buy">Nous contacter</button></Link>
                        </div>
                
                    </div> 
                
                  </div> 
                
                </div>
              </div>
              {/* <div className="container--home--second--part">
                <div className="container--header">
                  <h2>annonces les plus visités</h2>
                </div>
                <div className="container--content">
                  <div className="cards">
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
                            <p className="project">Cocody, Abidjan Golf </p>
                            <p className="name--project">Villa Moderne de 5 Pièces à la Riviera Golf ...  </p>
                            <p className="project--descrption">Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,</p>
                            <p className="home--price"> à partir de <span>119000000 FCFA/mois</span></p>
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
                            <p className="project">Grand-Bassam </p>
                            <p className="name--project">Villa Duplex Meublée de 5 Pièces à Bassam </p>
                            <p className="project--descrption">La villa est située à GRAND BASSAM ancienne route – modeste ville à 8km d’Abidjan – cité le rêve.</p>
                            <p className="home--price"> à partir de <span>119000000 FCFA/mois</span></p>
                             <button className="more--details">Voir l'annonce</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div> */}
        </div>
     </div>
    );
}

export default details;
