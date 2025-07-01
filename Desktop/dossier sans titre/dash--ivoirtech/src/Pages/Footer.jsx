import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-schedule">
          <div className="footer__logo">
            <img src={`${process.env.PUBLIC_URL}/logo df.png`} alt="Logo SCI MAYEDO" />
          </div>
          <div className="footer__schedule">
            <h4 className="footer__title">Horaire d'ouverture</h4>
            <p>Lundi - Vendredi : 8h - 16h</p>
            <p>Samedi : 9h - 12h</p>
          </div>
        </div>

        <div className="footer__contacts-socials">
          <div className="footer__contacts">
            <h4 className="footer__title">Contactez-nous</h4>
            <p><i className="fa-solid fa-location-dot"></i> Cocody Angré 7eme Tranche / Abidjan – Plateau – 01 BP 2076 Abidjan 01</p>
            <p><i className="fa-solid fa-phone"></i> +225 07 77 88 00 82</p>
            <p><i className="fa-solid fa-envelope"></i> D&F@Manager.ci</p>
            <p><i className="fa-solid fa-globe"></i> www.D&F Manager.ci</p>
          </div>

          <div className="footer__social-media">
            <h4 className="footer__title">Réseaux sociaux</h4>
            <p><i className="fa-brands fa-facebook"></i> Facebook</p>
            <p><i className="fa-brands fa-instagram"></i> Instagram</p>
            <p><i className="fa-brands fa-whatsapp"></i> WhatsApp</p>
            <p><i className="fa-brands fa-tiktok"></i> TikTok</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 D&F Manager — Developed by Doumbia Fode (+225 0777880082)</p>
      </div>
    </footer>
  );
}

export default Footer;