import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nom: '',
    prenom: '',
    surnom: '',
    email: '',
    password: '',
    numero: '',
    adresse: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ivoirtech-innov.onrender.com/login", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result?.admin?._id) {
        login({
          ...result.admin,
          id: result.admin._id, // 🔐 Assure la clé `id`
          token: result.token
        });

        toast.success("Connexion réussie !");
        navigate("/articles");
      } else {
        toast.error(result.message || "Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Erreur serveur");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(registerData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await fetch("https://ivoirtech-innov.onrender.com/admin/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Inscription réussie !");
        setActiveTab("login");
        setRegisterData({
          nom: '',
          prenom: '',
          surnom: '',
          email: '',
          password: '',
          numero: '',
          adresse: '',
          photo: null,
        });
        setPhotoPreview(null);
      } else {
        toast.error(data.message || "Erreur d'inscription");
      }
    } catch (error) {
      console.error("Erreur inscription :", error);
      toast.error("Erreur serveur");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setRegisterData({ ...registerData, photo: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <img src={`${process.env.PUBLIC_URL}/logo df.png`} alt="Logo" style={styles.logo} />
        </div>

        <div style={styles.tabButtons}>
          <button
            style={activeTab === "login" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("login")}
          >
            Connexion
          </button>
          <button
            style={activeTab === "register" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("register")}
          >
            Inscription
          </button>
        </div>

        {activeTab === "login" && (
          <>
            <h2 style={styles.title}>Connexion Admin</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Se connecter</button>
            </form>
          </>
        )}

        {activeTab === "register" && (
          <>
            <h2 style={styles.title}>Inscription Admin</h2>
            <form onSubmit={handleRegister} style={styles.form}>
              {["nom", "prenom", "surnom", "numero", "adresse", "email", "password"].map((field) => (
                <div key={field} style={styles.formGroup}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={registerData[field]}
                    onChange={(e) => setRegisterData({ ...registerData, [field]: e.target.value })}
                    required={field !== "surnom"}
                    style={styles.input}
                  />
                </div>
              ))}
              <div style={styles.formGroup}>
                <label>Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={styles.input} />
              </div>
              {photoPreview && (
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <img src={photoPreview} alt="Aperçu" style={{ width: "100px", borderRadius: "4px" }} />
                </div>
              )}
              <button type="submit" style={styles.submitBtn}>S'inscrire</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    width: "400px",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  logoContainer: { marginBottom: "1rem" },
  logo: { width: "100px" },
  tabButtons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
    gap: "1rem",
  },
  tab: {
    flex: 1,
    padding: "0.5rem 0",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    color: "#555",
  },
  activeTab: {
    flex: 1,
    padding: "0.5rem 0",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    color: "#fff",
  },
  title: { marginBottom: "0.25rem" },
  form: { textAlign: "left" },
  formGroup: { marginBottom: "1rem" },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};