import { useNavigate } from "react-router-dom";
import { useState } from 'react';




export default function Register (){
  const [name,setName]= useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [password2,setPassword2]=useState();
  const navigate = useNavigate();


  const handleEmail =(event)=>{
      setEmail(event.target.value)
  }

  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }
  const handlePassword2 = (event)=>{
    setPassword2(event.target.value)
  }

  const handleName = (event)=>{
    setName(event.target.value)
  }

 


  const handleRegister = ()=>{
    const registerData ={
      name,
      email,
      password,
      password2
    }
    fetch('http://backdev.mayedo.ci/register',{
          method:"POST",
          headers :{'Content-Type':"application/json"},
          body: JSON.stringify(registerData)
      }).then((res)=>res.json())
       .then((userData)=>{
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(userData));
        navigate('/Accueil');
       }).catch(err => {alert(err.message)})
  }

    return (
        <div>
              <div className='login--content'>
                  <h2 className='login--content--header'>Créer mon compte</h2>
                      <form>
                      <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="floatingInput" placeholder="Name"  onChange={handleName}/>
                          <label htmlFor="floatingInput">Username</label>
                        </div>
                      <div className="form-floating mb-3">
                          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required value={email} onChange={handleEmail}/>
                          <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required value={password} onChange={handlePassword}/>
                          <label htmlFor="floatingPassword">Mot de passe </label>
                        </div>
                        <div className="form-floating ">
                          <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" required value={password2} onChange={handlePassword2}/>
                          <label htmlFor="floatingPassword">Mot de passe (confirmation)</label>
                        </div>
                          <button type="submit" className="btn btn-primary btn-block shadow" onClick={handleRegister}>Inscription</button>
                      </form>
                </div>
        </div>
    )
}