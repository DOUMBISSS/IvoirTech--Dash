import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { login } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const loginHandler = async (e) => {
    e.preventDefault();
    const dataLogin = { email, password };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(dataLogin),
      });
      const userData = await response.json();
      login(userData); // Call login function from User Context
      navigate("/persons", { state: { id: userData.id } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="assisst__header">
        <div className="assisst__header__content">
          <p><i className="fa-solid fa-phone"></i> Service assistance</p>
          <p>+225 07 77 88 00 82</p>
          <p>doumbia77fode@gmail.com</p>
          <Link to="/new__inscription" className="link__sidebar"><p>Inscription</p></Link>
        </div>
      </div>

      <div className="container__login">
        <div className='container__login__content'>
          <div className='container__login__content__header'>
            <div className='container__login__content__header__logo'>
              <img src={`${process.env.PUBLIC_URL}/lo.png`} alt='' />
            </div>
          </div>
          <h4 className="login__title">MY DASH</h4>
          <div className='login__content'>
            <div className='login__content__form'>
              <h4 className="login__title">Veuillez vous connecter svp !</h4>
              <form onSubmit={loginHandler}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                  <label htmlFor="floatingPassword">Mot de passe</label>
                </div>
                <button className='btn__login' type="submit">Connexion</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}