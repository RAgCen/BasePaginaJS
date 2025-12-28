import { getCarritoUsuario, guardarCarrito} from './Estructuras/Usuario.js'
import { buscarDescuentoCupon } from './Estructuras/Cupones.js'
import { productos } from './Estructuras/Productos.js'


let descuentoCupon = 0;
let subtotalGlobal = 0;


export function getTotalArticulos(){
    const carrito = getCarritoUsuario();
    return carrito.reduce((total, item) => total + item.cantidad, 0); // Toma un arreglo y comienza a eliminar elemento por elemento haciendo una suma de las cantidades
}


export function agregarProducto(idProducto, cantidad = 1, color){
    const carrito = getCarritoUsuario();

    carrito.push({
        id: idProducto,
        cantidad: cantidad,
        color: color
    });
    guardarCarrito(carrito);
    return carrito;
}


function actualizarCostos(idProducto, color, cantidad){
    const carrito = getCarritoUsuario();

    const idx = carrito.findIndex(item => item.id === idProducto && item.color === color);
    if(idx !== -1){
        carrito[idx].cantidad += cantidad
        guardarCarrito(carrito);
    }

    mostrarCarrito();
    actualizarBagde();
}


function mostrarCarrito(){
    const tablaBody = document.getElementById("cuerpoTabla");
    if(!tablaBody) return;

    const carrito = getCarritoUsuario();
    let idx = 1;
    let total = 0;

    tablaBody.innerHTML = '';

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if(!producto) return;

        const nombre = producto.nombre;
        const modelo = producto.modelo;
        const precio = producto.precio;
        let subtotal = item.cantidad * precio;

        const row = document.createElement('tr');
        const formatoMoneda = (valor) => `$${valor.toFixed(2)}`;

        row.innerHTML = `
            <th scope="row">${idx}</th>
            <td>
                <i class="fa-solid fa-box-open fa-3x bg-cartoon-box"></i>
            </td>
            <td class="text-start">${nombre} - ${modelo}: Caja de cartón de muestra resistente, ideal para 
                embalaje
            </td>
            <td>${formatoMoneda(precio)}</td>
            <td>
                <div class="d-flex justify-content-center align-items-center flex-column gap-1">
                    <span>${item.cantidad}</span>
                    <div class="d-flex flex-row gap-3">
                        <button class="btn btn-outline-success btn-sm rounded-circle btn-mas" data-id="${item.id}" data-color="${item.color}">
                            <i class="fa-solid fa-plus fa-lg"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-circle btn-menos" data-id="${item.id}" data-color="${item.color}">
                            <i class="fa-solid fa-minus fa-lg"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>${formatoMoneda(subtotal)}</td>
            <td>
                <div>
                    <img src="/imagenes/acciones/eliminar.png" width="27" height="27" style="cursor:pointer" 
                        class="btn-eliminar" data-id="${item.id}" data-color="${item.color}">
                </div>
            </td>
        `
        tablaBody.appendChild(row);
        total += subtotal;
        idx++;
    });

    subtotalGlobal = total;
    agregarEventos();
    actualizarTotales(carrito.length, total);
}


function agregarEventos(){
    const tablaBody = document.getElementById("cuerpoTabla");
    if(!tablaBody) return;

    tablaBody.onclick = (event) => {
        const target = event.target.closest('.btn-mas, .btn-menos, .btn-eliminar');
        if(target){
            const id = parseInt(target.dataset.id, 10);
            const color = target.dataset.color;
            
            if(target.classList.contains('btn-mas')){
                actualizarCostos(id, color, 1);
            } else if(target.classList.contains('btn-menos')){
                actualizarCostos(id, color, -1);
            }         
        }
    }
}


function aplicarCupon(){
    const inputCupon = document.getElementById("cupon-txt");
    const spanDescuento = document.getElementById("spanDescuento");
    const btnDescuento = document.getElementById("btn-dcto");
    const cuponTexto = inputCupon.value.toUpperCase().trim();

    if(cuponTexto === ""){
        Swal.fire({
            icon: "error",
            title: "Debe ingresar un cupón si quiere hacer válido el descuento",
            text: "Cupón no reconocido"
        });
        descuentoCupon = 0;
        mostrarCarrito();
        return;
    }

    const dctoPorcentaje = buscarDescuentoCupon(cuponTexto);
    console.log(buscarDescuentoCupon(cuponTexto))
    if(dctoPorcentaje > 0){
        descuentoCupon = dctoPorcentaje;
        spanDescuento.textContent = `${dctoPorcentaje}%`
    } else {
        descuentoCupon = 0;
    }
    mostrarCarrito();
}


function actualizarTotales(totalArticulos, totalCosto){
    const spanCantidad = document.getElementById("spanCantidad");
    const spanSubTotal = document.getElementById("spanSubtotal");
    const spanDescuento = document.getElementById("spanDescuento");
    const spanTotal = document.getElementById("spanTotal");

    const formatoMoneda = (valor) => `$${valor.toFixed(2)}`;
    const montoDescuento = totalCosto * (descuentoCupon / 100);
    const totalFinal = totalCosto - montoDescuento;

    if(spanCantidad) spanCantidad.textContent = totalArticulos;
    if(spanSubTotal) spanSubTotal.textContent = formatoMoneda(totalCosto);
    if(spanDescuento) spanDescuento.textContent = `${descuentoCupon} %`;
    if(spanTotal) spanTotal.textContent = formatoMoneda(totalFinal);;
}


function actualizarBagde(){
    const spanCarrito = document.getElementById("spanCarrito")
    if(spanCarrito){
        spanCarrito.textContent = getTotalArticulos();
    }
}


function finalizarCompra(){
    const totalArticulos = getTotalArticulos();

    Swal.fire({
        icon: 'success',
        title: '¡Compra Exitosa!',
        html: `Hemos procesado su pedido de <b>${totalArticulos} artículos</b>. <br>¡Pronto recibirá la confirmación de envío a su domicilio registrado!`,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = '../inicio.html';
    });

    localStorage.removeItem("carrito"); // Limpiar el carrito

    mostrarCarrito();
    actualizarBagde();
    descuentoCupon = 0;
    subtotalGlobal = 0;
}


document.addEventListener("DOMContentLoaded", () => {
    actualizarBagde();
    mostrarCarrito();

    const btnCupon = document.getElementById("btn-dcto");
    if(btnCupon){ btnCupon.addEventListener('click', aplicarCupon); }

    const btnFinalizar = document.getElementById("btn-fin");
    if(btnFinalizar){ btnFinalizar.addEventListener('click', finalizarCompra); }


    // Actualizar el badge del carrito en el inicio.html
    document.addEventListener("DOMContentLoaded", () => {
        const spanCarrito = document.getElementById("spanCarrito");
        if(spanCarrito){
            spanCarrito.textContent = getTotalArticulos();
        }
    })
});
