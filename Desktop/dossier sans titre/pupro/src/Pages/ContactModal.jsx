import React, { useEffect, useState } from 'react';
import Footer from '../Pages/Footer';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { getUser } from '../Redux/actions';

export default function ContactModal ({contactModal,setcontactModal}) {

  
  const [number,setNumber]=useState();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [content,setContent]=useState();
//   const [display,setDisplay]=useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleDisplay = ()=>{
    setcontactModal(false)
  }

  const SubmitForm = (event)=>{
    const data={
      name,
      email,
      number,
      content,
    }
    fetch('https://back-purepro.onrender.com/email',{
      method:"POST",
      headers :{'Content-Type':"application/json"},
      body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(dataForm=>dispatch(getUser(dataForm)))
    setName(" ");
    setEmail(" ");
    setContent(" ");
    setNumber(" ");
    navigate('/')
  }

//   useEffect(()=>{
//     setName(person.name);
//     setPre(person.prenom);
//     // setMontant(person.home.rent);
//     setAddresse(person.address)
// }, [person])


            
    return (
    <div>
        <div className={contactModal ? "contact__modal open__contact__modal" : "contact__modal"}>
        <div className="content__contact__modals">
            <div className='container__modal__header'>
                <div>
                <h1 className=''>Contactez-nous</h1>
                <h5 className=''>Remplissez notre formulaire de contact</h5>
                </div>
                <i className="fa-solid fa-xmark" onClick={handleDisplay}></i>
            </div>
            <div className="">
                  <form onSubmit={SubmitForm}>
                    {/* <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Noms & Prénoms</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div> */}
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Numéro de téléphone</label>
                      <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Numero de telephone" value={number} onChange={(e) => setNumber(e.target.value)}/>
                    </div>
                    {/* <select class="form-select form-select-sm" aria-label="Small select example">
                      <option selected>Choisir</option>
                      <option value="1">Société</option>
                      <option value="2">Particulier</option>
                    </select> */}
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Votre message</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                  </form>
            
            </div>
        </div>
        </div>
    </div>
    );
}
