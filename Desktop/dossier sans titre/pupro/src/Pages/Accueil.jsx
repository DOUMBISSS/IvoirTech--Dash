import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import 'animate.css';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from "react-fast-marquee";
import Footer from './Footer';

export default function Accueil () {
  const offres = useSelector(state =>state.prestationReducer.offres);
    const dispatch = useDispatch()
  const [display,setDisplay]= useState(false);
  

  const [cart,setCart]= useState(false);

  const closeCart = ()=> {
    setCart (false)
}
const showCart =()=>{
    setCart (true)
}
  // const newArrivages = useSelector(state=>state.categoryReducer.newArrivages);
  // const newsProducts = useSelector(state=>state.categoryReducer.newsProducts);
  // const carts = useSelector(state => state.cartReducer.carts);

    //   useEffect(()=>{
    //     localStorage.setItem("carts",JSON.stringify(carts));
    // })

    return (
      <div>
                <Marquee className="marquee" speed={80}>
                        -20% sur votre première commande avec le code promo DOUM2023
                 </Marquee>

               <Navbar/>
            <div className='main--part--container'>
              <div className='main--part--container--image'>
                {/* <img src="@.jpg" alt="" /> */}
                <img src={`${process.env.PUBLIC_URL}/@.jpg`} alt=""/>
              </div>
            </div>
            <div className='container'>
              <div className='container--presentation'>
                <div className='container--presentation--left'>
                    <h5 className='present--header'>Présentation de </h5>
                    <h3 className='present--title'>PurePro Cleaners</h3>
                    <p> <strong>PurePro Cleaners</strong> est une société de nettoyage 
                      professionnelle spécialisée dans la prestation de services de nettoyage de qualité pour les entreprises,
                       les institutions et les particuliers en Côte d'Ivoire. Forts de notre engagement envers l'excellence, 
                       nous offrons une gamme complète de services de nettoyage pour répondre aux besoins divers de nos clients. </p>

                       <p>Chez <strong>PurePro Cleaners</strong>, nous croyons en la responsabilité environnementale. Nous utilisons exclusivement des 
                        produits de nettoyage écologiques certifiés et nous mettons en œuvre des pratiques durables pour minimiser 
                        notre empreinte environnementale.</p>

                      <p>Notre équipe est composée de professionnels du nettoyage formés et expérimentés. Nous nous assurons que 
                        notre personnel respecte des normes élevées d'éthique professionnelle, de fiabilité et de discrétion.</p>

                        <Link to="/Qui--sommes-nous"><button className='btn__link__services'>Details <i className="fa-solid fa-arrow-right"></i> </button></Link>
                </div>
                <div className='container--presentation--right'>
                    <div className='container--presentation--right--box'>
                        <img src="https://img.freepik.com/photos-gratuite/homme-nettoyant-balustrade-chiffon_23-2149345526.jpg?t=st=1711639453~exp=1711643053~hmac=61b91c19d32e580470fae24d9181f39e5af71458f164c916894bb196e9ee1d03&w=900" alt="" />
                    </div>
                </div>
              </div>

          </div>

          <div className='section--business'>
            <h2 className='business--header'>Quelques offres de nos prestations </h2>
              <div className='section__business__container'>
              {offres.map((offre) =>  <div className='prestations__cards'>
                 <div className='business__cards__images'>
                 <Link to={`/detail__Prestation/${offre.id}`}><img src={offre.img} alt="" /></Link>
                 </div>
                 <h3 className='business__cards__title'>{offre.name}</h3>
                 {/* <ul>
                    <li>Nettoyage fenetres/stores/murs</li>
                    <li>Nettoyage complet cuisine/chambres</li>
                    <li>Nettoyage meubles/locaux</li>
                    <li>Nettoyages des surfaces/dépoussierage</li>
                 </ul> */}
                 <p>A partir de <strong className='prestations__price'> {offre.prices}</strong></p>
                 <Link to={`/detail__Prestation/${offre.id}`}><button className='btn__contact'> Details</button></Link>
                </div>              
                )}

              </div>
              {/* <div className='btn__section'>
               <Link to='/Nos__prestations'> <button className='btn__section__details'> Voir plus <i className="fa-solid fa-arrow-right"></i> </button></Link>
              </div> */}

          </div>
          <div className="question--part">
            <div className="question--part--content">
             <h3 className='question'>À la recherche d'un service de nettoyage, nous proposons différent services !!</h3>
            <div className="question--part--btn">
             <Link className='liste' to="/contactez--nous"> 
              <button className="btn--contact">Contactez-nous !</button>
             </Link>
            </div>
            </div>
        </div>

          {/* <div className='part__newsletter'>
            <div className='part__newsletter__content'>
              <h3 className='news__header'>Ne manquez pas nos excellentes offres & Recevez des offres de tous nos meilleurs par e-mail !</h3>
                <div className='news__container'>
                      <div className='news__container__content'>
                      <div className="news__container__input">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Sélectionnez votre ville</option>
                      <option value="1">Abidjan</option>
                    </select>
                    </div>
                    <div class="form-floating col-md-7">
                      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                      <label for="floatingInput">Addresse email</label>
                    </div>
                      <button className='btn__newsletter'>Abonnez-vous à la newsletter</button>
                      </div>
                </div>
            </div>
          </div>  */}
          <Footer/>
        </div>

    );
}

