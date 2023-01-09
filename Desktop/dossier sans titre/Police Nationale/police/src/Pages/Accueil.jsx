import Navbar from "./Navbar";
import {Link} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { useState ,useEffect } from "react";
import {getAllQuestions } from "../Redux/actions";
import Footer from "./Footer";


export default function Accueil (){

    const questions = useSelector(state=>state.questionReducer.questions);
    const [searchQuestion, setSearchQuestion] = useState();
    // const todayDate = new Date(Date.now()).toISOString().slice(0, 10);
    const dispatch = useDispatch();
    const handleSearch = (e)=>{
        setSearchQuestion(e.target.value);
      }




    return (
        <div>
            <Navbar setSearchQuestion={setSearchQuestion} searchQuestion={searchQuestion}/>
            <div className="main--header--part">
                <div className="d-flex justify-content-center align-items-center h-100 flex-column">
                    <div className="container banner__container">
                        <h1>Bienvenue sur la DGPN</h1>
                    </div>
                </div>
        </div>
        <div className="container">
        <div className="row">
                <div className="col-lg-4 col-md-12">
                            <div className="left--part">
                                <div className="filter__part">
                                <h5>Rechercher</h5>
                                <div class="form-floating mb-3 d-flex">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Saisissez le nom"/>
                                        <label for="floatingInput">Noms complets</label>
                                        <button className="btn__search">Recherche</button>
                                </div>
                                </div>

                                <div className="filter__part">
                                <div class="form-floating mb-3 d-flex">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Saisissez le nom"/>
                                        <label for="floatingInput">Matricule Vehicule</label>
                                        <button className="btn__search">Recherche</button>
                                </div>
                                </div>

                                <div className="filter__part">
                                <div class="form-floating mb-3 d-flex">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Saisissez le nom"/>
                                        <label for="floatingInput">Numero de pièce CNI</label>
                                        <button className="btn__search">Recherche</button>
                                </div>
                                </div>

                                <div className="filter__part">
                                <div class="form-floating mb-3 d-flex">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Saisissez le nom"/>
                                        <label for="floatingInput">Numero Passeport</label>
                                        <button className="btn__search">Recherche</button>
                                </div>
                                </div>
                            </div>

                            <div className="col-3 col-md-12">
                            
                            </div>
                        </div>
                <div className="col-lg-8 col-md-12">
                        <div className="main__part__detail">
                            <div className="main__part__detail__header">
                                <div className="part__detail__person__image">
                                    <div className="part__detail__person__image__box" >
                                            <img src="logo192.png" alt="" />
                                    </div>

                                </div>
                                <div className="part__detail__person__detail">
                                <div className="detail--person">
                                    <p>Nom : DOUMBIA</p>
                                    <p>Prenom : FODE</p>
                                    <p>Né(e) : 16/05/1999</p>
                                    <p>Nationnalité : Ivoirienne</p>
                                    </div>
                                    <div className="detail--person">
                                    <p>Celibataire</p>
                                    <p>Profession: Etudiant</p>
                                    <p>Domicile : COCODY ANGRE</p>
                                    <p>Num CNI : CNI000000000</p>
                                    </div>

                                    <div className="detail--person">
                                    <p>Tel : +225 00000000</p>
                                    <p>Email: email@gmail.com</p>
                                    <p>Ps de conduite: 00000000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="main__part__detail__body">
                            <div className="doc">
                                    <div class="white_card card_height_100 mb_30 QA_section">
                                        <div class="white_card_header">
                                        <div class="box_header m-0">
                                        <div class="main-title">
                                        <h4 class="m-0">Antécédent(s)</h4>
                                        </div>
                                        </div>
                                        </div>
                                        <div class="white_card_body">
                                        <div class="QA_table table-responsive ">

                                        <table class="table pt-0">
                                        <thead>
                                        <tr>
                                        <th scope="col">Activity Type</th>
                                        {/* <th scope="col">Owner</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Budget</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Period</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Deadline</th>
                                        <th scope="col">Attachment</th> */}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_1.png" alt="" /> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        {/* <td>Oct</td> */}
                                        {/* <td>Send</td> */}
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt="" /> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_2.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        {/* <td>Oct</td> */}
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt=""/> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_3.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        {/* <td>Oct</td> */}
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt=""/> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_5.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        {/* <td>Oct</td> */}
                                        <td><img class="check_status" src="img/invoice_img/close.png" alt=""/> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                        </div>
                                        </div>
                                    </div>

                            </div>
                        </div>
               
                    </div>

            </div>
        {/* <div class="identification">
            <p>Saisissez <strong>Noms & Prenoms</strong></p>
            <div class="box-search">
              <form>
                <input type="text" name="" placeholder="Entrez ici le numero de série"/>
                <input type="submit" name="" value="Rechercher"/>
              </form>  
            </div>
         </div>

            <div class="identification">
            <p>Saisissez <strong>numéro de Passeport</strong></p>
            <div class="box-search">
              <form>
                <input type="text" name="" placeholder="Entrez ici le numero de série"/>
                <input type="submit" name="" value="Rechercher"/>
              </form>  
            </div>
         </div>

         <div class="identification">
           <p class="animate__animated animate__zoomInDown">Copiez Collez le numéro de <strong>numéro de référence du constructeur</strong></p>
           <div class="box-search">
                <form>
                <input type="text" name="" placeholder="Référence constructeur..."/>
                <input type="submit" name="" value="Rechercher"/>
                </form>
            </div>
        </div> */}
        </div>
        {/* <Footer/> */}
    </div>
    )
}