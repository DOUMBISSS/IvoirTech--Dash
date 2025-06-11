import React from 'react';
// import Footer from '../Pages/Footer';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

export default function Footer  () {
            
    return (
      <div className='footer'>
          <div className='right'>
            <p>Copyright © 2024,PurePro Cleaners </p>
            </div>
          <div className="foot--content">
              <div className='schedule'>
                <h4 className='footer__title'>Horaire d'ouverture</h4>
                  <p>Lundi-Vendredi : 8h-16h</p>
                  <p>Samedi : 9h-12h</p>
              </div>
              
              <div className='address'>
                <h4 className='footer__title'>Contactez-nous</h4>
                <p><i className="fa-solid fa-location-dot"></i> Cocody Angré</p>
                <p><i className="fa-solid fa-phone"></i> +225 05 75 49 64 57</p>
                <p><i className="fa-solid fa-envelope"></i> info@pureprocleaners.ci</p>
                <p><i className="fa-solid fa-globe"></i> www.pureproleaners.ci</p>
                
              </div>

              <div className='social--media'>
                <h4 className='footer__title'>Réseaux sociaux</h4>
                  <Link className='footer--link' to='https://www.facebook.com/profile.php?id=61555186775624&mibextid=PlNXYD'><p><i className="fa-brands fa-facebook"></i>Facebook</p></Link>
                  <Link className='footer--link' to='https://www.instagram.com/purepro_cleaners?igsh=eDdodXlqMm1hd2N6&utm_source=qr'><p><i className="fa-brands fa-instagram"></i>Instagram</p></Link>
                  <Link className='footer--link' to='https://wa.me/+2250575496457'><p><i className="fa-brands fa-whatsapp"></i>WhatsApp</p></Link>
                  <Link className='footer--link' to='https://www.tiktok.com/@purepro.cleaners?_t=8iwaY9ayEw1&_r=1'><p><i class="fa-brands fa-tiktok"></i> Tiktok</p></Link>
              </div>
          </div>

           <div className='name--developer'>
            <p>Developed by Doumbia Fode (+225 0777880082)</p>
           </div>
      </div>
    );
}
