import React, { useEffect, useState } from 'react'
import data from '../data/products.json'
import { storeContext } from '../Context/StoreContext'

export const StoreProvider = ({children}) => {
  const [prods, setProds] = useState(data);
  const [filterProds, setFilterProds] = useState(data);
  const [categoryProds, setCategoryProds] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [cartProds, setCartProds] = useState([]);
  const [nuevoProdCart, setNuevoProdCart] = useState(false);
  const [idCompra, setIdCompra] = useState("")

  function getCartProductsCount() {
    let contador = 0;

    cartProds.forEach(p => {
      contador += Number(p.cantidad); 
    })
    return contador;
  }

  
  return (
    <storeContext.Provider value={{
      prods, 
      cartProds, 
      setCartProds,
      nuevoProdCart, 
      setNuevoProdCart, 
      getCartProductsCount,
      filterProds,
      setFilterProds,
      categoryProds,
      setCategoryProds,
      idCompra,
      setIdCompra,
      userInfo,
      setUserInfo}}>
        {children}
    </storeContext.Provider>
  )
}
