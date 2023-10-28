import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { removeAccents } from '../../../helpers/utilidades';

export const Item = ({prod}) => {


/*
               <div>
                          {prod.descuento ? (
                            <div>
                              <span className='precio-tachado'>$ {prod.precio}</span>
                              <b>${prod.precio - ((prod.precio * prod.descuento) / 100) }</b> 
                              <br/>
                              <b className='descuento'>{prod.descuento}% OFF</b>
                            </div>)
                        : } 
                </div>                
                */

  return (
    <Link to={`/product/${prod.id}/${prod.nombre}`}>
            <article className='producto'>
                <img src={prod.imagen} className='producto-img'/>
                <div className='producto-texto-imagen'>
                        <h2 className='producto-nombre'>{prod.nombre}</h2>
                        <b>$ {prod.precio}</b>
                </div>
            </article>
    </Link>
  )
}
