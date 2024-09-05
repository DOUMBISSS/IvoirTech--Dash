import { Link} from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { addToCart } from "../Redux/actions";
import ProductCart from "../components/ProductCart";
import Footer from "./Footer";



export default function Smartphones (){

    const [dis,setDis]=useState(true);
    const [filter,setFilter] = useState(false);
    	const [courses, setCourses] = useState([]);

const [cartCourses, setCartCourses] = useState([]);
const [searchCourse, setSearchCourse] = useState('');
    const [items,setCat]=useState([]);

    // useEffect(() => {
    //     fetch('https://back-doc.onrender.com/products')
	// 		.then(response => response.json())
	// 		.then(items =>  setCat(items))
	// 		.catch(error => console.error('Error:', error));

    //     })
	console.log(items)
    const closeFilter = ()=> {
          setFilter (false)
      }
      const showFilter =()=>{
          setFilter (true)
      }


    const AddArticle = (id) => {
        dispatch(addToCart(id))
      }

    const filterResult = (catItem)=>{
        const filterData = Smartphones.filter((Smartphone) =>  Smartphone.marque === catItem )
            setCat(filterData);
            setDis(false);
    }

	


    return (
        <div>
        <Navbar/>
        <div className='container'>
        <div className="bread">
                        <p>Accueil <i class="fa-solid fa-angle-right"></i> Smartphones & Tablettes</p>
                </div>
            <h2 className="header__accessories">Smartphones & Tablettes </h2>
            <div className="part__products__header">
                <div className="part__products__header__images">
                <img src="https://tpc.googlesyndication.com/simgad/15905478928241312474" alt="" />
                </div>
                {/* <p className="container--header">Tv & Audios</p> */}
                <p>Découvrez les nouveautés de notre collection pour homme. Vous trouverez des must-haves de tous les jours tels que hauts et t-shirts, ensembles décontractés et sous-vêtements.
                         Et pour ce qui est des pantalons pour homme, il y a des joggings et des pantalons cargo de toutes les couleurs. 
                        </p>
                        <div className="col-12 col-md-12">
                            <p className="container--header">Nos partenaires </p>
                            <div className="section__partenaires">
                                <div className="section__partenaires__content">
                                    <img src="https://img.freepik.com/icones-gratuites/mac-os_318-10374.jpg" alt="" />
                                    <img src="https://www.1min30.com/wp-content/uploads/2018/10/Embl%C3%A8me-Huawei.jpg" alt="" />
                                    <img src="https://logos-marques.com/wp-content/uploads/2021/01/logo-Xiaomi.jpg" alt="" />
                                    <img src="https://static.vecteezy.com/ti/vecteur-libre/p3/20927489-infinix-marque-logo-telephone-symbole-nom-noir-conception-chine-mobile-vecteur-illustration-gratuit-vectoriel.jpg" alt="" />
                                    <img src="https://logos-marques.com/wp-content/uploads/2022/04/Oppo-logo.png" alt="" />
                                    <img src="https://images.samsung.com/is/image/samsung/assets/africa_fr/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$" alt="" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wiko_logo.svg/1200px-Wiko_logo.svg.png" alt="" />
                                </div>
                            </div>
                        </div>
                </div>
            <ProductCart/>
            <div>
             <div className="filter" onMouseOver={showFilter}>
                        <i className="fa-solid fa-arrow-up-wide-short"></i>
                        <p>Filtre</p>
            </div>
                <div className={filter ? "filterbar show--filterbar" : "filterbar" }>
                        <div className='filterbar--content' onMouseLeave={closeFilter}>
                          <div className='btn--close--sidebar'onClick={closeFilter}> <i className="fa-solid fa-xmark"></i></div>

                          <div className='filter--sidebar'>
                         <div className="filter--container">
                                <h4>CATÉGORIE PAR PRODUIT</h4>
                                <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingSeven">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                        SMARTPHONES
                                </button>
                                </h2>
                                <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                        <p className="btn__filter" onClick={()=>{filterResult('Iphones')}}>Iphones</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Samsung')}}>Samsung</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Huawei')}}>Huawei</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Xiaomi')}}>Xiaomi</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Oppo')}}>Oppo</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Google')}}>Google</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Redmi')}}>Redmi</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Infinix')}}>Infinix</p>
                                </div>
                                </div>
                                </div>
                                <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        TAILLE DE L'ECRAN
                                </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>32'</p>
                                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>43'</p>
                                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums femme')}}>55'</p>
                                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>65'</p>
                                        <p className="btn__filter"  onClick={()=>{filterResult('Deo')}}>75'</p>
                                </div>
                                </div>
                                </div>
                                <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingFive">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                        FORMAT DE L'ECRAN
                                </button>
                                </h2>
                                <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                        <p className="btn__filter" onClick={()=>{filterResult('Jouets')}}>Plat</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Préservatifs')}}>Incurvée</p>
                                </div>
                                </div>
                                </div>

                {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                    </div> */}

                <p className="title__cat">AUTRES CATEGORIES</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>Télévision</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums femme')}}>Audios et Hifi</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>Climatisation</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Deo')}}>Chauffage et traitement d'air</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>Réfrigerateur</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums femme')}}>Congélateur</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>Cuisine et Maison</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Deo')}}>Lavage et Entretien</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Deo')}}>Accessoires</p>
                        <p className="btn__filter"  onClick={()=>{filterResult('Parfums homme')}}>Réfroidisseur</p>

                </div>
                                </div>
                                    </div>
                                </div>
                        </div>

             </div> 

          <div className="container-contents">
          <div className="sidebar">
          <div className="filter--container">
                <h4>CATÉGORIE</h4>
            {/* <h6>{items.length} résultat(s)</h6> */}
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingSeven">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                        Smartphones
                </button>
                </h2>
                <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                                        <p className="btn__filter" onClick={()=>{filterResult('Apple')}}>Iphones</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Samsung')}}>Samsung</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Huawei')}}>Huawei</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Xiaomi')}}>Xiaomi</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Oppo')}}>Oppo</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Google')}}>Google</p>
                                        {/* <p className="btn__filter" onClick={()=>{filterResult('Xiaomi')}}>Redmi</p> */}
                                        <p className="btn__filter" onClick={()=>{filterResult('Infinix')}}>Infinix</p>
                </div>
                </div>
                </div>
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Tablettes
                </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                                        <p className="btn__filter" onClick={()=>{filterResult('Apple')}}>Ipad</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Samsung')}}>Samsung</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Huawei')}}>Huawei</p>
                </div>
                </div>
                </div>
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                        Accessoires
                </button>
                </h2>
                <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                                    <p className="btn__filter" onClick={()=>{filterResult('Adaptateur')}}>Adaptateurs</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Batterie')}}>Batteries</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Chargeur')}}>Cables & Chargeurs</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Coques')}}>Coques</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Ecran')}}>Ecrans</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Ecouteur')}}>Ecouteurs</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Montres')}}>Montres</p>
                                        <p className="btn__filter" onClick={()=>{filterResult('Support')}}>Support</p>
                </div>
                </div>
                </div>

                {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                    </div> */}

                </div>
                </div>
                </div>
                <div className="part__products">

       <div className="part__accessories">
          {items.map((item) => <div key={item._id}className='featured__product__cards'>
                        <div className='product__cards__header'>
                        <p className='sales'>{item.title}</p>
                           <div className='featured__product__cards__header__images'>
                           <Link to={`/detail/${item.id}`}><img src={`${process.env.PUBLIC_URL}/${item.img}`} alt="" /></Link>
                           </div>
                        </div>
                        <div className='featured__product__cards__body'>
                                {/* <h5 className='product__title'>{article.title}</h5> */}
                                <p className='product__desc'>{item.description}</p>
                                <p className='brand'>{item.marque}</p>
                               <h5 className='product__categorie'>Smartphone</h5>
                               <p className="reference">Réf:ECMHDEDIPACCHCB3</p>
                                <p className="info">2 en stock</p>
                               <p className='product__price'>{item.price} FCFA</p>
                               <div className='button--block'>
                               <Link className='link__btn' to='/detail'><button className='btn__buy'>Acheter</button></Link>
                               <button className='btn__add' onClick={() => addCourseToCartFunction(item)}>+</button>
                               
                               
                                </div>  
                        </div>
                    </div> 

                    
                        )}
                    
          </div>
       </div>

        </div>
        </div>
        <Footer/>
     </div>
    );
}