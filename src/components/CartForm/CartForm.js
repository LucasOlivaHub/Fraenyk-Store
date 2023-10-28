import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mercadopago from '../../assets/mercadopago.png'
import paypal from '../../assets/paypal.png'
import tarjeta from '../../assets/credit-card.png'
import {v4 as uuid} from 'uuid'
import { validarEmail, validarLetras, validarNumeros } from '../../helpers/utilidades'
import { storeContext } from '../../Context/StoreContext'



export const CartForm = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codPostal, setCodPostal] = useState("");
    const [telefono, setTelefono] = useState("");
    const [pago, setPago] = useState("");

    const navigate = useNavigate();
    const {idCompra, setIdCompra, cartProds, userInfo, setUserInfo} = useContext(storeContext);
    const [numeroId, setNumeroId] = useState(uuid());

    useEffect(() => {
       setIdCompra(numeroId);
    }, [])

    useEffect(() => {
        if(userInfo.length > 0) {
            sendResumeEmails()
        }
     }, [userInfo])
         

    function sendResumeEmails() {

            console.log(userInfo)
            navigate(`/comprafinalizada/${idCompra}`)

          /*  FALTA CODIGO PARA ENVIAR MAIL
          
            resend.emails.send({
                from: 'lucasolivah@gmail.com',
                to: 'lucasolivah@gmail.com',
                subject: 'Compra realizada',
                html: `<div>
                <p>Se ha realizado una compra de <strong>${userInfo[0].nombre}</strong>!</p>
                <br/>
                <br/>
                <p>Email: ${userInfo[0].email}</p><br/>
                <p>Dirección: ${userInfo[0].direccion}</p><br/>
                <p>Código postal: ${userInfo[0].codigoPostal}</p><br/>
                <p>Teléfono: ${userInfo[0].telefono}</p><br/>
                <p>Pago: ${userInfo[0].tipoPago}</p><br/><br/>
                <p>ID COMPRA: <b>${userInfo[0].numeroCompra}</b></p><br/>


                <p>Productos comprados:</p> ${userInfo[0].productos && userInfo[0].productos.map(p => {
                    return <div>
                     <h2>{p.nombre}</h2>
                     <p>{p.cantidad}</p>
                     <p>Total: {p.precio * p.cantidad}</p>
                     </div>
                 })}
                    </div>
                `
              });
    
              resend.emails.send({
                from: 'lucasolivah@gmail.com',
                to: userInfo[0].email,
                subject: 'Hello World',
                html: `<div>
                <h2><b>IMPORTANTE:</b> el siguiente mail es un simulador de compra, no tiene validez
                ya que el fin es previsualizar el mismo</h2>
                <br/>
                <br/>
                <p>${userInfo[0].nombre}</p>
                <p>Has realizado una simulación de compra de:</p> 
                ${userInfo[0].productos && userInfo[0].productos.map(p => {
                   return <div>
                    <h2>{p.nombre}</h2>
                    <p>{p.cantidad}</p>
                    <p>Total: {p.precio * p.cantidad}</p>
                    </div>
                })}

                <p>Te recordamos que tu número de compra es: <b>${userInfo[0].numeroCompra}</b></p>
                </br>
                </br>
                <p>No lo pierdas ni compartas, ya que con este número sabremos qué compra realizaste :)</p>
                </br> 
                </br>
                <p>En breve te contactaremos para coordinar el envio</p>
                <h3>¡Muchas gracias por elegirnos!</h3>
                </div>`
              });
        */
                    
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        //Validaciones
        if (nombre !== (false || "") && email !== (false || "") && codPostal !== (false || "") && 
            telefono !== (false || "") && direccion !== (false || "") && pago !== (false || "")) {
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
            alert("Verifica tus datos")
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

                <label>Codigo postal: <b className='label-required'>*</b>
                    <input type='text' maxLength={5} 
                    onBlur={() => {(codPostal.length > 0 && !validarNumeros(codPostal)) && setCodPostal(false)}}
                    onChange={(e) => setCodPostal(e.target.value)} placeholder='Ingrese su código postal'></input>
                    <span className={`codpostal-error error-msg ${codPostal.length === 0 || codPostal !== false ? "disabled" : ""}`}>Código postal inválido</span>
                </label>

                <label className='contact-label'>Teléfono de contacto <br/><b className='label-required'>*</b>
                    <div><b>+54 </b><input type='text' 
                    onBlur={() => (telefono.length > 0 && !validarNumeros(telefono.replace(/\s/g, ''))) && setTelefono(false)}
                    onChange={(e) => setTelefono(e.target.value)} required placeholder='Ingrese su número'></input></div>
                    <span className={`telefono-error error-msg ${telefono.length === 0 || telefono !== false ? "disabled" : ""}`}>Teléfono inválido</span>
                </label>

                <label className='payment-label'>
                    Seleccione el método de pago: <b className='label-required'>*</b>
                    <input id='tarjeta-input' type='radio' value="tarjeta" name='paymentmethod' onInput={(e) => setPago(e.currentTarget.value)}/>
                    <input id='mercadopago-input' type='radio' value="mercadopago" name='paymentmethod' onInput={(e) => setPago(e.currentTarget.value)}/>
                    <input id="paypal-input" type='radio' value="paypal" name='paymentmethod' onInput={(e) => setPago(e.currentTarget.value)}/>
                    
                    <label className="tarjeta-label" htmlFor="tarjeta-input">
                        <img src={tarjeta}/> {pago === "tarjeta" && <span>Seleccionado (deshabilitado por el momento)</span>}
                    </label>

                    <label className="mercadopago-label" htmlFor="mercadopago-input">
                        <img src={mercadopago}/> {pago === "mercadopago" && <span>Seleccionado (deshabilitado por el momento)</span>}
                    </label>

                    <label className="paypal-label" htmlFor="paypal-input">
                        <img src={paypal}/> {pago === "paypal" && <span>Seleccionado (deshabilitado por el momento)</span>}
                    </label>
                </label>
            </div>

            <div className='cartform-btns-container'>
                <Link className='cancelar-btnform' to={"/carrito"}>Cancelar y volver</Link>

                <a href='#' className="confirmar-btnform" onClick={(e) => handleSubmit(e)}>Confirmar compra</a>
            </div>
         
        </form>
    </div>
  )
}
