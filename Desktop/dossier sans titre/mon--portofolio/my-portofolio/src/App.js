import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import 'animate.css';
import About from './Pages/About';
import Services from './Pages/Services';



export default function App() {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/contact' element={<Contact/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/services' element={<Services/>}/>
  </Routes>
  );
}

