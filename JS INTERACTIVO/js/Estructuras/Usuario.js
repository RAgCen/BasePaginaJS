let usuario = {
    nombre: "Rodrigo",
    correo: "ejemplo@gmail.com",
    carrito: []
}

// Las funciones permiten obtener los datos del usuario
// Los return pueden o no llevar punto y coma
export function getNombreUsuario() { return usuario.nombre; }
export function getCorreoUsuario() { return usuario.correo }
// export function getCarritoUsuario() { return usuario.carrito; }

// El export indica que la función o variable puede ser utilizada en otros archivos

// Mi primer Modulo

const KEY_CARRITO = "carrito";

export function getCarritoUsuario(){
    const carritoJSON = localStorage.getItem(KEY_CARRITO); // Obtener el carrito almacenado en localStorage
    return carritoJSON ? JSON.parse(carritoJSON) : []; // Si no existe, retorna un arreglo vacío
}

export function guardarCarrito(carrito){
    // Cada que se agrega un elemento se actualiza el localStorage
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito)); // Guardar el carrito en localStorage como una cadena JSON
}