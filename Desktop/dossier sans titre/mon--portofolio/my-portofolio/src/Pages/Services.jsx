import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function About () {
            
    return (
     <div>
       <main>
        <Navbar/>
        <div className='home--part'>  
        <div className="main__part__services">
            <h2 className='services--header'>Our Services</h2>  
        <div className="card__content">
          <div className="card">
            <i className="fas fa-bars"></i>
            <h5 className='card--title'>Web Development</h5>
            <div className="card--body">
              <p>Every website should be built with two primary goals: Firstly, it needs to work across all devices. Secondly, it needs to be fast as possible.</p>
              <button className='btn__more'>Read More</button>
            </div>
          </div>

          <div className="card">
            <i className="far fa-user"></i>
            <h5 className='card--title'>Web Development</h5>
            <div className="card--body">
              <p>Every website should be built with two primary goals: Firstly, it needs to work across all devices. Secondly, it needs to be fast as possible.</p>
              <button className='btn__more'>Read More</button>
            </div>
          </div>

          <div className="card">
            <i className="far fa-bell"></i>
            <h5 className='card--title'>Web Development</h5>
            <div className="card--body">
              <p>Every website should be built with two primary goals: Firstly, it needs to work across all devices. Secondly, it needs to be fast as possible.</p>
              <button className='btn__more'>Read More</button>
            </div>
          </div>
        </div>
            
        </div>
          </div>
         </main>
         <Footer/>
     </div>
    );
}

