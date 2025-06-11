import React from 'react';
import Footer from '../Pages/Footer';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

export default function Presentation  () {
            
    return (
    <div>
        <Navbar />
        <div className='container'>
              <div className='container--presentation--mb'>
                <div className='container--presentation--left'>
                    <h5 className='present--header'>Présentation de </h5>
                    <h3 className='present--title'>PurePro Cleaners</h3>

                    <p className='desc'><strong>PurePro Cleaners</strong> est une société de nettoyage 
                      professionnelle spécialisée dans la prestation de services de nettoyage de qualité pour les entreprises,
                       les institutions et les particuliers en Côte d'Ivoire. Forts de notre engagement envers l'excellence, 
                       nous offrons une gamme complète de services de nettoyage pour répondre aux besoins divers de nos clients. </p>

                       <p className='desc'>Chez <strong>PurePro Cleaners</strong>, nous croyons en la responsabilité environnementale. Nous utilisons exclusivement des 
                        produits de nettoyage écologiques certifiés et nous mettons en œuvre des pratiques durables pour minimiser 
                        notre empreinte environnementale.</p>

                        <p className='desc'>Notre équipe est composée de professionnels du nettoyage formés et expérimentés. Nous nous assurons que 
                        notre personnel respecte des normes élevées d'éthique professionnelle, de fiabilité et de discrétion.</p>

                        <p className='desc'><strong>Portée des Services : </strong> Notre portefeuille de services couvre une gamme complète de besoins de nettoyage. Que ce soit pour des bureaux d'entreprise, 
                        des espaces commerciaux, des installations industrielles, ou des résidences privées, PurePro Cleaners propose des solutions sur mesure.</p>

                        <p className='desc'><strong>Flexibilité et Personnalisation : </strong>
                        Nous comprenons que chaque client a des besoins uniques. 
                        C'est pourquoi nous offrons une flexibilité totale dans la 
                        fréquence des services et personnalisons nos offres pour répondre aux exigences spécifiques de chaque projet.
                        </p>

                        <p className='desc'> <strong> Assurance et Responsabilité : </strong>
                        Votre tranquillité d'esprit est notre priorité. <strong>PurePro Cleaners</strong> est entièrement assuré, et nous assumons toute responsabilité envers nos clients. Votre confiance est notre plus grande récompense.
                        </p>

                        <p className='desc'> <strong>Engagement envers la durabilité : </strong>
                        <strong>PurePro Cleaners</strong> est dédié à la durabilité environnementale. Nous utilisons des produits de nettoyage écologiques et 
                            adoptons des pratiques respectueuses de l'environnement dans toutes nos opérations.
                            </p>

                   <p className='desc'> <strong>Personnel qualifié : </strong>
                            Notre équipe est composée de professionnels du nettoyage formés et expérimentés. 
                            Nous nous assurons que notre personnel respecte des normes élevées d'éthique professionnelle, 
                            de fiabilité et de discrétion.
                            </p>

                            <p className='desc'> <strong>Approche personnalisée : </strong>
                            Nous comprenons que chaque client a des besoins spécifiques. Notre approche est donc personnalisée,
                             adaptée aux exigences uniques de chaque projet ou contrat. 
                             Nous collaborons étroitement avec nos clients pour garantir leur satisfaction.
                             </p>


                        <Link to="/Nos__prestations"><button className='btn__link__services'>Nos services <i class="fa-solid fa-arrow-right"></i> </button></Link>
                </div>
                <div className='container--presentation--right'>
                    <div className='container--presentation--right--box'>
                    <img src={`${process.env.PUBLIC_URL}/log.jpg`} alt=""/>
                    </div>
                </div>
              </div>

          </div>
        <Footer/>
    </div>
    );
}
