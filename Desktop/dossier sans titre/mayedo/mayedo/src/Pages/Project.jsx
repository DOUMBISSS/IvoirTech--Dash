import { Link } from "react-router-dom";




export default function Project (){
    return (
            <div>
                <div className="main--part--project">
                    <div className="main--part--project--left--part">
                        <div className="project--pictures">
                                {/* <div className="project--pictures--box">
                                    <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-1.jpg" alt="" />
                                </div> */}
                                <div className="project--pictures--box">
                                    {/* <img src="https://www.addoha.ci/images/projects/cite-des-orchidees-1.jpg" alt="" /> */}
                                    <img src="40.jpg" alt="" />
                                </div>
                        </div>
                    </div>
                    <div className="main--part--project--right--part">
                            <div className="main--part--project--right--part--content">
                                <h5>Nos projets</h5>
                                <p>Vous êtes invités à parcourir nos dernières offres</p>
                                <Link to='/detail'><button className="btn--details">Voir</button></Link>
                            </div>
                    </div>
                </div>
            </div>
    );
}