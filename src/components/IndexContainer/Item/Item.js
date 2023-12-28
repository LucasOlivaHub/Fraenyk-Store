import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SkeletonItem from '../../Loaders/SkeletonItem/SkeletonItem';

export const Item = ({prod}) => {
  const [loading, setLoading] = useState(true)

  const productImages = require.context('../../../assets/productos', true);

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
  
 return (
    <Link to={`/product/${prod.id}/${prod.nombre}`} className='producto-link'>         
              {loading ? <SkeletonItem/> :
                <article className='producto'>
                  <img src={productImages(`./${Array.isArray(prod.imagen) ? prod.imagen[0] : prod.imagen}`)} className='producto-img' onLoad={handleLoading}/>
                  <div className='producto-texto-imagen'>
                          <h2 className='producto-nombre'>{prod.nombre}</h2>
                          <b className='producto-precio'>$ {prod.precio}</b>
                  </div>
                </article>
              } 
    </Link>
  )
}
