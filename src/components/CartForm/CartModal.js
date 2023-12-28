import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function CartModal({datosInvalidos, show, setShow}) {


  if (show) {
    return (
    <Alert className='cartform-modal' variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Datos inválidos</Alert.Heading>
        <div>
           <p>Se produjo un error al leer los datos en:</p> 
                {datosInvalidos.length > 0 && datosInvalidos.map(d =>{
                   return (
                   <div key={d}>
                            <b>{d}</b>
                            <br/>
                    </div>
                    )
                } 
                )}
        </div>
    </Alert>
    );
  }
}

export default CartModal;
