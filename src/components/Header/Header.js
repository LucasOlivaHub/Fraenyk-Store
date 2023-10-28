import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import MenuHeader from './MenuHeader/MenuHeader';

export const Header = () => {

  const {cartProds, nuevoProdCart, getCartProductsCount} = useContext(storeContext);
  const [currentProds, setCurrentProds] = useState();
  const location = useLocation();

  useEffect(() => {
    setCurrentProds(0);
    setCurrentProds(getCartProductsCount())
  }, [cartProds, nuevoProdCart])

  return (
    <header>
        <Link to='/' className='logo'><h1>Fraenyk</h1></Link>
        {location.pathname === "/" || location.pathname === "comprafinalizada" ? <MenuHeader/> : (
        <div className='cartheader-container'>
          <span>Mi carrito</span>
          <Link to='/carrito'className='carrito-btn'>{currentProds > 10 ? "+10" : currentProds}{cartProds.length > 0 ? <i className="bi bi-cart-fill"></i> : <i className="bi bi-cart"></i>} </Link>
        </div>
        )}
    </header>
  )
}
