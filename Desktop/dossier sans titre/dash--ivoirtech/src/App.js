import './App.css';
import {Routes,Route} from 'react-router-dom';
import 'animate.css';
import './chartConfig';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './Pages/NotFoundPage';
import { UserProvider } from './contexts/UserContext';
import Traitement from './Pages/Traitement';
import Clients from './Pages/Clients'
import AddArticles from './Pages/AddArticles';
import Fournisseurs from './Pages/Fournissseurs';
import Articles from './Pages/Articles'
import DetailCommande from './Pages/DetailCommande';
import DetailClient from './Pages/DetailClient';
import DetailFournisseur from './Pages/DetailFournisseur';
import DetailArticle from './Pages/DetailArticle';
import ModifierFournisseur from './Pages/ModifierFournisseur';
import AjouterFournisseur from './Pages/AjouterFournisseur';
import Dashboard from './Pages/Dashboard';
import ModifierArticle from './Pages/ModifierArticle';
import Profil from './Pages/Profil';
import ModifierProfil from './Pages/ModifierProfil';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';



export default function App() {
  return (
    <UserProvider>
      {/* <Navbar/> */}
    <Routes>
    <Route path='/' element={ <PublicRoute><Home/> </PublicRoute> }/>
    <Route path='/traitement' element={<PrivateRoute><Traitement/></PrivateRoute>}/>
    <Route path='/clients' element={<PrivateRoute><Clients/></PrivateRoute>}/>
    <Route path='/addArticle' element={<PrivateRoute><AddArticles/></PrivateRoute>}/>
    <Route path='/nos--fournisseurs' element={<PrivateRoute><Fournisseurs/></PrivateRoute>}/>
    <Route path='/articles' element={  <PrivateRoute><Articles/>  </PrivateRoute>}/>
    <Route path='/detailCommande/:id' element={<PrivateRoute><DetailCommande/></PrivateRoute>}/>
    <Route path='/detailClient/:id' element={<PrivateRoute><DetailClient/></PrivateRoute>}/>
    <Route path='/detailFournisseur/:id' element={<PrivateRoute><DetailFournisseur/></PrivateRoute>}/>
    <Route path='/detailArticle/:id' element={<PrivateRoute><DetailArticle/></PrivateRoute>}/>
   {/* ` <Route path='/Mes--statistiques' element={<Statistiques/>}/>` */}
    <Route path="/modifierFournisseur/:id" element={<PrivateRoute><ModifierFournisseur /></PrivateRoute>} />
    <Route path="/ajouterFournisseur" element={<PrivateRoute><AjouterFournisseur /></PrivateRoute>} />
    <Route path="/Mes--statistiques" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/modifierArticle/:id" element={<PrivateRoute><ModifierArticle/></PrivateRoute>} />
     <Route path="/Mon--profil" element={<PrivateRoute><Profil/> </PrivateRoute>} />
     <Route path="/modifier-profil/:id" element={<PrivateRoute><ModifierProfil /></PrivateRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  <ToastContainer position="top-right" autoClose={3001} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false}  pauseOnFocusLoss draggable  pauseOnHover theme="light"  />
  </UserProvider>
  );
}

