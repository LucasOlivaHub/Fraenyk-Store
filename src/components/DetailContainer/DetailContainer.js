import React, { useContext, useEffect, useState } from 'react'
import { pedirProductoPorId } from '../../helpers/pedirDatos'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { storeContext } from '../../Context/StoreContext';
import { ItemsList } from '../IndexContainer/ItemsList/ItemsList';
import { Item } from '../IndexContainer/Item/Item';

export const DetailContainer = () => {
    const [producto, setProducto] = useState();
    const [color, setColor] = useState();
    const [talle, setTalle] = useState();
    const [imagenMostrada, setImagenMostrada] = useState()
    const id = useParams().id;
    const [cantidadProd, setCantidadProd] = useState(1); 

    const errorCantidadMsg = document.querySelector(".cantidad-detalles-container .error-msg");
    const btnAñadirCart = document.querySelector(".comprar-btn");

    const {prods, cartProds, setCartProds} = useContext(storeContext);
    const prodsCopia = [...prods]

    //Setear el contexto a la carpeta assets para buscar imagenes desde ahí
    const productImages = require.context('../../assets/productos', true);
    /* Luego, tanto en setImagenMostrada como en los src={} de las imagenes hay que buscar la imagen
    desde "productImages(`./${}`)"
    Si quiero cambiar esto, simplemente borro "productImages()" del src o del setImagenMostrada e
    ingreso la nueva ruta*/
    
    useEffect(() => {
        window.scrollTo(0, 0);

        pedirProductoPorId(Number(id))
        .then(prod => {
            setProducto(prod);
        })

        if(producto) {
           setColor(producto.coloresCss[0]);
           setTalle(producto.talles[0]);
           setImagenMostrada(productImages(`./${Array.isArray(producto.imagen) ? producto.imagen[0] : producto.imagen}`));

            const sizeBoxes = document.querySelectorAll(".p-talle-box");
            const colorBoxes = document.querySelectorAll(".p-color-box");  
            colorBoxes[0].classList.add("selected")
            sizeBoxes[0].classList.add("selected")
        }
    }, [producto, id])

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1); // Retrocede una página en la historia
    };

    function handleColorBox(color) {
        return {
            backgroundColor: color
        }
    }

    function selectColor(element, selectedColor) {  
        const colorBoxes = document.querySelectorAll(".p-color-box");    
        colorBoxes.forEach(c => {
            c.classList.remove("selected")
            if (c === element) {
                c.classList.add("selected")
            }
        } );
        setColor(selectedColor);
    }

    function selectSize(element, selectedSize) {
        const sizeBoxes = document.querySelectorAll(".p-talle-box");
        sizeBoxes.forEach(s => {
            s.classList.remove("selected")
            if (s === element) {
                s.classList.add("selected")
            }
        } );
        setTalle(selectedSize);
    }

    function handleAdd() {
        if(cantidadProd >= 1 && cantidadProd <= 30) {
            errorCantidadMsg.classList.add("disabled");
            if (cartProds.some(p => p.id === producto.id && p.talleElegido === talle && p.colorElegido === color)) {
                const updatedCartProds = cartProds.map(p => {
                    if (p.id === producto.id && p.talleElegido === talle && p.colorElegido === color) {
                        return { ...p, cantidad: p.cantidad + Number(cantidadProd) };
                    } else {
                        return p;
                    }
                });
                setCartProds(updatedCartProds);
            } else {
                const newProduct = {
                    ...producto,
                    talleElegido: talle,
                    colorElegido: color,
                    cantidad: Number(cantidadProd),
                };
                setCartProds([...cartProds, newProduct]);
            }

            //Añadir al carrito boton OK
            btnAñadirCart.classList.add("comprar-ok")
            btnAñadirCart.disabled = true;
            btnAñadirCart.innerHTML = `¡Añadido! <i class="bi bi-check2"></i>`

            //Resetear el boton
            setTimeout(() => {
                resetearBoton()
            }, 2000);
        } else {
            btnError()
        }
    }

    function handleCantidad(cantidad) {
            if (cantidad >= 0 && cantidad !== "0" 
            && cantidad <= 30) {
                setCantidadProd(cantidad) 
                resetearBoton();
            } else if (cantidad === "0") {
                setCantidadProd(1)
                resetearBoton();
            } else if (cantidad > 30 || !isNaN(cantidad)) {
                setCantidadProd(cantidad)
                btnError()
            }
    }

    function handleRestar() {
        if (cantidadProd > 1 ) {
          setCantidadProd(cantidadProd - 1)
        } 
      }
    
      function handleSumar() {
        setCantidadProd(Number(cantidadProd) + 1)
      }

    function btnError() {
            //Boton no ok
            btnAñadirCart.classList.add("comprar-wrong")
            errorCantidadMsg.classList.remove("disabled");
            btnAñadirCart.innerHTML = `No se puede añadir <i class="bi bi-emoji-frown-fill"></i>`
    }

    function resetearBoton() {
            btnAñadirCart.classList.remove("comprar-ok");
            btnAñadirCart.classList.remove("comprar-wrong");
            btnAñadirCart.innerHTML = `Añadir al carrito`;
            btnAñadirCart.disabled = false;
            errorCantidadMsg.classList.add("disabled");
    }

  return (
    <div className='detalles-container'>
        <button className='volver-btn' onClick={handleGoBack}>Volver</button>
        
        {producto && (
        <article className='detalles-producto'>
            <div className='detalles-imgs-container'>
                <img src={imagenMostrada} className='detalles-img' alt='producto'/>
                <div className='detalles-moreimgs-container'>
                  {Array.isArray(producto.imagen) && producto.imagen.map(i => {
                    return <img key={i} src={productImages(`./${i}`)} className='detalles-moreimgs' onClick={() => setImagenMostrada(productImages(`./${i}`))}></img>
                  })}
                </div>
            </div>
     
                <div className='detailscontent-container'>
                    <div className='detalles-texto'>
                        <h2 className='p-nombre'>{producto.nombre}</h2>
                        <p className='p-desc-container'>{producto.descripcion}</p>
                        <span className='p-precio'><b>${producto.precio}</b></span>


                        <section className='p-detallesconfig-container'>
                            <div> 
                                <div className='p-color-container'>Colores: 
                                    <div className='colores opciones'>
                                        {producto.coloresCss.map(c => <span key={c} className='p-color-box' onClick={(e) => selectColor(e.currentTarget, c)} style={handleColorBox(c)}></span>)}
                                    </div>
                                </div>
                                <div className='p-talle-container'>Talles: 
                                    <div className='talles opciones'>
                                        {producto.talles.map(t => <span key={t} className='p-talle-box'  onClick={(e) => selectSize(e.currentTarget, t)}>{t}</span>)}
                                    </div>
                                </div>
                            </div>

                            <div className='cantidad-detalles-container'>
                                Cantidad:
                                <div className='cantidad-p-detalles'>
                                <i className="bi bi-dash restar" onClick={() => handleRestar()}></i>
                                <input type='number' step={1} 
                                onKeyDown={e => (isNaN(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") && e.preventDefault()} 
                                onChange={e => handleCantidad(e.target.value)} value={cantidadProd} min={1} className='p-cantidad'/>
                                <i className="bi bi-plus-lg sumar" onClick={() => handleSumar()}></i>
                                </div>
                                <span className='error-msg disabled'>La cantidad debe estar entre 1 y 30 productos</span>
                            </div>
                        </section>

                    </div>
                    <button onClick={handleAdd} className='comprar-btn'>Añadir al carrito</button>

                    {cartProds.length > 0 && 
                        <button onClick={e => {
                            e.preventDefault()
                            navigate("/carrito")
                            }} className='vercarrito-btn'>Ver mi carrito <i className="bi bi-cart4"></i>
                        </button>
                    }
                </div>
        </article>
        )}

        
        {producto && 
        <div className='details-masprods-container'>
            <br/>
            <p><b>Productos relacionados</b></p>
            <div className='masprods-container'>
                {prodsCopia.map(p => ((p.categoria === producto.categoria) && (p.id !== producto.id)) 
                    &&
                    <Link to={`/product/${p.id}/${p.nombre}`} key={p.id} onClick={() => setProducto(p)} className='producto-link'>
                        <article className='producto'>
                            <img src={productImages(`./${Array.isArray(p.imagen) ? p.imagen[0] : p.imagen}`)} className='producto-img'/>
                            <div className='producto-texto-imagen'>
                                    <h2 className='producto-nombre'>{p.nombre}</h2>
                                    <b className='producto-precio'>$ {p.precio}</b>
                            </div>
                        </article>
                    </Link>
                    )}
            </div>
        </div>
       }

    </div>
  )
}
