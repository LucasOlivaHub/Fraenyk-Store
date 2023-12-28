import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mercadopago from '../../assets/mercadopago.png'
import tarjeta from '../../assets/credit-card.png'
import {v4 as uuid} from 'uuid'
import { validarEmail, validarLetras, validarNumeros } from '../../helpers/utilidades'
import { storeContext } from '../../Context/StoreContext'
import CartModal from './CartModal'




export const CartForm = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codPostal, setCodPostal] = useState("");
    const [telefono, setTelefono] = useState("");
    const [pago, setPago] = useState("");

    const navigate = useNavigate();
    const {idCompra, setIdCompra, cartProds, setCartProds, userInfo, setUserInfo} = useContext(storeContext);
    const [numeroId, setNumeroId] = useState(uuid());

    const [show, setShow] = useState(false);
    const [datosInvalidos, setDatosInvalidos] = useState([]);


    useEffect(() => {
       setIdCompra(numeroId);
    }, [])

    useEffect(() => {
        if(userInfo.length > 0) {
            navigate(`/comprafinalizada/${idCompra}`)
        }
     }, [userInfo])
         

    function handleSubmit(e) {
        setDatosInvalidos([])
        e.preventDefault();
        //Validaciones
        if (nombre !== false
        && email !== false 
        && codPostal !== false 
        && telefono !== false
        && direccion !== false 
        && pago !== false 

        && nombre !== ""
        && email !== "" 
        && codPostal !== "" 
        && telefono !== ""
        && direccion !== "" 
        && pago !== ""   
        ) {
            //Confirmar compra
                //Id de compra 
                if(idCompra) {
                    setUserInfo([{
                        nombre: nombre,
                        email: email,
                        direccion: direccion,
                        codigoPostal: codPostal,
                        telefono: telefono,
                        tipoPago: pago,
                        productos: [...cartProds],
                        id: idCompra
                    }])   
                }
        } else {
            window.scrollTo(0,0)
           // alert("Información incompleta o erronea. Verifica tus datos")
            //Validaciones
            setShow(true)
            if(!nombre || nombre === ""){
                setDatosInvalidos(prevState => [...prevState, "Nombre"]);
            } 

            if(!email || email === ""){
                setDatosInvalidos(prevState => [...prevState, "Email"]);
            } 
            
            if(!direccion || direccion === ""){
                setDatosInvalidos(prevState => [...prevState, "Dirección de domicilio"]);
            }
            
            if(!codPostal || codPostal === ""){
                setDatosInvalidos(prevState => [...prevState, "Código postal"]);
            }
            if(!telefono || telefono === ""){
                setDatosInvalidos(prevState => [...prevState, "Teléfono de contacto"]);
            }
            if(!pago || pago === ""){
                setDatosInvalidos(prevState => [...prevState, "Método de pago"]);
            }

        }
    }

    function validarNombre() {
        if(validarLetras(nombre)) {
            return true
        } else {
            return false
        }
    }

    

  return (
    <div className='cartform-container'>
        <h2>Completa tus datos</h2>
        <form className='cart-form'> 
            <div className='formlabels-container'>
                <label>Nombre:<b className='label-required'>*</b>
                    <input type='text' 
                    onBlur={() =>(nombre.length > 0 && !validarNombre()) && setNombre(false)}
                    onChange={(e) => {setNombre(e.target.value)}} required placeholder='Ingrese su nombre'></input>
                    <span className={`nombre-error error-msg ${nombre.length === 0 || nombre !== false ? "disabled" : ""}`}>Nombre inválido</span>
                </label>

                <label>Email:<b className='label-required'>*</b>
                    <input type='email' 
                    onBlur={() => (email.length > 0 && !validarEmail(email)) && setEmail(false)}
                    onChange={(e) => setEmail(e.target.value)} required placeholder='Ingrese su email'></input>
                    <span className={`email-error error-msg ${email !== false ? "disabled" : ""}`}>Email inválido</span>
                </label>

                <label>Dirección de tu domicilio:<b className='label-required'>*</b>
                    <input type='text' 
                    onBlur={() => (direccion.length > 0 && direccion.length <= 4) && setDireccion(false)}
                    onChange={(e) => setDireccion(e.target.value)} required placeholder='Ingrese su direccion'></input>
                    <span className={`direccion-error error-msg ${direccion.length === 0 || direccion !== false ? "disabled" : ""}`}>Dirección inválida</span>
                </label>

                <label className='codpostal-label'>Codigo postal: <b className='label-required'>*</b>
                    <input type='text' maxLength={5} id='codpostal'
                    onBlur={() => {(codPostal.length > 0 && !validarNumeros(codPostal)) && setCodPostal(false)}}
                    onChange={(e) => setCodPostal(e.target.value)} placeholder='Ingrese su código postal'></input>
                    <span className={`codpostal-error error-msg ${codPostal.length === 0 || codPostal !== false ? "disabled" : ""}`}>Código postal inválido</span>
                </label>

                <label className='contact-label'>Teléfono de contacto <br/><b className='label-required'>*</b>
                    <div><b>+54 </b><input type='tel' 
                    onBlur={() => (telefono.length > 0 && !validarNumeros(telefono.replace(/\s/g, ''))) && setTelefono(false)}
                    onChange={(e) => setTelefono(e.target.value)} required placeholder='Ingrese su número'></input></div>
                    <span className={`telefono-error error-msg ${telefono.length === 0 || telefono !== false ? "disabled" : ""}`}>Teléfono inválido</span>
                </label>

                <label className='payment-label'>
                    Seleccione el método de pago: <b className='label-required'>*</b>
                    <input id='tarjeta-input' type='radio' value="tarjeta" name='paymentmethod' onInput={(e) => setPago(e.currentTarget.value)}/>
                    <input id='mercadopago-input' type='radio' value="mercadopago" name='paymentmethod' onInput={(e) => setPago(e.currentTarget.value)}/>
                    
                    <label className="tarjeta-label" htmlFor="tarjeta-input">
                        <img src={tarjeta}/> {pago === "tarjeta" && <span>Seleccionado (deshabilitado por el momento)</span>}
                    </label>

                    <label className="mercadopago-label" htmlFor="mercadopago-input">
                        <img src={mercadopago}/> {pago === "mercadopago" && <span>Seleccionado (deshabilitado por el momento)</span>}
                    </label>
                </label>
            </div>

            <div className='cartform-btns-container'>
                <Link className='cancelar-btnform' to={"/carrito"}>Cancelar y volver</Link>

                <a href='#' className={nombre && direccion && telefono && codPostal && email && pago ?"confirmar-btnform" : "confirmarincompleto-btnform"} onClick={(e) => handleSubmit(e)}>
                  {nombre && direccion && telefono && codPostal && email && pago ? "Confirmar compra" : "Completa tus datos"}  
                </a>
            </div>
            
        </form>
        {show && <CartModal datosInvalidos={datosInvalidos} show={show} setShow={setShow} />}
    </div>
  )
}
