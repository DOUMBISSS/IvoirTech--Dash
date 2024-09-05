import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Favorites from '../components/Favorites';
import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../services/productService';
import Product from '../components/Product';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';



export default function Smartphones (){
    const [dis,setDis]=useState(true);
    const [filter,setFilter] = useState(false);
    const [items,setCat]=useState([]);
    const [products, setProducts] = useState([]);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: favoritesDispatch } = useContext(FavoritesContext);

    useEffect(() => {
        const getProducts = async () => {
            const productsFromAPI = await fetchProducts();
            setProducts(productsFromAPI);
        };

        getProducts();
    }, []);

    const addToCart = (product) => {
        cartDispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const addToFavorites = (product) => {
        favoritesDispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    };

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
            <div>

             </div> 

       <div className="part__accessories">
          {/* {items.map((item) => <div key={item._id}className='featured__product__cards'>
                        <div className='product__cards__header'>
                        <p className='sales'>{item.title}</p>
                           <div className='featured__product__cards__header__images'>
                           <Link to={`/detail/${item.id}`}><img src={`${process.env.PUBLIC_URL}/${item.img}`} alt="" /></Link>
                           </div>
                        </div>
                        <div className='featured__product__cards__body'>
                               
                                <p className='product__desc'>{item.description}</p>
                                <p className='brand'>{item.marque}</p>
                               <h5 className='product__categorie'>Smartphone</h5>
                               <p className="reference">Réf:ECMHDEDIPACCHCB3</p>
                                <p className="info">2 en stock</p>
                               <p className='product__price'>{item.price} FCFA</p>
                               <div className='button--block'>
                               <Link className='link__btn' to='/detail'><button className='btn__buy'>Acheter</button></Link>
                               <button className='btn__add'>+</button>
                               
                               
                                </div>  
                        </div>
                    </div> 

                    
                        )} */}
                        {products.map(product => (
                <Product key={product._id} product={product} addToCart={addToCart} addToFavorites={addToFavorites} />
            ))}
                    
          </div>
       </div>

        {/* <Footer/> */}
     </div>
    );
}