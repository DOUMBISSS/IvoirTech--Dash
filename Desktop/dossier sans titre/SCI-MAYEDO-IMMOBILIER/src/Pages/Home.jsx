// import { useState } from 'react';
import Navbar from '../Navbar';
import 'animate.css';
import Footer from '../Pages/Footer';
import '../App.css';
import Accueil from './Accueil';
import { useState } from 'react';
// import {Routes,Route,Link} from 'react-router-dom';


function Home () {
  const [display, setDisplay] = useState(false);
    return (
        <div>
        <Navbar display={display} setDisplay={setDisplay}/>
        <Accueil setDisplay={setDisplay}/>
        <Footer/>
      </div>
    )
  }

  export default Home;