import React, { useState } from 'react';
import Footer from '../Pages/Footer';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { getUser } from '../Redux/actions';

export default function Contact () {

  
  const [number,setNumber]=useState();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [content,setContent]=useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();

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
            
    return (
    <div>
        <Navbar />
        <div className="main--contact">
            <h1 className='header__contact'>Contactez-nous</h1>
            <h5 className='header__contact'>Remplissez notre formulaire de contact</h5>
            <div className="main--contact--content">
                <div className="main--contact--content--left">
                  <div className='form__container'>
                  <form onSubmit={SubmitForm}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Noms & Prénoms</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Numéro de téléphone</label>
                      <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Numero de telephone" value={number} onChange={(e) => setNumber(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Votre message</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                  </form>
                  </div>
                </div>
                <div className="main--contact--content--right">
                    <div className='main--contact--content--right--box'>
                    <p>Aidez-nous à mieux comprendre vos besoins</p>
                  <p>Adresse : Cocody Angré</p>
                  <p>Tel : +225 07 77 88 00 82</p>
                  <p> E-mail : info@pureprocleaners.ci</p>
                  <p>Site web : www.pureprocleaners.ci</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
}

