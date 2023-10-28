import { useState, useRef, useContext, useEffect } from 'react';
import { removeAccents } from '../../../helpers/utilidades';
import Overlay from 'react-bootstrap/Overlay';
import { storeContext } from '../../../Context/StoreContext';

function SearchBar() {
    const {prods, filterProds, setFilterProds} = useContext(storeContext);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    if(!show) {
        setSearchTerm("");
    }
}, [show])

    function handleSearch(busquedaUsuario) {
        setSearchTerm(busquedaUsuario)
        let prodsSearch = [];
        prods.map(p => {
            let nombre = p.nombre.toLowerCase();
            let categoria = p.categoria.toLowerCase();
            let descripcion = p.descripcion.toLowerCase();

        if (nombre.includes(searchTerm.toLowerCase()) ||
            categoria.includes(searchTerm.toLowerCase()) ||
            descripcion.includes(searchTerm.toLowerCase()) ||
            //Sin acentos:
            removeAccents(nombre).includes(searchTerm.toLowerCase()) ||
            removeAccents(categoria).includes(searchTerm.toLowerCase()) ||
            removeAccents(descripcion).includes(searchTerm.toLowerCase())
      ) {
        prodsSearch.push(p);
      }
         })
         setFilterProds(prodsSearch)
    }
    

  return (
    <>
      <i ref={target} onClick={() => setShow(!show)} className="bi bi-search"></i>

      <Overlay target={target.current} show={show} placement="left">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              padding: '2px 10px',
              borderRadius: 3,
              ...props.style,
            }}
            className='header-search'
          >
        <input type="text" placeholder="Buscar cualquier producto" value={searchTerm} onChange={(e) => handleSearch(e.target.value)}/>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default SearchBar;