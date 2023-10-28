import React, { useContext, useEffect, useState } from 'react'
//import cartproducts from '../../data/cartproducts.json'
import { Link, useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem/CartItem';
import { storeContext } from '../../Context/StoreContext';
import {v4 as uuid} from 'uuid'
import sadcat from '../../assets/sadcat.png'

export const CartContainer = () => {

    const {cartProds, nuevoProdCart, getCartProductsCount} = useContext(storeContext);
    const cartProducts = cartProds;
    const [total, setTotal] = useState(0);
    const [cartCount, setCartCount] = useState(getCartProductsCount());
    const navigate = useNavigate();


    useEffect(() => {
        setTotal(0);
        setCartCount(getCartProductsCount());
        let contador = 0; 
        cartProducts.forEach(p => {
            contador += p.precio * p.cantidad;
        })
        setTotal(contador);
        //
    }, [cartProducts, nuevoProdCart])

  return (
    <div className='cartpage-container'>
        <header className='header-carrito'>
            <Link to='/' className='logo'><h1>Fraenyk</h1></Link>
            <span className='carrito-title'>Tu carrito {cartCount}</span>
        </header>
        <section className='carrito-container'>
            {cartProducts.length > 0 ? cartProducts.map(p => {
                return <CartItem prod={p} key={p.id}/>
            }) : <div className='emptycart-container'>
                    <span className='emptycart-title'>Tu carrito está vacio</span>
                    <img className='emptycart-img' src={sadcat}></img>
                </div>
            }
            
        </section>
        <section className='btns-container-carrito'>
            <Link to='/' className='volverBtn-carrito'>Volver al home</Link>
            {cartProds.length > 0 && <Link to={`/carrito/formulario/${uuid()}`} className='comprarBtn-carrito'>Pagar: ${total}</Link>
}
        </section>
    </div>
  )
}
