let usuario = {
    nombre: "Rodrigo",
    correo: "ejemplo@gmail.com",
    carrito: []
}

// Mi primer módulo en JavaScript

// Las funciones permiten obtener los datos del usuario
// Los return pueden o no llevar punto y coma
export function getNombreUsuario() { return usuario.nombre; }
export function getCorreoUsuario() { return usuario.correo }
export function getCarritoUsuario() { return usuario.carrito; }

// El export indica que la función o variable puede ser utilizada en otros archivos