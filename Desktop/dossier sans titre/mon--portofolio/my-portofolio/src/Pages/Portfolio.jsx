import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Portfolio () {
            
    return (
     <div>
       <main>
        <Navbar/>
        <div className='home--part'>  
        <div className="main__part__portfolio">
            <h2 className='services--header'>My Portfolio</h2>
            <h3 className='last__project'>My Last Project : </h3>  
                <div className="card__content__block">
                <div class="cards">
                   <Link> <img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div> 

                <div class="cards">
                <Link><img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div>
                <div class="cards">
                <Link><img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div>
                <div class="cards">
                <Link><img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div>
                <div class="cards">
                <Link><img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div>
                <div class="cards">
                <Link><img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" class="card-img-top" alt="..."/></Link>
                </div>       
                </div>
                
            
        </div>
          </div>
         </main>
         <Footer/>
     </div>
    );
}

