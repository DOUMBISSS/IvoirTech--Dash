import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import 'animate.css';
import Accueil from './Pages/Accueil';
import Question from './Pages/Question';
import Details from './Pages/Details';
// import AuthMiddleware from './middlewares/AuthMiddleware';


export default function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/Accueil' element={<Accueil/>}/>
    <Route path='/question' element={<Question/>}/>
    <Route path='/details/:id' element={<Details/>}/>
  </Routes>
    </>
  );
}

