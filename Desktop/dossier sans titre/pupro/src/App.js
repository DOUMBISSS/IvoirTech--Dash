import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Accueil from "./Pages/Accueil"
import Presentation from "./Pages/Presentation";
import Contact from "./Pages/Contact";
import Info from "./Pages/Info";
import Devis from "./Pages/Devis";
import Prestations from "./Pages/Prestations";
import DetailPrestations from "./Pages/DetailPrestations";


function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<Accueil />} />
          <Route path="/contactez--nous" element={<Contact />} />
          <Route path="/Notre--actualité" element={<Info />} />
          <Route path="/Nos__prestations" element={<Prestations />} />
          <Route path="/obtenir_devis" element={<Devis />} />
          <Route path="/Qui--sommes-nous" element={<Presentation />} />
          <Route path="/detail__Prestation/:id" element={<DetailPrestations />} />
        </Routes>
      </div>
  );
}

export default App;
