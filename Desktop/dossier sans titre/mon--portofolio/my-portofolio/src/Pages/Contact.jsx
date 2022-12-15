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
          <main>
        <Navbar/>
           <div className='home--part'>
              <div className="main--contact">
              <div className='main--contact--header'>
                  <h2 className='contact--me'>Contact Me</h2>
                    <h4>Have you any questions ?</h4>
                        <h5>I'm at your service</h5>
                  </div>
                  <div className='main--contact--content'>
                      <div className='card--contact'>
                        <div className='card--contact--header'>
                        <i class="fa-solid fa-phone"></i>
                        </div>
                          <h4 className='contact--title'>Call Us</h4>
                        <h5>+225 07 77 88 00 82</h5>
                      </div>
                      <div className='card--contact'>
                      <div className='card--contact--header'>
                       <i class="fa-solid fa-location-dot"></i>
                       </div>
                       <h4 className='contact--title'>Office</h4>
                       <h5>Cocody Angré. Sicogi Rue l150</h5>
                      </div>
                      <div className='card--contact'>
                      <div className='card--contact--header'>
                        <i class="fa-solid fa-envelope"></i>
                        </div>
                        <h4 className='contact--title'>Email</h4>
                        <h5>doumbia.fode@gmail.ci</h5>
                      </div>
                      <div className='card--contact'>
                      <div className='card--contact--header'>
                        <i class="fa-solid fa-globe"></i>
                        </div>
                        <h4 className='contact--title'>Website</h4>
                        <h5>doumbisss.portfolio.com</h5>
                      </div>
                  </div>
                  <div>
                  <h2 className='contact--me'>Send me an email</h2>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="First name" aria-label="First name"/>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" placeholder="Last name" aria-label="Last name"/>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div class="d-grid gap-2 d-md-block">
                    <button class="btn btn-primary" type="button">Envoyer</button>
                  </div>
                  </div>
            </div>

          </div>
         </main>
         <Footer/>
    </div>
    );
}

