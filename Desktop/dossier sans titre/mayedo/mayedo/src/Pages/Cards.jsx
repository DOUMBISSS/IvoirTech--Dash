
export default function Cards (){
    return (
        <div>
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
                       <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
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
                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
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
                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
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
                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
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
                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
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
                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
                      </div>
                  </div>
                </div>
              </div>

              <div>
              
              
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
     <div className="navbar--logo">
      <Link to="/"> <img src="18.png" alt=""/></Link>
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link className='liste'aria-current="page" to="/">Accueil</Link>
        </li>
        <li class="nav-item">
         <Link className='liste' to="/vente">Vente</Link>
        </li>
        <li class="nav-item">
            <Link className='liste' to="/acheter">Acheter</Link>
        </li>
        <li class="nav-item">
            <Link className='liste' to="/louer">Louer</Link>
        </li>
        <li class="nav-item">
            <Link className='liste' to="/contact">Contacts</Link>
        </li>
        <li class="nav-item">
        <Link className='liste' to="/propos">A propos</Link>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
              </div>
        </div>
    )
}