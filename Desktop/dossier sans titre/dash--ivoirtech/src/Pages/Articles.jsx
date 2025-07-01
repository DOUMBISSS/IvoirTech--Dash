import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../contexts/UserContext";

export default function Articles() {
  const { user } = useUserContext();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [groupe, setGroupe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      const adminId = user?._id || user?.id;
      if (!adminId) {
        toast.error("adminId manquant, veuillez vous reconnecter");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/admin/${adminId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur serveur");

        if (Array.isArray(data.admin?.products)) {
          const all = data.admin.products;
          setAllProducts(all);

          // Extraire dynamiquement les groupes
          const groupes = [...new Set(all.map(item => item.groupe).filter(Boolean))];
          setGroupe(groupes);
        } else {
          toast.error("Format des données incorrect pour les produits");
        }
      } catch (err) {
        console.error("Erreur chargement produits admin:", err);
        toast.error("Erreur lors de la récupération des produits.");
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    if (!selectedGroup) {
      setCategories([]);
      setBrands([]);
      setSelectedCategory("");
      setSelectedBrand("");
      return;
    }

    const filtered = allProducts.filter(item => item.groupe === selectedGroup);
    const cats = [...new Set(filtered.map(item => item.categorie).filter(Boolean))];
    const labs = [...new Set(filtered.map(item => item.label).filter(Boolean))];

    setCategories(cats);
    setBrands(labs);
    setSelectedCategory("");
    setSelectedBrand("");
  }, [selectedGroup, allProducts]);

  useEffect(() => {
    let filtered = [...allProducts];
    if (selectedGroup) filtered = filtered.filter(item => item.groupe === selectedGroup);
    if (selectedCategory) filtered = filtered.filter(item => item.categorie === selectedCategory);
    if (selectedBrand) filtered = filtered.filter(item => item.label === selectedBrand);
    if (search) filtered = filtered.filter(item => item.title?.toLowerCase().includes(search.toLowerCase()));

    setProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, selectedGroup, selectedCategory, selectedBrand, search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToPage = (num) => setCurrentPage(num);
  const goNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div>
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="right">
            <div className="firstly">
              <h1><i className="fa-solid fa-boxes-stacked me-2"></i> Articles</h1>
              <div className="container__mld">
                <div className="container__add__article mb-3">
                  <Link to="/addArticle">
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-plus me-2"></i> Ajouter un article
                    </button>
                  </Link>
                </div>
                <h4>Filtres</h4>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      <option value="">Groupes</option>
                      {groupe.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      disabled={!selectedGroup}
                    >
                      <option value="">Catégories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      disabled={!selectedGroup}
                    >
                      <option value="">Marques</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rechercher un article..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <table className="table table-bordered table-striped table-hover">
                  <thead className="">
                    <tr>
                      <th>Image</th>
                      <th>Référence</th>
                      <th>Désignation</th>
                      <th>Catégorie</th>
                      <th>Marque</th>
                      <th>Prix d'achat</th>
                      <th>Prix de vente</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={`http://localhost:8080/uploads/${item.img}`}
                              alt={item.title}
                              style={{ width: 60, height: 60, objectFit: "cover" }}
                            />
                          </td>
                          <td>{item.reference}</td>
                          <td>{item.title}</td>
                          <td>{item.categorie}</td>
                          <td>{item.label}</td>
                          <td>{item.prixAchat} FCFA</td>
                          <td>{item.prixVente} FCFA</td>
                          <td>
                            <Link to={`/detailArticle/${item._id}`}>
                              <button className="btn btn-sm btn-info">Détails</button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center">Aucun article trouvé.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={goPrev}>Précédent</button>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <li key={pageNum} className={`page-item ${currentPage === pageNum ? "active" : ""}`}>
                          <button className="page-link" onClick={() => goToPage(pageNum)}>{pageNum}</button>
                        </li>
                      );
                    })}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={goNext}>Suivant</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  );
}