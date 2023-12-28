import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fallbackimage from '../../assets/fallback.png'

export const Fallback = () => {

    const navigate = useNavigate()

    function handleRedirigir() {
        navigate("/")
    }

  return (
    <div className='fallback-container'>
        <header className='fallback-header'>
            <Link to='/' className='logo'><h1>Fraenyk</h1></Link>
        </header>
        <div className='fallback-text'>
            <h2>404</h2>
            <h3>Esa dirección no existe</h3>
            <p>¿Quieres redirigirte a la pantalla principal de Fraenyk?</p>
            <br/>
            <button onClick={() => handleRedirigir()}>Ir a Fraenyk Store</button>
        </div>
        <div className='fallback-imgs'>
         <img className='fallback-img' src={fallbackimage}></img>
        </div>
       
    </div>
  )
}
