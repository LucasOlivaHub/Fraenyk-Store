import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import { useEffect } from 'react';

export const SuccesfulPurchase = () => {

  const {cartProds, setCartProds, idCompra} = useContext(storeContext);

  function handleVolver() {
    setCartProds([]);
    //Retroceder a la ultima ubicacion del historial
    window.location.href = '/';
    window.history.go(-(window.history.length - 1))
  }

  useEffect(() => {
    window.addEventListener("popstate", () => {
      handleVolver();
    })
  }, [])

  return (
    <div className='resume-container'>
        <div>
            <p className='compraexitosa-title'>¡Tu compra ha sido efectuada con éxito!</p>
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
                    <img src={Array.isArray(p.imagen) ? p.imagen[0] : p.imagen}></img>
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
