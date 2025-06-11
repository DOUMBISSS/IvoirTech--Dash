import React, { useState } from 'react';
import Footer from '../Pages/Footer';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import ContactModal from './ContactModal';
import { useDispatch, useSelector } from 'react-redux';

export default function Prestations  () {
   const [contactModal,setcontactModal]=useState("")

   const handleContactModal = ()=>{
      setcontactModal(true)
  }
//   const dispatch = useDispatch();
  const prestations = useSelector(state =>state.prestationReducer.prestations);
            
    return (
    <div>
        <Navbar />
        <div className="container">
        <div className='section--business--content'>
        <h3 className='section--oportunity--title'>Nos offres de prestations </h3>
          {/* <div className='section--business--header'>
          <img src={`${process.env.PUBLIC_URL}/mains-tenant-outils-solutions-nettoyage.jpg`} alt=""/>
          <h3 className='section--oportunity--title'>Nos offres de prestations </h3>
            </div> */}
            <ContactModal contactModal={contactModal} setcontactModal={setcontactModal}/>
              <div className='section__business__presentation'>

               
                {prestations.map((prestation) =>  <div className='prestations__cards'>
                 <div className='business__cards__images'>
                 <Link to={`/detail__Prestation/${prestation.id}`}><img src={prestation.img} alt="" /></Link>
                 </div>
                 <h3 className='business__cards__title'>{prestation.name}</h3>
                 {/* <ul>
                    <li>Nettoyage fenetres/stores/murs</li>
                    <li>Nettoyage complet cuisine/chambres</li>
                    <li>Nettoyage meubles/locaux</li>
                    <li>Nettoyages des surfaces/dépoussierage</li>
                 </ul> */}
                 <p>A partir de <strong className='prestations__price'> {prestation.prices}</strong></p>
                 <Link to={`/detail__Prestation/${prestation.id}`}><button className='btn__contact'> Details</button></Link>
                </div>              
                )}
              </div>

          </div>
        </div>
        <Footer/>
    </div>
    );
}