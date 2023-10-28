import data from '../data/products.json'

export default function pedirDatos(datos) {

    return new Promise ((resolve, reject) => {
        resolve(datos)
        reject({
            error: "No se encontraron los productos"
        })
    })
}

export function pedirProductoPorId(id) {
    return new Promise ((resolve, reject) => {
       const prod = data.find(p => p.id === id);
        if(prod) {
       // console.log(prod)
        resolve(prod)
        } else {
            reject({
                error: "No se encontró el producto"
            })
        }
    })
}
