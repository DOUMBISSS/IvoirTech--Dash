import React from 'react';
import Footer from '../Pages/Footer';
import Navbar from './Navbar';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

export default function Contact () {

  // const [number,setNumber]=useState();
  // const [name,setName]=useState();
  // const [email,setEmail]=useState();
  // const [content,setContent]=useState();
  // const navigate = useNavigate()
  // const dispatch = useDispatch();

  // const SubmitForm = (event)=>{
  //   const data={
  //     name,
  //     email,
  //     number,
  //     content,
  //   }
  //   fetch('http://127.0.0.1:4000/email',{
  //     method:"POST",
  //     headers :{'Content-Type':"application/json"},
  //     body:JSON.stringify(data)
  //   })
  //   .then(res=>res.json())
  //   .then(dataForm=>dispatch(getUser(dataForm)))
  //   setName(" ");
  //   setEmail(" ");
  //   setContent(" ");
  //   setNumber(" ");
  //   navigate('/')
  // }
            
    return (
    <div>
        <Navbar />
        <div className="container">
          <div className="main--contact">
            <h4>Remplissez notre formulaire de contact</h4>
            <div className="main--contact--content">
                <div className="main--contact--content--left">
                  {/* <form onSubmit={SubmitForm}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Noms & Prénoms</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
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
                  </form> */}
                </div>
                <div className="main--contact--content--right">
                  <p>Aidez-nous à mieux comprendre vos besoins</p>
                  <p>Adresse : Cocody Angré 7eme Tranche / Abidjan – Plateau – 01 BP 2076 Abidjan 01</p>
                  <p>Tel : +225 07 77 88 00 82</p>
                  <p> E-mail : sci@mayedo.ci</p>
                  <p>site web : www.mayedo.ci</p>
                </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
    );
}

