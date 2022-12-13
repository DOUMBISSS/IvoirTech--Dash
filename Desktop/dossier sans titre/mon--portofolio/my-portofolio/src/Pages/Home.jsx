import Navbar from './Navbar';
import 'animate.css';
import Footer from '../Pages/Footer';
import '../App.css';
import {Link} from 'react-router-dom';


export default function Home () {

    return (
        <div>
         <main>
        <Navbar/>
           <div className='home--part'>
          <div className="main--part">
            <div className="slogan">
                <div className='slogan--image'>
                    <div className='slogan--image--box'>
                      <img src="3.JPG" alt="" />
                    </div>
                </div>
              <h1>DOUMBIA <span>FODE</span></h1>
              <p>A Full Stack Developer & Informatician</p>
            </div>
        </div>

          </div>
         </main>
         <Footer/>
      </div>
    )
  }
