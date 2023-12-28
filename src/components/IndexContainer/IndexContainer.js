import React, { useContext, useEffect, useState } from 'react'
import { ItemsList } from './ItemsList/ItemsList';
import { removeAccents } from '../../helpers/utilidades';
import { storeContext } from '../../Context/StoreContext';
import { useParams } from 'react-router-dom';
import SeccionesPagina from '../SeccionesPagina/SeccionesPagina';
import confuseddog from '../../assets/confuseddog.png'

export const IndexContainer = () => {

    const {prods, filterProds, setFilterProds} = useContext(storeContext)
    const [productos, setProductos] = useState([]);
    const [prodsOriginalesCopia, setProdsOriginalesCopia] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const categoria = useParams().categoria;

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // Cantidad de productos por página
    const [isHoverLeft, setIsHoverLeft] = useState(false);
    const [isHoverRight, setIsHoverRight] = useState(false);

   useEffect(() => {
    //Si se buscó por categoria:
    window.scrollTo(0,0);
    buscarProductos();
    }, [filterProds]) 


    const obtenerProductosDePagina = () => {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      return productos.slice(indexOfFirstProduct, indexOfLastProduct);
   };

   function searchInAnyOrder(search, text) {
    const searchTerms = search.toLowerCase().split(' ');
  
    // Expresión regular que busqua "search" en cualquier orden
    const regex = new RegExp(searchTerms.map(term => `(?=.*${term})`).join(''), 'i');
  
    // Aplicando la expresión regular al texto
    return regex.test(text.toLowerCase());
  }

  function handleSearch(search) {
    let searchProducts = [];
    setSearchFilter(search);

    prodsOriginalesCopia.map(p => { //prods.map
      let nombre = p.nombre.toLowerCase();
      let categoria = p.categoria.toLowerCase();
      let descripcion = p.descripcion.toLowerCase();
      

      if(nombre.includes(search.toLowerCase()) ||
        categoria.includes(search.toLowerCase()) ||
        descripcion.includes(search.toLowerCase()) ||
        //Sin acentos:
        removeAccents(nombre).includes(search.toLowerCase()) ||
        removeAccents(categoria).includes(search.toLowerCase()) ||
        removeAccents(descripcion).includes(search.toLowerCase()) 

        ||
        //Busqueda exacta: en cualquier orden
        searchInAnyOrder(search, nombre) ||
        searchInAnyOrder(search, categoria) ||
        searchInAnyOrder(search, descripcion)

      ) {
        searchProducts.push(p)
      }
    })
    if(search) {
    setProductos(searchProducts)
    } else {
      buscarProductos()
    }
  }

  function handleFilter(filterValue) {
    let prodsFiltro = [...productos];

    if(filterValue === "mayor") {
      setProductos(prodsFiltro.sort((a,b) => b.precio - a.precio));
    } else if (filterValue === "menor") {
      setProductos(prodsFiltro.sort((a,b) => a.precio - b.precio));
    } else if (filterValue === "nada") {
      buscarProductos(); // prods
      //Volver a asignar la busqueda al valor del estado searchFilter (lo escrito en el input)
      if(searchFilter) {
        handleSearch(searchFilter)
      }
    }
  }

  function buscarProductos() {
    if(categoria) {
      buscarPorCategoria();
    } else {
      setProductos(prods)
      setProdsOriginalesCopia(prods)
      setTitulo("Todos los productos")
    }
  }

  function buscarPorCategoria() {
      let productosCategorias = [];
      filterProds.map(p => {
      let productCategoria = removeAccents(p.categoria.toLowerCase());
      if(productCategoria.includes(removeAccents(categoria.toLowerCase()))) {
        productosCategorias.push(p);
      }
    })
    setProductos(productosCategorias)
    setProdsOriginalesCopia(productosCategorias)
    setTitulo(productosCategorias[0].categoria)
  }

  return (
    <section className='index-container'>
      <SeccionesPagina className="sectionpages-container" seccion1={titulo}/>
      <h1>{titulo}</h1>
      <div className='inputs-container'>
        <input type='search' onChange={(e) => handleSearch(e.target.value)} className='search-index' placeholder={`Buscar ${categoria ? categoria : "productos"}`}></input>
        <select className='filter-price' onChange={(e) => handleFilter(e.target.value)}>
          <option value="nada">Filtrar por precio</option>
          <option value="mayor">Mayor precio</option>
          <option value="menor">Menor precio</option>
        </select> 
      </div>
    {productos.length > 0 ? <ItemsList productos={obtenerProductosDePagina()}/> : 
    <div className='busquedafallida-container'>
      <span>No se encontró: <b>{searchFilter}</b></span>
      <img src={confuseddog}></img>
    </div>
    }

    <div className='pagination-container'>
      {productos.length > productsPerPage && (
          <div>
              <button className='pagination-arrow' onClick={() => {
                window.scrollTo(0, 0);
                setCurrentPage(currentPage - 1)
                }} disabled={currentPage === 1}>
              <i className={`bi bi-caret-left${isHoverLeft ? '-fill' : ''}`} 
                onMouseOver={() => currentPage !== 1 && setIsHoverLeft(true)}
                onMouseLeave={() => setIsHoverLeft(false)}>
              </i>
              </button>
              <span className='pagination-number'>{currentPage} de {Math.ceil(productos.length / productsPerPage)}</span>
              <button className='pagination-arrow' onClick={() => {
                window.scrollTo(0, 0);
                setCurrentPage(currentPage + 1)
                }} disabled={currentPage === Math.ceil(productos.length / productsPerPage)}>
                 <i className={`bi bi-caret-right${isHoverRight ? '-fill' : ''}`}
                   onMouseOver={() => currentPage !== Math.ceil(productos.length / productsPerPage) && setIsHoverRight(true)}
                   onMouseLeave={() => setIsHoverRight(false)}>
                 </i>
              </button>
          </div>
        )}
    </div>
</section>
);
};

