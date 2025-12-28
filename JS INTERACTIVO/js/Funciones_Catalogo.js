// Al hacer el import el archivo se convierte en un modulo
import { productos } from "./Estructuras/Productos.js"; 

import {getTotalArticulos, agregarProducto} from "./Funciones_Carrito.js";

export function mostrarProducto(categoria){
    const contenedor = document.getElementById("productosContainer");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    const categoriaNormalizada = categoria.toLowerCase().trim(); // Es para hacer minucula la palabra y eliminar espacios en blanco
    const productosFiltrados = productos.filter(p => p.categoria.toLowerCase().trim() === categoriaNormalizada);

    productosFiltrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("col"); // Agregar la clase "col" para el diseño responsivo

        card.innerHTML = `
            <div class="card border-2 shadow-sm p-4 h-100 text-center position-relative" data-aos="flip-up">
                <button class="btn btn-sm position-absolute top-0 end-0 m-2 p-0 bg-transparent border-0 info-btn">
                    <img src="/imagenes/acciones/info.png" width="28" height="28" class="rounded-circle shadow-sm" alt="Info">
                </button>

                <i class="fa-solid fa-box-open fa-3x bg-cartoon-box mb-3"></i>

                <h5 class="fw-bold">${p.nombre}</h5>
                <p class="text-muted mb-1">Modelo: ${p.modelo}</p>
                <p class="fw-semibold text-success">$${p.precio.toFixed(2)} MXN</p>

                <div class="d-flex justify-content-center align-items-center gap-2">
                    <p class="mb-0">${p.estrellas} estrellas</p>
                </div>
            </div>`;

            card.querySelector(".info-btn").addEventListener("click", () => {modal(p);})
            contenedor.appendChild(card)
    });

    if(typeof AOS !== 'undefined'){
        AOS.refreshHard(); // Actualiza AOS para aplicar las animaciones a los nuevos elementos
    }
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
    
    const imagenAccionCarrito = divButton.querySelector('.btn-add-carrito');

    async function handlerAgregarProductos() {
        imagenAccionCarrito.removeEventListener('click', handlerAgregarProductos);

        divButton.innerHTML = 
        `<label for="quantity g-5">Procesando</label>
        <img src="/imagenes/gifs/procesando_2.gif" alt="Procesando" 
        width="22px" height="22px" class="me-5" style="cursor: wait;">`;
    
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Variables temporales sin uso

        const idProducto = producto.id;
        const cantidad = 1;
        const color = colorSelect.value;

        agregarProducto(idProducto, cantidad, color)

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

    function aplicarFiltros(){
        const categoriaActivaElement = document.querySelector('.navbar-categorias .nav-linl.active'); // Selecciona el enlace de categoría activo
        const categoriaActiva = categoriaActivaElement ? categoriaActivaElement.dataset.categoria : "Electrónica"; // Si no hay categoría activa, se usa "Electrónica" por defecto

        const filtroEstrellas = document.getElementById("filtroEstrellas").value; // Obtener el valor seleccionado del filtro de estrellas
        const descuentoSeleccionado = Array.from(cbdescuento).find(cb => cb.checked); // Encuentra el checkbox seleccionado
        const rangoPrecio = document.getElementById("rangoPrecio").value; // Obtener el valor del rango de precios

        const estrellasMinimas = parseInt(filtroEstrellas, 10); // Convertir a número entero en base 10
        const precioMax = parseInt(rangoPrecio, 10); // Convertir a número entero en base 10

        // La siguiente validación asegura que al menos un filtro esté activo antes de aplicar los filtros
        const filtrosActivos = estrellasMinimas>0 || descuentoSeleccionado || precioMax > 0;
        if(!filtrosActivos){
            alert("Seleccione al menos un filtro para aplicar.");
            return;
        }

        let productosFiltrados = productos.filter(p => p.categoria.toLowerCase().trim() === categoriaActiva.toLowerCase().trim()); // Filtrar por categoría

        // ---------- Construcción de filtros ----------

        // Filtrar por estrellas
        if(estrellasMinimas > 0){
            productosFiltrados = productosFiltrados.filter(p => p.estrellas >= estrellasMinimas);
        }

        // Filtrar por descuento
        if(descuentoSeleccionado){
            let descMin = 0;
            let descMax = 0;
            const totalDesc = descuentoSeleccionado.id; // Obtener el id del checkbox seleccionado gracias a que se está trabajando con un array

            // Dependiendo el id del checkbox seleccionado, se asignan los valores mínimos y máximos de descuento
            if(totalDesc === "desc1"){
                descMin = 5; descMax = 10;
            }else if(totalDesc === "desc2"){
                descMin = 10; descMax = 15;
            }else if(totalDesc === "desc1"){
                descMin = 30; descMax = 60;
            }

            productosFiltrados = productosFiltrados.filter(p => p.descuento >= descMin && p.descuento <= descMax);
        }

        // Filtro por precio
        if(precioMax> 0){
            productosFiltrados = productosFiltrados.filter(p => p.precio <= precioMax);
        }

        const contenedor = document.getElementById("productosContainer");
        contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos



        // ---------- Mostrar productos filtrados ----------
        productosFiltrados.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("col"); // Agregar la clase "col" para el diseño responsivo

            card.innerHTML = `
                <div class="card border-2 shadow-sm p-4 h-100 text-center position-relative" data-aos="flip-up">
                    <button class="btn btn-sm position-absolute top-0 end-0 m-2 p-0 bg-transparent border-0 info-btn">
                        <img src="/imagenes/acciones/info.png" width="28" height="28" class="rounded-circle shadow-sm" alt="Info">
                    </button>

                    <i class="fa-solid fa-box-open fa-3x bg-cartoon-box mb-3"></i>

                    <h5 class="fw-bold">${p.nombre}</h5>
                    <p class="text-muted mb-1">Modelo: ${p.modelo}</p>
                    <p class="fw-semibold text-success">$${p.precio.toFixed(2)} MXN</p>

                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <p class="mb-0">${p.estrellas} estrellas</p>
                    </div>
                </div>`;

                card.querySelector(".info-btn").addEventListener("click", () => {modal(p);})
                contenedor.appendChild(card)
        });

        if(typeof AOS !== 'undefined'){
            AOS.refreshHard(); // Actualiza AOS para aplicar las animaciones a los nuevos elementos
        }

    }

    function limpiarFiltros(){
        document.getElementById("filtroEstrellas").value = "0"; // Reiniciar el filtro de estrellas

        const cbdescuento = document.querySelectorAll('input[name^="desc"]'); // ^= indica que no se llama así el objeto, pero tiene la palabra "desc" en su nombre
        cbdescuento.forEach(cb => {
            cb.checked = false; // Desmarcar todos los checkboxes de descuento
        });
        const precioSpan = document.getElementById("valorPrecio");
        if(precioSpan){
            precioSpan.textContent = "$0 MXN"; // Reiniciar el texto del rango de precios
        }

        const categoriaActivaElement = document.querySelector('.navbar-categorias .nav-linl.active'); // Selecciona el enlace de categoría activo

        mostrarProducto(categoriaActivaElement.trim()); // Mostrar productos de la categoría activa sin filtros
    }

    // ---------- Asignación de eventos a los botones ----------
    const botonFiltro = document.getElementById("btn-filtrar");
    if(botonFiltro)botonFiltro.addEventListener("click", aplicarFiltros);

    const botonLimpiar = document.getElementById("btn-limpiar");
    if(botonLimpiar)botonLimpiar.addEventListener("click", limpiarFiltros);


    // ---------- Actualización del valor del rango de precios del slider ---------
    const rangoPrecio = document.getElementById("rangoPrecio");
    const valorPrecio = document.getElementById("valorPrecio");

    if(rangoPrecio && valorPrecio){
        rangoPrecio.addEventListener("input", function(){ actualizarValorPrecio(this.value); });

        function actualizarValorPrecio(valor){
            const valorFinal = parseInt(valor, 10);

            // Estructura correcta de moneda mexicana
            const formatter = new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                maximumFractionDigits: 0, // Sin fracciones
            });

            if(valorFinal >= 10000){
                valorPrecio.textContent = `${formatter.format(10000)}+ MXN`;
            }else{
                valorPrecio.textContent = `${formatter.format(valorFinal)} MXN`;
            };
        }
    }

    // Actualizar el badge del carrito en el inicio.html
    const spanCarrito = document.getElementById("spanCarrito");
    if(spanCarrito){
        spanCarrito.textContent = getTotalArticulos();
    }
})