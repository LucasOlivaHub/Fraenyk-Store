import React, { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import { useEffect } from 'react';
import happycat  from '../../assets/happycat.png'

export const SuccesfulPurchase = () => {
  const {cartProds, setCartProds, idCompra, currentHistory} = useContext(storeContext);
  
  const productImages = require.context('../../assets/productos', true);

  function handleVolver() {
    //Retroceder a la ultima ubicacion del historial
    window.location.href = './';
    //Volver a la primera ruta, al ingresar a la pagina, para que el usuario pueda salir con un solo retroceso
    window.history.go(-(window.history.length - currentHistory));
    //Reiniciar carrito
    setCartProds([]); 
  }

  useEffect(() => {
    let currentState = window.history.state;
    console.log(currentState)
    window.scrollTo(0, 0);
    window.addEventListener("popstate", () => {
      handleVolver();
    })
  }, [])

  return (
    <div className='resume-container'>
      <header>
        <h2 onClick={() => handleVolver()}>Fraenyk</h2>
      </header>
        <div className='resume-text-container'>
            <p className='compraexitosa-title'>¡Tu compra ha sido efectuada con éxito!</p>
            <img className='compraexitosa-img' src={happycat}></img>
            <br/>
            <b>NOTA: Esto es una simulación de compra, ninguno de estos productos está a la venta</b>

            <span className='numerocompra-title'>Tu número de compra es: <br/> <b className='numerocompra'>{idCompra} </b></span>
        </div>

        <div className='resume-products-container'>
            <p>Detalles de la compra:</p>
            {cartProds && cartProds.map(p => {
              return <div key={p.id + p.talleElegido + p.colorElegido} className='resume-p-container'>
                    <div className='resume-p-content'>
                        <h2 className='resume-p-nombre'>{p.nombre}</h2>
                      <div>
                        <span className='p-talle-box'>Talle: {p.talleElegido}</span>
                        <span className='p-color-box' style={{backgroundColor: p.colorElegido}}></span>
                        <span className='p-precio'>Total: <b>${p.precio * p.cantidad}</b></span>
                      </div>
                    </div>
                    <img className='p-imagen' src={productImages(`./${Array.isArray(p.imagen) ? p.imagen[0] : p.imagen}`)}></img>
                    <span className='p-cantidad'>x{p.cantidad}</span>
                </div>
            })}
            
        </div>



        <div className='btnVolver-container'>
          <button className='volver-btn' onClick={() => handleVolver()}>Volver al Home</button>
        </div>

    </div>
  )
}
