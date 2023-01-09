import { useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch  } from "react-redux";
import { AddQuestion } from "../Redux/actions";
// import { TagsInput } from "react-tag-input-component";
import Footer from "./Footer";
import Navbar from "./Navbar";





export default function Question (){
    const dispatch = useDispatch()

    const [title,setTitle]=useState();
    const [content,setContent]=useState();
    const navigate = useNavigate();
    const [categories, setCategories] = useState();


     const handleAdd = ()=>{
        const data = {
            title,
            content,
            categories
        }
        fetch('http://backdev.mayedo.ci/questions',{
            method:"POST",
            headers :{'Content-Type':"application/json"},
            body: JSON.stringify(data)
        }).then((res)=>res.json())
         .then((dataQuestion)=> dispatch(AddQuestion(dataQuestion)))    
        navigate('/Accueil')
    }

    const handleform = (event)=>{
        setTitle(event.target.value)
    }
    const handleContent = (event)=>{
        setContent(event.target.value)
    }
    const handleChange = (event)=>{
        setCategories(event.target.value)
    }


    return (

        <div>
            <Navbar/>
            <div className="container mt-4 pb-4">
                <div className="col-md-12 col-lg-8 mx-auto">
                    <nav  aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/Accueil'>Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Question</li>
                        </ol>
                    </nav>
                    <div className="bg-white shadow-md p-4 row">
                        <div className="col-12">
                            <h2 className="question__title mb-0">Poser une question</h2>
                            <span>Notre communauté de développeurs est là pour vous aider!</span>
                                </div>
                                    <form className="col-12 row" id="quizForm">
                                        <div className="col-12 form-group mt-4">
                                            <label htmlFor="title" className="questions__form-label">Titre de la question</label>
                                            <input type="text" className="form-control" id="title" name="title" onChange={handleform}/>
                                                </div>
                                                <div className="col-12 form-group">
                                                    <label htmlFor="content" className="questions__form-label">Contenu de la question</label>
                                                    <textarea name="content" id="content" cols="30" rows="10" className="form-control" onChange={handleContent}></textarea>
                                                </div>
                                                
                                                    <div className="col-12 form-group">
                                                        <label htmlFor="content" className="questions__form-label">Technologies / Categories</label>     
                                                    </div>
                                                    <select className="form-select" aria-label="Default select example" onChange={handleChange} value={categories}>
                                                        <option selected>Choisir</option>
                                                        <option value="React Js">React Js</option>
                                                        <option value="PHP">PHP</option>
                                                        <option value="Javascript">Javascript</option>
                                                        <option value="MongoDB">MongoDB</option>
                                                        <option value="Nosql">Nosql</option>
                                                        <option value="Java">Java</option>
                                                        <option value="C++">C++</option>
                                                        <option value="C">C</option>
                                                        <option value="C">Python</option>
                                                        <option value="Ruby">Ruby</option>
                                                    </select>

                                                <div className="col-12 form-group">
                                                    <button type="submit" className="btn btn-primary d-block shadow-md w-100 btn-lg" onClick={handleAdd}>Poser ma question <i className="fa-solid fa-arrow-right"></i></button>
                                                </div>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                                <Footer/>
        </div>
    )
}