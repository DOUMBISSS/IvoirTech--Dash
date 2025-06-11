import React from 'react'
import Footer from '../Pages/Footer';
import Navbar from './Navbar';
import { Link, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';



export default function DetailPrestations() {
  const prestations = useSelector(state =>state.prestationReducer.prestations);

  let id = useParams().id;
  let prestation =prestations.find(prestation => prestation.id == id);

  return (
    <div>
          <Navbar />
        <div className='container'>
            <div className='container--detail--prestation'>
                <div className='container--detail--prestation--image'>
                      <div className='prestation--image--box'>
                          {/* <img src={prestation.img} alt="" /> */}
                          <img src={`${process.env.PUBLIC_URL}/${prestation.img}`} className="d-block w-100" alt="..."/>
                      </div>
                </div>
                <div className='detail--prestation'>
                <h2 className='prestation__title'>{prestation.name}</h2>
                <p className='prestation__header'>{prestation.description}</p>
                  {prestation.prest?.map((prest,i) => {return (<p key={i}> - {prest}</p> )})}
                <p>A partir de <strong className='prestations__price'>{prestation.prices}</strong></p>
                 <Link to="/contactez--nous"><button className='btn__contact'>Contactez-nous</button></Link>
                </div>

            </div>
        </div>
        <Footer/>
    </div>
  )
}
