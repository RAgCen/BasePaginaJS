// Al hacer el import el archivo se convierte en un modulo
import { productos } from "./Estructuras/Productos"; 

export function mostrarProducto(categoria){
    const contenedor = document.getElementById("productosContainer");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    const categoriaNormalizada = categoria.toLowerCase().trim(); // Es para hacer minucula la palabra y eliminar espacios en blanco
    const productosFiltrados = productos.filter(p => p.categoria.toLowerCase().trim() === categoriaNormalizada);

    productosFiltrados.forEach(p => {
        const card = document.createElement("div");
        card.classlist.add("col"); // Agregar la clase "col" para el diseño responsivo

        card.innerHTML = `
            <div class="card border-2 shadow-sm p-4 h-100 text-center position-relative" data-aos="flip-up">
                <button class="btn btn-sm position-absolute top-0 end-0 m-2 p-0 bg-transparent border-0 jinfo-btn">
                    <img src="/imagenes/acciones/info.png" width="28" height="28" class="rounded-circle shadow-sm" alt="Info">
                </button>

                <i class="fa-solid fa-box-open fa-3x bg-cartoon-box mb-3"></i>

                <h5 class="fw-bold">${p.nombre}</h5>
                <p class="text-muted mb-1">Modelo: ${p.modelo}</p>
                <p class="fw-semibold text-success">$${p.precio.toFixed(2)} MXN</p>

                <div class="d-flex justify-content-center align-items-center gap-2">
                    <p class="mb-0">${p.estrellas} estrellas</p>
                    <div>
                        <img src="/imagenes/acciones/agregar.png" width="21" height="21" style="cursor:pointer;" alt="Agregar">
                    </div>
                </div>
            </div>`;
    });

    card.querySelector(".info-btn").addEventListener("click", () => {modal(p);})
    contenedor.appendChild(card);
}


function modal(producto) {
    const modal = document.getElementById("modalProducto");
    const titulo = modal.querySelector('.modal-body h5.fw-semibold');
    const nombreProducto = modal.querySelector('.modal-body h5.fw-bold');
    const modelo = modal.querySelector('.modal-body p.text-muted');
    const costo = modal.querySelector('.modal-body p span.text-success');
    const totalTienda = modal.querySelector('.modal-body p span.text-primary');
    const divButton = modal.querySelector('#contenedorImagen');
    const colorSelect = modal.querySelector('#colorSelect');

    if (titulo)titulo.textContent = producto.nombre;
    if (nombreProducto)nombreProducto.textContent = producto.nombre;
    if (modelo)modelo.textContent = producto.modelo;
    if (costo)costo.textContent = `$${producto.precio.toFixed(2)} MXN`;
    if (totalTienda)totalTienda.textContent = producto.cantidad; 
        
    divButton.innerHTML = 
        `<label for="quantity g-5">Añadir al carrito:</label>
        <img src="/imagenes/acciones/agregar.png" alt="Añadir al carrito" 
        width="22px" height="22px" class="me-5 btn-add-carrito" style="cursor: pointer;">`;
    
    const imagenCarrito = divButton.querySelector('.btn-add-carrito');

    async function handlerAgregarProductos() {
        imagenAccionCarrito.removeEventListener('click', handlerAgregarProductos);

        divButton.innerHTML = 
        `<label for="quantity g-5">Añadir al carrito:</label>
        <img src="/imagenes/gifs/procesando_2.gif" alt="Procesando" 
        width="22px" height="22px" class="me-5" style="cursor: wait;">`;
    
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Variables temporales sin uso

        const idProducto = producto.id;
        const cantidad = 1;
        const color = colorSelect.value;

        alert("Producto agregado al carrito correctamente.");
        divButton.innerHTML = 
        `<label for="quantity g-5">Producto agregado:</label>
        <img src="/imagenes/acciones/Ok.png" alt="Ok" 
        width="22px" height="22px" class="me-5 btn-add-carrito" style="cursor: default;">`;
    }

        imagenAccionCarrito.addEventListener('click', handlerAgregarProductos);
        const modalProducto = new bootstrap.Modal(modal);
        modalProducto.show();
}


document.addEventListener("DOMContentLoaded", () => {
    const color = document.getElementById("colorSelect");
    const icono = document.getElementById("iconoProducto");

    if(color && icono){
        color.addEventListener("change", () => {
            const hexColor = color.value;
            icono.style.color = `#${hexColor}`;
        })
    }

    const cbdescuento = document.querySelectorAll('input[name^="desc"]'); // ^= indica que no se llama así el objeto, pero tiene la palabra "desc" en su nombre
    cbdescuento.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            // this se refiere al mismo checkbox que se ha cambiado
            if (this.checked){ // Las únicas respuestas son true o false
                // Si se selecciona un checkbox, se entra en esta función para desmarcar los otros que no se hayan seleccionado
                // Esto obliga a seleccionar solo uno a la vez
                cbdescuento.foreach(otro =>{
                    if (this !== otro){
                        otro.checked = false;
                    }
                })

            }
        })
    })
})
