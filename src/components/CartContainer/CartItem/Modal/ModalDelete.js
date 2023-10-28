import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({handleDelete}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <i className="bi bi-trash p-delete" onClick={handleShow}></i>
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>¿Quieres eliminar este producto de tu carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;