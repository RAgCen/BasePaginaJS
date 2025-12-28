import { getCarritoUsuario } from "./Estructuras/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
    const spanCarrito = document.getElementById("spanCarrito");
    if(spanCarrito){
        spanCarrito.textContent = getCarritoUsuario();
    }
})
