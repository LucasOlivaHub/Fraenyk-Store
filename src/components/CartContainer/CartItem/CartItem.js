import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../../Context/StoreContext';
import ModalDelete from './Modal/ModalDelete';

export const CartItem = ({prod}) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(prod.precio * prod.cantidad);
  const {cartProds, setCartProds ,nuevoProdCart, setNuevoProdCart} = useContext(storeContext);

  const productImages = require.context('../../../assets/productos', true);


  useEffect(() => {
    setCount(prod.cantidad);
    setNuevoProdCart(!nuevoProdCart)

}, [count])

  function handleRestar() {
    if (count > 1 ) {
      setCount(count-1)
      prod.cantidad -= 1;
      actualizarPrecios();
    } else if ( count === 1) {
      handleDelete()
    }
  }

  function handleSumar() {
    setCount(count+1)
    prod.cantidad += 1;
    actualizarPrecios();
  }

  function handleDelete() {
    if(cartProds.find(p => p === prod)) {
      let indexDelete = cartProds.findIndex(product => product === prod);
      let productosActualizados = [...cartProds];
      productosActualizados.splice(indexDelete, 1);
      setCartProds(productosActualizados);
    }
  }
  
  function actualizarPrecios() {
    setNuevoProdCart(!nuevoProdCart)
    setPrice(prod.precio * prod.cantidad)
  }

  return (
    <article className='p-carrito'>
                  <div className='p-nombreimg-container'>
                      <h2 className='p-nombre'>{prod.nombre}</h2>
                      <img src={productImages(`./${Array.isArray(prod.imagen) ? prod.imagen[0] : prod.imagen}`)}></img>
                  </div>
                    <ModalDelete handleDelete={handleDelete}/>
                    <div className='p-detalles'>
                        <span className='p-talle'>Talle: {prod.talleElegido} </span>
                        <div className='p-color' style={{ display: "inline-block",width: "25px", height: "25px",backgroundColor: prod.colorElegido}}></div>
                    </div>
                    <div className='precio-cantidad-carrito'>
                        <span className='p-precio'>Total: <b>$ {price}</b></span>
                        <div className='cantidad-c-carrito'>
                        <i className="bi bi-dash restar" onClick={() => handleRestar()}></i>
                        <input type='number' readOnly value={count} min={1} className='p-cantidad'/>
                        <i className="bi bi-plus-lg sumar" onClick={() => handleSumar()}></i>
                        </div>
                    </div>
                   
    </article>
  )
}
