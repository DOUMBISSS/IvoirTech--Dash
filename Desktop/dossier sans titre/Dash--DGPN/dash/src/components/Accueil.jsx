import Navbar from "./Navbar";
import {Link} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { useState ,useEffect } from "react";
import {getAllQuestions } from "../Redux/actions";
import Footer from "./Footer";


export default function Accueil (){

    // const questions = useSelector(state=>state.questionReducer.questions);


    return (
        <div>
            {/* <Navbar/> */}
            
            <div className="containers">
                <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="container--admin">
                                <div className="container--admin--content">
                                    <div className="profil--admin">
                                        <img src="https://img1.freepng.fr/20180712/qqw/kisspng-writing-infographic-writer-homework-essay-admin-icon-5b46fc454466f9.2978199715313787572802.jpg" alt="" />
                                    </div>
                                    <p className="profil--name">Doumbia Fode</p>
                                </div>
                            </div>
                            
                            <div className="sidebar">
                                <div className="sidebar--item">
                                    <p><i class="fa-brands fa-dashcube"></i> Dashbbord</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-solid fa-user"></i> App users</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-solid fa-file"></i> Documents</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-regular fa-bell"></i> Notifications</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-solid fa-envelope"></i> Email</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-solid fa-address-book"></i> Contact</p>
                                </div>
                                <div className="sidebar--item">
                                    <p><i class="fa-solid fa-gear"></i> Settings</p>
                                </div>

                                
                            </div>

                            
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="firstly">
                                <h1>Dashbord</h1>
                                    <div className="container--block--document">
                                        <div className="cards">
                                            <div className="cards--header">
                                                <h4>Document</h4>
                                                <i class="fa-solid fa-file"></i>
                                            </div>
                                            <h5>146.000</h5>
                                        </div>
                                        <div className="cards">
                                            <div className="cards--header">
                                                <h4>Email</h4>
                                                <i class="fa-solid fa-envelope"></i>
                                            </div>
                                            <h5>500</h5>
                                        </div>
                                        <div className="cards">
                                            <div className="cards--header">
                                                <h4>Contact</h4>
                                                <i class="fa-solid fa-address-book"></i>
                                            </div>
                                            <h5>10000</h5>
                                        </div>
                                        <div className="cards">
                                            <div className="cards--header">
                                                <h4>Title</h4>
                                                <i class="fa-solid fa-file"></i>
                                            </div>
                                            <h5>Number</h5>
                                        </div>
                                    </div>

                                    <div className="doc">
                                    <div class="white_card card_height_100 mb_30 QA_section">
                                        <div class="white_card_header">
                                        <div class="box_header m-0">
                                        <div class="main-title">
                                        <h4 class="m-0">Documents</h4>
                                        <p>Documents tracking information</p>
                                        </div>
                                        <div class="header_more_tool">
                                        <div class="dropdown">
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#"> <i class="ti-eye"></i> Action</a>
                                        <a class="dropdown-item" href="#"> <i class="ti-trash"></i> Delete</a>
                                        <a class="dropdown-item" href="#"> <i class="fas fa-edit"></i> Edit</a>
                                        <a class="dropdown-item" href="#"> <i class="ti-printer"></i> Print</a>
                                        <a class="dropdown-item" href="#"> <i class="fa fa-download"></i> Download</a>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        <div class="white_card_body">
                                        <div class="QA_table table-responsive ">

                                        <table class="table pt-0">
                                        <thead>
                                        <tr>
                                        <th scope="col">Profile</th>
                                        <th scope="col">Activity Type</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Budget</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Period</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Deadline</th>
                                        <th scope="col">Attachment</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_1.png" alt="" /> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Tom Smitn</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        <td>Oct</td>
                                        {/* <td>Send</td> */}
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt="" /> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_2.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Tom Smitn</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        <td>Oct</td>
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt=""/> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_3.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Tom Smitn</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        <td>Oct</td>
                                        <td><img class="check_status" src="img/invoice_img/check.png" alt=""/> </td>
                                        <td> 25/10/2020</td>
                                        <td> <button class="btn_1">PDF</button> </td>
                                        </tr>
                                        <tr>
                                        <td> <img class="user_thumb" src="img/invoice_img/man_5.png" alt=""/> </td>
                                        <td>Product</td>
                                        <td class="nowrap">Tom Smitn</td>
                                        <td class="nowrap">Client data test</td>
                                        <td>$125000</td>
                                        <td>High</td>
                                        <td>Oct</td>
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
       
        <Footer/>
    </div>
    </div>
    )
}