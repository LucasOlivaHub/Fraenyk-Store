export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


export function validarNumeros(input) {
    // var regex = /^[0-9]+$/; // Expresión regular para verificar si solo contiene números
     var regex = /^\d+$/;
     return regex.test(input);
}
   
export function validarLetras(input) {
     // var regex = /^[0-9]+$/; // Expresión regular para verificar si solo contiene letras y/o espacios
      var regex = /^[a-zA-Z\s]+$/;
      return regex.test(input);
}

export function validarEmail(email) {
    // Expresión regular para validar direcciones de correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (regex.test(email)) {
      return true; // El correo electrónico es válido
    } else {
      return false; // El correo electrónico no es válido
    }
  }