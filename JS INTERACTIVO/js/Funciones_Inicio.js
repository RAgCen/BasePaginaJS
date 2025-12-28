import { getTotalArticulos } from './Funciones_Carrito.js'

document.addEventListener("DOMContentLoaded", () => {
    const spanCarrito = document.getElementById("spanCarrito");
    if(spanCarrito){
        spanCarrito.textContent = getTotalArticulos();
    }
});