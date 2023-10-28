import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MenuHeader() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSeccion(e, seccion) {
    e.preventDefault();
    let seccionDesplazar = document.querySelector(seccion);

    if (seccionDesplazar) {
      const offsetTop = seccionDesplazar.offsetTop;
  
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <Button className='navbar-icon' variant="primary" onClick={handleShow}>
        <i className="bi bi-list"></i>
      </Button>

      <Offcanvas className="navbar-menu" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <h2>Fraenyk</h2>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <nav>
          <div className='nav-container'>
            <a href='#nosotros' onClick={(e) => {
              setShow(!show)
              handleSeccion(e, e.currentTarget.hash);
            }}>¿Quiénes somos?</a>

            <a href='#productos-main' onClick={(e) => {
              setShow(!show)
              handleSeccion(e, e.currentTarget.hash);
            }}>Productos</a>

            <a href='#infodestacada' onClick={(e) => {
              setShow(!show)
              handleSeccion(e, e.currentTarget.hash);
            }}>Información adicional</a>
          </div>
          <div className='redes-container'>
            <h3>Redes Sociales</h3>
            <a href='#' onClick={e => e.preventDefault()}><i className="bi bi-instagram"></i></a>
            <a href='#' onClick={e => e.preventDefault()}><i className="bi bi-twitter"></i></a>
            <a href='#' onClick={e => e.preventDefault()}><i className="bi bi-whatsapp"></i></a>
          </div>
           
         </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuHeader;