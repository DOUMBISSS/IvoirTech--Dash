import { useState } from "react";
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { getPerson, getRent } from "../Redux/actions";
import { useReactToPrint } from "react-to-print";
import { Blocks } from "react-loader-spinner";
import PaiementModal from "./PaiementModal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DeleteModal from "./DeleteModal";
import DeletePerson from "./DeletePerson";
import UpdateRent from "./UpdateRent"


export default function DetailUser(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const person = useSelector(state => state.peopleReducer.person);
    const rental = useSelector(state => state.peopleReducer.rental);
    
    const [loading, setLoading] = useState(true);
    const [pay, setPay] = useState(false);
    const [del, setDel] = useState(false);
    // const [modalUpdate, setModalUpdate] = useState(false);
    const [delPerson, setDelPerson] = useState(false);
    const [selectedRentalId, setSelectedRentalId] = useState(null);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    // const [selectedRentalUpdate, setSelectedRentalUpdate] = useState(null);


    // Fetch person data
    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await fetch(`http://localhost:4000/persons/${id}`);
                const personData = await response.json();
                dispatch(getPerson(personData));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPerson();
    }, [id, dispatch]);

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const response = await fetch(`http://localhost:4000/rents/${id}`);
                // Check if the response is okay
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const rentalData = await response.json();
                dispatch(getRent(rentalData));
            } catch (error) {
                console.error("Failed to fetch rental data:", error);
                // // Optionally show a toast notification
                // toast.error("Failed to fetch rental data. Please try again.");
            }
        };
        fetchRental();
    }, [id, dispatch]);

    // Notify on successful deletion
    const notify = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handleUpdate = (rentId) => {
        navigate(`/updateRent/${rentId}`);
      };


      const handleDelete = (rentalId) => {
        setSelectedRentalId(rentalId);
        setDel(true);
    };

    const confirmDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/deleteRent/${selectedRentalId}`, {
                method: "DELETE",
                headers: { 'Content-Type': "application/json" },
            });
            if (response.ok) {
                toast.success("Loyer supprimé avec succès!");
                toast.success("Veuillez actualiser la page svp !!!"); 
                navigate(`/detailPerson/${id}`);
            } else {
                console.error("Failed to delete rental");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDel(false);
        }
    };

    const confirmDeletePerson = async () => {
        try {
            const response = await fetch(`http://localhost:4000/deletePerson/${selectedPersonId}`, {
                method: "DELETE",
                headers: { 'Content-Type': "application/json" },
            });
            if (response.ok) {
                toast.success("Locataire supprimé avec succès!");
                navigate('/persons'); // Redirect after deletion
            } else {
                console.error("Failed to delete person");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDelPerson(false); // Close delete confirmation modal
        }
    };

    const handleDeletePerson = (personId) => {
        setSelectedPersonId(personId);
        setDelPerson(true); // Show delete modal
    };

    // const handleUpdate = (rentalId) => {
    //     setModalUpdate(true);
    //     setSelectedRentalUpdate(rentalId); // Assuming you manage selected rental ID in state
    // };


      const componentRef =useRef();
      const handlePrint =useReactToPrint({
        content:()=> componentRef.current,
        // documentTitle: person.name +' '+person.prenom,
        onAfterPrint:()=> alert('Print successful')
      })
    //   const event = new Date('1975, August 19');

    const formatDate = (dateString) => {
        if (!dateString) return ''; // Return an empty string or a default value if the dateString is undefined
        const dateParts = dateString.split('-');
        if (dateParts.length !== 3) return ''; // Additional check to ensure the date string is in the correct format
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
        <Navbar/>
        <div className="containers">
            <div className="dashboard">
                        <div className="left">        
                           <Sidebar/>
                            
                        </div>
                        <div className="right">
                  
                   {loading ? ( <Blocks height="80" width="100%" display='flex' align-items='center'color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true}/>
                                    ) :(     <div className="firstly">
                       <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to='/Accueil'>Home</Link></li>
                                    <li class="breadcrumb-item " aria-current="page"><Link to='/persons'>Locataires</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Details du profil</li>
                                </ol>
                            </nav>
                        <PaiementModal pay={pay} setPay={setPay}/>
                        <DeleteModal del={del} setDel={setDel} confirmDelete={confirmDelete} />
                        <DeletePerson delPerson={delPerson}  setDelPerson={setDelPerson} confirmDeletePerson={confirmDeletePerson}/>
                       <div className='container__detail__user'>
            <div className="main__part__detail__people" >
                <div className='btn__close__block'>
                    <Link to='/persons'><button className='btn__back'><i class="fa-solid fa-arrow-left"></i></button></Link>
                    <div className="block--btn--header">
                    <button className="btn__delete__profil" onClick={() => handleDeletePerson(person._id)}><i className="fa-solid fa-trash"></i> Supprimer le profil</button>
                      <Link to={`/UpdatePerson/${person._id}`}><button className="btn__update"><i class="fa-solid fa-pen-to-square"></i> Mettre à jour le profil</button></Link>
                    </div>
                </div>
                <div className="title__detail">
                        <h1><i>Profil</i></h1>
                </div>
                             <div className="main__part__detail__header">
                                <div key={person.id} className="part__detail__person__detail">
                                <div className="detail--person">
                                    <p>Nom : {person.name}</p>
                                    <p>Prénom : {person.prenom}</p>
                                    <p>Né(e) : {formatDate(person.birth)}</p>
                                    <p>Nationnalité : {person.nationality}</p> 
                                    <p>Tel : {person.tel}</p>
                                    <p>Sexe : {person.sexe}</p>
                                    <p>Email: {person.email}</p>
                                    </div>
                                    <div className="detail--person">
                                    <p>Profession: {person.profession}</p>
                                    <p>Domicile : {person.address}</p>
                                    <p>Date d'entrée: {formatDate(person.date_entrance)}</p>
                                    <p>Nº CNI ou PAS : {person.piece}</p>
                                    <p>Date d'emission: {formatDate(person.date_emission)}</p>
                                    <p>Date d'expiration: {formatDate(person.date_expiration)}</p>
                                    {/* {person.home_id?.map((home,_id) => 
                                                <p>Loyer mensuel : {home.rent} FCFA</p>
                                                    )} */}
                                  
                                    </div>
                                    <div className="part__home__detail__container">
                                        <h6 className="ml__header">Detail maison </h6>
                                    <div className="part__home__detail__content">
                                {person.home_id?.map((home,_id) => <div className="home__content">
                                            <div className="home__content__left">
                                                <div className="home__image">
                                                {home.imageUrl.map((url, index) => (
                                                <img key={index} src={`http://localhost:4000${url}`} alt={`Home ${index}`} className="home-image" />
                                            ))}
                                                </div>

                                            </div>
                                            <div className="home__content__right">
                                                 <div>
                                                <p>Bien occupé : {home.categorie} </p>
                                                {/* <p>Nombres : {home.nombres}</p> */}
                                                <p>Addresse : {home.addressHome}</p>
                                                <p>Superficie : {home.superficie}</p>
                                                <p>Loyer mensuel : {home.rent} FCFA</p>
                                                <p>Caution : {home.guarantee} FCFA</p>
                                                 </div>
                                            </div>

                                        </div>                                        )}
                                </div>
                                    </div>
                                   
                                    {/* <div className="detail--person">
                                    <p>Maison : {person.house}</p>
                                    </div> */}
                                </div>

                            </div>
                        </div> 
                    </div>  
                    <div className="container">
                        <div className="paiement__block">
                                        <h1><i>Details des paiements</i></h1>
                                        <div className="paiement__block_right">
                                        <Link to={`/paiementDetail/${person._id}`}><button className="btn__all">Voir les paiements {'>>'}</button></Link>
                                        <Link to={`/paiement/${person._id}`}><button className="btn__add"> <i class="fa-solid fa-money-check"></i> Ajouter un paiement</button></Link>
                                       {/* <button className="btn__pay" onClick={Payment}> <i class="fa-solid fa-money-check"></i> Ajouter un paiement</button> */}
                                        {/* <button className="button__pdf" onClick={handlePrint}>Télécharger PDF</button> */}
                                        </div>
                                    </div>
                                    <div ref={componentRef} style={{width:'100%',height:window.innerHeight}}>

                                <table class="table">
                                <thead>
                                    <tr>
                                    <th className="coler">Heure de paiement</th>
                                    <th className="coler">Date de paiement</th>
                                    <th className="coler">Mois</th>
                                    <th className="coler">Montants</th>
                                    <th className="coler">Statut</th>
                                    <th className="coler">Mode</th>
                                    <th className="coler">Action</th>
                                    <th className="coler">Imprimer</th>
                                    </tr>
                                </thead>
                                <tbody  class="table-group-divider">
                                    {person.rentals?.map((rental,_id) => { return ( <tr key={rental._id}>
                                    <td className="coles">{rental.time}</td>
                                    <td className="coles">{formatDate(rental.date_of_payment)}</td>
                                    <td className="coles">{new Date(rental.month).toLocaleString('default', { month: 'long' })} </td>
                                    {person.home_id?.map((home,_id) => <td className="coles">{home.rent} FCFA</td> )}
                                    <td className="coles">{rental.status}</td>
                                    <td className="coles">{rental.mode}</td>
                                    <td className="coles">
                                        <div id="td__action">
                                        <i onClick={() => handleDelete(rental._id)} className="fa-solid fa-trash" id='trash'></i>
                                       <i onClick={() => handleUpdate(rental._id)} id='square' className="fa-solid fa-pen-to-square"></i>
                                        </div>
                                    </td>
                                    <td className="coles"><Link to={`/receipt/${rental._id}`}><i className="fa-solid fa-print"></i></Link></td>
                                    
                                    </tr>)}
                                    ).slice(-15)}
                                </tbody>
                                </table>
                               </div>  
                               </div>                        
                           </div>
                                    )}
                       </div>
                   </div>
                   <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
  
    </div>
    <Footer/>
   </div>
    )
}