import Navbar from './Navbar';
import 'animate.css';
import Footer from '../Pages/Footer';
import '../App.css';
import {Link} from 'react-router-dom';


export default function Home () {

    return (
        <div>
             <Navbar/>
          <div className='home'>
          <div className="main--part">
            <div className="slogan">
                <div className='slogan--image'>
                    <div className='slogan--image--box'>
                      <img src="3.JPG" alt="" />
                    </div>
                </div>
              <h1 className='name'>DOUMBIA <span>FODE</span></h1>
              <p>A Full Stack Developer & Informatician</p>
              <p>I'm a freelance Full Stack Developer based in Abidjan , CIV, and i'm very passionate and dedicated to my work.</p>
            <p>I also make the website more & more interactive with web animations. A responsive design makes your website accessible to all users, regardless of their device.</p>
            </div>
        </div>
          </div>
         <Footer/>
      </div>
    )
  }
