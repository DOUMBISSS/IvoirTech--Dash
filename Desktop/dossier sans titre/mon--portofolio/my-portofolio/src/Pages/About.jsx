import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function About () {
            
    return (
      <div>
        <Navbar/>
        <div className='home'>  
        <div className="description--author">
          <div className="description--enterprise--content--left">
            <h1 className="name--author">About Me</h1>
            <p> My name is Doumbia Fode. I'm a freelance Full Stack Developer based in Abidjan , CIV, and i'm very passionate and dedicated to my work.</p>
            <p>I also make the website more & more interactive with web animations.A responsive design makes your website accessible to all users, regardless of their device.</p>
              
          </div>
            <div className="description--enterprise--content--right">
                <div className='images'>
                <img src="2.jpg" alt="" />
                </div>
            </div>
        </div>
          </div>
         <Footer/>
      </div>
    );
}

