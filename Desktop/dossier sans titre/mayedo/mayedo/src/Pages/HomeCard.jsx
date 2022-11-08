// // import { useDispatch } from 'react-redux';
// import {Link} from 'react-router-dom';
// // import { getHomes } from '../Redux/actions';


// export default function homeCard ({home}) {
        
//     return (

//             <div>
//                   <div className="cards--box">
//                       <div className="cards--box--header">
//                         <img src={home.img} alt=""/>
//                       </div>
//                       <div className="cards--box--content">
//                           <p className="project">{home.project}</p>
//                           <p className="name--project">{home.name}</p>
//                           <p className="project--descrption">{home.description}</p>
//                           <p className="home--price"> à partir de <span>{home.prices} FCFA/mois</span></p>
//                        <Link to="/details"><button className="more--details">Voir l'annonce</button></Link>
//                       </div>
//                   </div>
//                 </div>
//     );
// }