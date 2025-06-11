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
import Traitement from './Pages/Traitement';
import Clients from './Pages/Clients'
import AddArticles from './Pages/AddArticles';
import Fournisseurs from './Pages/Fournissseurs';
import Articles from './Pages/Articles'
import Categories from './Pages/Categories';
import SearchPage from './Pages/SearchPage';
import DetailCommande from './Pages/DetailCommande';
import DetailClient from './Pages/DetailClient';
import DetailFournisseur from './Pages/DetailFournisseur';
import Stock from './Pages/Stock';
import UpdateArticleStock from './Pages/UpdateArticleStock';
import Transformer from './Pages/Transformer';
import Devis from './Pages/Devis';
import Bon_cmd from './Pages/Bon_cmd';
import Bon_liv from './Pages/Bon_liv';
import AddClient from './Pages/AddClient';
import DetailArticle from './Pages/DetailArticle';



export default function App() {
  return (
    <UserProvider>
      {/* <Navbar/> */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Accueil' element={<Accueil/>}/>
    <Route path='/persons' element={<Persons/>}/>
    <Route path='/traitement' element={<Traitement/>}/>
    <Route path='/clients' element={<Clients/>}/>
    <Route path='/addArticle' element={<AddArticles/>}/>
    <Route path='/nos--fournisseurs' element={<Fournisseurs/>}/>
    <Route path='/articles' element={<Articles/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/searchArticle' element={<SearchPage/>}/>
    <Route path='/detailCommande' element={<DetailCommande/>}/>
    <Route path='/detailClient' element={<DetailClient/>}/>
    <Route path='/detailFournisseur' element={<DetailFournisseur/>}/>
    <Route path='/stocks' element={<Stock/>}/>
    <Route path='/updateArticleStock' element={<UpdateArticleStock/>}/>
    <Route path='/trasnformer' element={<Transformer/>}/>
    <Route path='/devis' element={<Devis/>}/>
    <Route path='/bon-de-commande' element={<Bon_cmd/>}/>
    <Route path='/bon-de-livraison' element={<Bon_liv/>}/>
    <Route path='/Ajouter/new/client' element={<AddClient/>}/>
    <Route path='/detailArticle' element={<DetailArticle/>}/>
   

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  <ToastContainer position="top-right" autoClose={3001} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false}  pauseOnFocusLoss draggable  pauseOnHover theme="light"  />
  </UserProvider>
  );
}

