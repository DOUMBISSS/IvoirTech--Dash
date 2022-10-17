import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from './Footer';



export default function DetailsProject (){
    return(
        <div>
             <Navbar/>
             {/* <div className="container"> */}
                <div className="main--part--detail--project">
                    <div className="project--name">
                        <h2 className="title">Cité des orchidées</h2>
                        <p>Abidjan,Cote d'Ivoire</p>
                    </div>
                    <div className="detail--project--content">
                        <div className="detail--project--content--left">
                            {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-1.jpg" alt="" /> */}
                            <img src="40.jpg" alt="" />
                        </div>   
                        <div className="detail--project--content--right">
                            <div className="images--container">
                                <div className="images--container--box">
                                    {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-2.jpg" alt="" /> */}
                                    <img src="41.jpg" alt="" />
                                </div>
                            </div>
                            <div className="images--container">
                                <div className="images--container--box">
                                    {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-3.jpg" alt="" /> */}
                                    <img src="42.jpg" alt="" />
                                </div>
                            </div>
                            <div className="images--container">
                                <div className="images--container--box">
                                    {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-4.jpg" alt="" /> */}
                                    <img src="43.jpg" alt="" />
                                </div>
                            </div>
                            <div className="images--container">
                                <div className="images--container--box">
                                    {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-5.jpg" alt="" /> */}
                                    <img src="44.jpg" alt="" />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="description--project">
                            <h5>Apercu général</h5>
                            <p>Le programme de la « Cité des Orchidées » est situé en plein cœur d’Abidjan ,à Cocody Angré 7ème Tranche près du marché cocovico . Il bénéficie d’un excellent emplacement et doté d’une architecture alliant modernité et confort.</p>
                            <h5>Details concernant le projet</h5>
                            <p>- 21 appartements</p>
                            <p>- 2 commerces (Magasins)</p>
                            <p>- 800 m²</p>
                            <p>- Parking privé</p>
                            <Link className='liste' to="/contact"> <button className="btn--contact">Réservez dès maintenant</button></Link>
                        </div>
                </div>
            <Footer/>
             </div>
        // </div>
    )
}