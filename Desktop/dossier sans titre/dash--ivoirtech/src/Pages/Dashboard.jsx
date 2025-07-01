import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import debounce from 'lodash.debounce';

const moisOptions = [
  { value: '01', label: 'Janvier' }, { value: '02', label: 'Février' }, { value: '03', label: 'Mars' },
  { value: '04', label: 'Avril' }, { value: '05', label: 'Mai' }, { value: '06', label: 'Juin' },
  { value: '07', label: 'Juillet' }, { value: '08', label: 'Août' }, { value: '09', label: 'Septembre' },
  { value: '10', label: 'Octobre' }, { value: '11', label: 'Novembre' }, { value: '12', label: 'Décembre' }
];

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

export default function Dashboard() {
  const { user, clearUser } = useUserContext();
  const navigate = useNavigate();

  const [mode, setMode] = useState('client');
  const [statsFournisseur, setStatsFournisseur] = useState(null);
  const [statsClient, setStatsClient] = useState(null);
  const [statsProduits, setStatsProduits] = useState(null);
  const [periode, setPeriode] = useState('tout');
  const [mois, setMois] = useState('');
  const [annee, setAnnee] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

useEffect(() => {
  if (!user) {
    navigate('/');
    return;
  }
  console.log(user._id)
  const fetchStats = async () => {
    try {
      let params = new URLSearchParams();
      const adminId = user?._id || user?.id;
      params.append('adminId', adminId);
      params.append('periode', periode);

      if (periode === 'mois') {
        if (mois) params.append('mois', mois);
        if (annee) params.append('annee', annee);
      } else if (periode === 'annee') {
        if (annee) params.append('annee', annee);
      } else if (periode === 'personnalise') {
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
      }

      if (mode === 'client') {
        const resC = await fetch(`http://localhost:8080/commandes/statistiques?${params}`);
        const dataC = await resC.json();
        setStatsClient(dataC);
        setStatsFournisseur(null);
        setStatsProduits(null);
      } else if (mode === 'fournisseur') {
        const resF = await fetch(`http://localhost:8080/fournisseurs/statistiques?${params}`);
        const dataF = await resF.json();
        setStatsFournisseur(dataF);
        setStatsClient(null);
        setStatsProduits(null);
      } else if (mode === 'produits') {
        const resP = await fetch(`http://localhost:8080/produits/statistiques?${params}`);
        const dataP = await resP.json();
        setStatsProduits(dataP);
        setStatsClient(null);
        setStatsFournisseur(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchStats();
}, [user, navigate, periode, mois, annee, startDate, endDate, mode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, mode]);

  const logoutHandler = () => {
    clearUser();
    navigate('/login');
  };

  // FILTRES CLIENTS
  const filteredCommandes = useMemo(() => {
    const commandes = statsClient?.commandes ?? [];
    if (!searchTerm) return commandes;
    return commandes.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [statsClient, searchTerm]);

  const totalClientPages = Math.ceil(filteredCommandes.length / itemsPerPage);
  const commandesPage = filteredCommandes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

 const filteredLivraisons = useMemo(() => {
  const livraisons = statsFournisseur?.fournisseursLivraisons ?? [];

  if (!searchTerm) return livraisons;

  return livraisons.filter(livraison =>
    livraison.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [statsFournisseur, searchTerm]);
const totalFournisseurPages = Math.ceil(filteredLivraisons.length / itemsPerPage);
const fournisseursPage = filteredLivraisons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportClients = () => {
    const exportData = filteredCommandes.map(cmd => ({
      Client: cmd.name, Adresse: cmd.address, Téléphone: cmd.number,
      Date: new Date(cmd.createdAt).toLocaleDateString(),
      Total: cmd.totalAmount + ' FCFA', Statut: cmd.status
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");
    XLSX.writeFile(wb, "export_commandes.xlsx");
  };

  const handleExportFournisseurs = () => {
    const ws = XLSX.utils.json_to_sheet(filteredLivraisons);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Livraisons");
    XLSX.writeFile(wb, "export_livraisons.xlsx");
  };

  if (!statsFournisseur && !statsClient && !statsProduits) return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div className="loader"></div>
      <p>Chargement des statistiques...</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Navbar logoutHandler={logoutHandler} />

      <div style={{ padding: 30 }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>📊 Dashboard Statistiques</h1>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button onClick={() => setMode('client')} style={{ ...modeBtnStyle, backgroundColor: mode === 'client' ? '#3498db' : '#bdc3c7' }}>👥 Clients</button>
          <button onClick={() => setMode('fournisseur')} style={{ ...modeBtnStyle, backgroundColor: mode === 'fournisseur' ? '#3498db' : '#bdc3c7' }}>🏭 Fournisseurs</button>
          <button onClick={() => setMode('produits')} style={{ ...modeBtnStyle, backgroundColor: mode === 'produits' ? '#3498db' : '#bdc3c7' }}>📦 Produits</button>
        </div>

        {/* ---- MODE CLIENT ---- */}
        {mode === 'client' && statsClient && (
          <>
            <h2 style={{ color: '#34495e' }}>👥 Statistiques Clients</h2>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 30 }}>
              <Card title="Commandes" value={statsClient.totalCommandes} color="#9b59b6" />
              <Card title="Total Ventes" value={Number(statsClient.totalVentes || 0).toLocaleString() + ' FCFA'} color="#1abc9c" />
              <Card title="Clients" value={statsClient.totalClients} color="#e67e22" />
            </div>

            <h3>📅 Historique des Commandes</h3>
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <input type="text" placeholder="Rechercher un client..." onChange={debounce(e => setSearchTerm(e.target.value), 300)} style={inputSearchStyle} />
              <button onClick={handleExportClients} style={exportBtnStyle}>Exporter Commandes</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead style={theadStyle}><tr><th>Client</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead>
                <tbody>
                  {commandesPage.map((row, i) => (
                    <tr key={i} style={tbodyRowStyle}>
                      <td>{row.name}</td>
                      <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                      <td>{Number(row.totalAmount || 0).toLocaleString()} FCFA</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalClientPages} setCurrentPage={setCurrentPage} />
          </>
        )}

        {/* ---- MODE FOURNISSEUR ---- */}
       {mode === 'fournisseur' && statsFournisseur && (
  <>
    <h2 style={{ color: '#34495e' }}>🛒 Statistiques Fournisseurs</h2>
    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 30 }}>
      <Card title="Fournisseurs" value={statsFournisseur.totalFournisseurs} color="#3498db" />
      <Card title="Produits livrés" value={statsFournisseur.totalProduitsLivres} color="#2ecc71" />
      <Card title="CA estimé" value={(statsFournisseur.totalCA?.toLocaleString() ?? 0) + ' FCFA'} color="#e67e22" />
    </div>

    <h3>📦 Historique des Livraisons</h3>
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Rechercher un fournisseur..."
        onChange={debounce(e => setSearchTerm(e.target.value), 300)}
        style={inputSearchStyle}
      />
      <button onClick={handleExportFournisseurs} style={exportBtnStyle}>
        Exporter Livraisons
      </button>
    </div>

    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th>Fournisseur</th>
            <th>Date de livraison</th>
          </tr>
        </thead>
        <tbody>
          {fournisseursPage.map((row, i) => (
            <tr key={i} style={tbodyRowStyle}>
              <td>{row.fournisseurNom}</td>
              <td>{row.dateLivraison}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalFournisseurPages}
      setCurrentPage={setCurrentPage}
    />
  </>
)}

{mode === 'produits' && statsProduits && (() => {
  const produits = statsProduits.produitsDetails ?? [];
  let produitPlusVendu = null;
  if (produits.length > 0) {
    produitPlusVendu = produits.reduce((max, prod) => {
      return (prod.quantiteVendue > (max?.quantiteVendue ?? 0)) ? prod : max;
    }, null);
  }

  const totalCAProduits = produits.reduce((sum, p) => sum + (p.quantiteVendue * p.prixUnitaire), 0);

  const filteredProduits = produits.filter(prod =>
    prod.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProduitPages = Math.ceil(filteredProduits.length / itemsPerPage);
  const produitsPage = filteredProduits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <h2 style={{ color: '#34495e' }}>📦 Statistiques Produits</h2>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 30 }}>
        <Card title="Produits Disponibles" value={statsProduits.totalProduits ?? 0} color="#8e44ad" />
        <Card title="Produits Vendus" value={statsProduits.totalProduitsVendus ?? 0} color="#27ae60" />
        <Card title="Chiffre d'affaires" value={totalCAProduits.toLocaleString() + ' FCFA'} color="#d35400" />
        <Card title="Top Vente" value={produitPlusVendu ? `${produitPlusVendu.nom} (${produitPlusVendu.quantiteVendue})` : 'Aucun'} color="#f39c12" />
      </div>

      <h3>📋 Détails des Produits</h3>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          onChange={debounce(e => setSearchTerm(e.target.value), 300)}
          style={inputSearchStyle}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead style={theadStyle}><tr><th>Produit</th><th>Quantité Vendue</th><th>Prix Unitaire</th><th>Total Ventes</th></tr></thead>
          <tbody>
            {produitsPage.map((prod, i) => (
              <tr key={i} style={tbodyRowStyle}>
                <td>{prod.nom}</td>
                <td>{prod.quantiteVendue}</td>
                <td>{prod.prixUnitaire.toLocaleString()} FCFA</td>
                <td>{(prod.quantiteVendue * prod.prixUnitaire).toLocaleString()} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalProduitPages} setCurrentPage={setCurrentPage} />
    </>
  );
})()}

      </div>

      <Footer />
    </div>
  );
}

// Pagination réutilisable
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div style={{ marginTop: 20, textAlign: 'center' }}>
    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>◀</button>
    <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>▶</button>
  </div>
);

const Card = ({ title, value, color }) => (
  <div style={{ backgroundColor: color, padding: 20, borderRadius: 10, color: '#fff', minWidth: 200, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
    <h3>{title}</h3>
    <h2>{value}</h2>
  </div>
);

// Styles inchangés
const inputSearchStyle = { padding: '12px', width: '50%', borderRadius: '8px', border: '1px solid #ccc' };
const exportBtnStyle = { padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '6px', marginBottom: '20px', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px' };
const theadStyle = { backgroundColor: '#3498db', color: '#fff', textAlign: 'left', padding: '15px' };
const tbodyRowStyle = { borderBottom: '1px solid #eee', padding: '12px' };
const modeBtnStyle = { padding: '10px 20px', margin: '5px', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };