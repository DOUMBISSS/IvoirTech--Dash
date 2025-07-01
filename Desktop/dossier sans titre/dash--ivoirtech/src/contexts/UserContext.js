import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Erreur lecture localStorage:", err);
      return null;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(300); // 300s = 5 minutes
  const [warned, setWarned] = useState(false);

  // Synchroniser l'utilisateur dans localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    if (!userData || !userData._id) {
      console.error("ID utilisateur manquant !");
      return;
    }

    const userWithSession = {
      ...userData,
      id: userData._id,
      loginTime: Date.now(),
    };

    setUser(userWithSession);
    localStorage.setItem("user", JSON.stringify(userWithSession));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowModal(false);
    setCountdown(300);
    setWarned(false);
  };

  const clearUser = () => logout();

  // Vérifie régulièrement l’expiration de session
  useEffect(() => {
    const sessionDuration = 60 * 60 * 1000; // 1 heure
    const warningBefore = 60 * 1000; // 1 minute
    // const warningBefore = 5 * 60 * 1000; // 5 minutes

    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      try {
        const parsed = JSON.parse(storedUser);
        const loginTime = parsed.loginTime || 0;
        const elapsed = Date.now() - loginTime;

        if (
          elapsed >= sessionDuration - warningBefore &&
          elapsed < sessionDuration &&
          !warned
        ) {
          setShowModal(true);
          setCountdown(Math.floor((sessionDuration - elapsed) / 1000));
          setWarned(true);
        }

        if (elapsed >= sessionDuration) {
          logout();
        }
      } catch (e) {
        console.error("Erreur durant le suivi de session :", e);
        logout();
      }
    };

    const interval = setInterval(checkSession, 1000); // vérif toutes les secondes
    return () => clearInterval(interval);
  }, [warned]);

  // Gère le décompte du modal
  useEffect(() => {
    if (!showModal) return;

    if (countdown <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, showModal]);

  const renewSession = () => {
    const refreshedUser = { ...user, loginTime: Date.now() };
    setUser(refreshedUser);
    localStorage.setItem("user", JSON.stringify(refreshedUser));
    setShowModal(false);
    setCountdown(300);
    setWarned(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, clearUser }}>
      {children}

      {showModal && (
        <div className="session-modal-overlay">
          <div className="session-modal">
            <h3>⏰ Session expirant dans {countdown}s</h3>
            <p>Votre session est sur le point d’expirer. Voulez-vous rester connecté ?</p>
            <div className="session-modal-actions">
              <button onClick={renewSession} className="session-btn success">Rester connecté</button>
              <button onClick={logout} className="session-btn danger">Se déconnecter</button>
            </div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext doit être utilisé dans un UserProvider");
  return context;
}