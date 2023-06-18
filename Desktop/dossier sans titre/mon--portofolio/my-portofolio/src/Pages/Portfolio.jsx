import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Portfolio () {
            
    return (
     <div>
     <Navbar/>
       <div className='home'>
        <div className='home--part'>  
        <div className="main__part__portfolio">
            <h2 className='services--header'>My Portfolio</h2>
            <h3 className='last__project'>My Projects : </h3>  
                <div className="card__content__block">
                <div class="cards">
                   <Link> <img src={`${process.env.PUBLIC_URL}/deli.png`} alt=""/></Link>
                </div> 

                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/easy.png`} alt=""/></Link>
                </div>
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/mayedo.png`} alt=""/></Link>
                </div>
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/apfa.png`} alt=""/></Link>
                </div>
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/miami.png`} alt=""/></Link>
                </div>
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/dev.png`} alt=""/></Link>
                </div> 
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/Netflix.png`} alt=""/></Link>
                </div>  
                <div class="cards">
                    <Link> <img src={`${process.env.PUBLIC_URL}/lmc.png`} alt=""/></Link>
                </div>     
                </div>
                
            
        </div>
          </div>
         </div>
         <Footer/>
     </div>
    );
}

