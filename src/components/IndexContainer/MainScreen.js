import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'

import campera1 from '../../assets/campera_1.jpg'
import remera1 from '../../assets/remera_1.jpg'
import pantalon1 from '../../assets/pantalon_1.jpg'
import reloj1 from '../../assets/reloj_1.jpg'
import zapatillas from '../../assets/zapatillas.jpg'

import envios  from '../../assets/envios.png'
import tarjetas  from '../../assets/credit-card.png'
import tarjetaspago  from '../../assets/tarjetaspago.png'
import reembolso  from '../../assets/refund.png'
import mercadopago  from '../../assets/mercadopago.png'
import correo  from '../../assets/Correo_Argentino_Logo..png'
import camion  from '../../assets/camion.png'
import retiro  from '../../assets/retiro.png'
import SeccionesPagina from '../SeccionesPagina/SeccionesPagina'
import { Skeletonmain } from '../Loaders/Skeletonmain/Skeletonmain'
import SpinnerLoading from '../Loaders/Spinner/SpinnerLoading'

export const MainScreen = () => {
    const {categoryProds, setCategoryProds, currentHistory} = useContext(storeContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        return setCategoryProds([]);
    }, [])

    const [loading, setLoading] = useState(true)

    function handleLoading() {
        setLoading(false);
    }
      
    useEffect(() => {
      const loadingTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // Espera 500 milisegundos antes de cambiar el estado a `false`
  
      return () => {
        clearTimeout(loadingTimer); // Limpiar el temporizador si el componente se desmonta antes de que se complete el tiempo
      };
    }, []); 

    if(loading) {
        return <SpinnerLoading/>
    } else return (
    <main className='main-screen'>
            <section id='productos-main' className='categories-main-container'>
                <SeccionesPagina/>
                <h1 className='main-title'>Bienvenido a Fraenyk</h1>
                <p className='main-subtitle'>Explora nuestros productos</p>
                <Link className='category-todos' to={"/products"}>
                    <p>Ver todos <i className="bi bi-list-ul"></i> </p>
                </Link>
                <article className='categories-container'>
                
                    <Link className='category-box primary' to={"/products/camperas"}>
                        <div className='blackfilter-category'>
                            <p className='category-name'>CAMPERAS</p>
                            <img src={campera1} onLoad={handleLoading} alt='categoria'></img>
                        </div>
                    </Link>
                    <Link className='category-box primary' to={"/products/remeras"}>
                        <div className='blackfilter-category'>
                            <p className='category-name'>REMERAS</p>
                            <img src={remera1} alt='categoria'></img>
                        </div>
                    </Link>

                    <Link className='category-box primary' to={"/products/pantalones"}>
                        <div className='blackfilter-category'>
                            <p className='category-name'>PANTALONES</p>
                            <img src={pantalon1} alt='categoria'></img>
                        </div>
                    </Link>

                    <Link className='category-box primary' to={"/products/zapatillas"}>
                        <div className='blackfilter-category'>
                            <p className='category-name'>CALZADO</p>
                            <img src={zapatillas} alt='categoria'></img>
                        </div>
                    </Link>
                    <Link className='category-box secondary' to={"/products/accesorios"}>
                        <div className='blackfilter-category'>
                            <p className='category-name'>Accesorios</p>
                            <img src={reloj1} alt='categoria'></img>
                        </div>
                    </Link>
                </article>
            </section>
                   
            <section id='nosotros'>
                <div className='nosotros-container'>
                    <div className='nosotros-content'>
                            <h2>¿Qué es Fraenyk?</h2>
                            <p>Somos una <b style={{backgroundColor: "#3b3b3b59"}}>empresa ficticia</b> de ropa para adultos que nació en 2023
                                gracias a nuestro creador Lucas Oliva.
                                <br/>
                                <br/>
                                Nuestro foco se encuentra en vestimenta urbana para adultos. Sin embargo, en nuestra
                                tienda, podrás encontrar muchas cosas más que creemos que podrían gustarte.
                                <br/>
                                Buscamos brindarte productos con la mejor calidad y priorizamos tu 
                                conformidad. ¡No dudes en contactarnos ante cualquier duda o inconveniente!
                                <br/>
                                <br/>
                                <br/>
                                ¿Qué estás esperando? <b>¡Vamos a conseguir tu primer producto Fraenyk!</b>
                            </p>

                            <Link className='btnTienda-nosotros' to={"/products"}>Ir a la tienda</Link>
                    </div>
                </div>
            </section>

            <section id='infodestacada' className='infodestacada-container'>
                <div className='infodestacada infodestacada-1'>
                    <img src={envios} alt='infoimg'></img>
                    <div>
                        <h4>Envios a toda la Argentina</h4>
                        <p>Lo tenes en la puerta de tu casa</p>
                    </div>
                </div>
                <div className='infodestacada infodestacada-2'>
                    <img src={tarjetas} alt='infoimg'></img>
                    <div>
                        <h4>Tarjetas</h4>
                        <p>Hasta 6 cuotas sin interés</p>
                    </div>
                </div>
                <div className='infodestacada infodestacada-3'>
                    <img src={reembolso} alt='infoimg'></img>
                    <div>
                        <h4>Devolución de productos</h4>
                        <p>¿No te gustó? ¿Vino fallado?</p>
                        <p>Podes reclamar una devolución gratis, al recibir tu producto, antes de las 24hs</p>
                    </div>
                
                </div>
            </section>

            <section className='mediospago-container'>
                <h4>Medios de pago:</h4>
                <div>
                    <img src={tarjetaspago} alt='mediospago'></img>
                    <img src={mercadopago} alt='mediospago'></img>
                </div>
            </section>

            <section className='mediosenvio-container'>
                <h4>Medios de envio:</h4>
                <div>
                    <img src={camion} alt='mediosenvio'></img>
                    <img src={correo} alt='mediosenvio'></img>
                    <img src={retiro} alt='mediosenvio'></img>
                </div>
            </section>
    </main>
  )
}
