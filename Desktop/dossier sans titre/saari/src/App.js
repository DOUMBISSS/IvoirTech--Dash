import './App.css';
import {Routes,Route} from 'react-router-dom';
import 'animate.css';
import Accueil from './Pages/Accueil';
import Home from './Pages/Home';
// import DetailPerson from './Pages/DetailPerson';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './Pages/NotFoundPage';
import { UserProvider } from './contexts/UserContext';
import Persons from './Pages/Persons';



export default function App() {
  return (
    <UserProvider>
      {/* <Navbar/> */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Accueil' element={<Accueil/>}/>
    <Route path='/persons' element={<Persons/>}/>
    {/* <Route path='/detailPerson/:id' element={<DetailPerson/>}/> */}
   

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  <ToastContainer position="top-right" autoClose={3001} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false}  pauseOnFocusLoss draggable  pauseOnHover theme="light"  />
  </UserProvider>
  );
}

