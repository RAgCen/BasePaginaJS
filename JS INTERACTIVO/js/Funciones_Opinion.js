import { getNombreUsuario, getCorreoUsuario} from "./Estructuras/Usuario.js";

import { getTotalArticulos } from "./Funciones_Carrito.js";

// usuario
function rellenarDatos(){
    document.getElementById("usuario").value = getNombreUsuario();
    document.getElementById("correo").value = getCorreoUsuario();
    const hoy = new Date();
    document.getElementById("fecha").value = hoy.toLocaleDateString('es-MX');
}
// Esto ya es un módulo porque getNombreUsuario es importados de otro archivo que es un módulo


function mostrarTabla(){
    let divTabla = document.getElementById("contenedorTabla");
    let categoria = document.getElementById("categoria").value;

    // Con base en el select, se esconde o se muestra la tabla
    if(categoria != "0"){
        divTabla.style.display = "block";
    }else{
        divTabla.style.display = "none";
    }
}


function obtenerValoresFormulario(){
    const datos = {
        calidad: document.querySelector('input[name="quality"]:checked')?.value,
        servicio: document.querySelector('input[name="service"]:checked')?.value,
        variedad: document.querySelector('input[name="variety"]:checked')?.value,
        valor: document.querySelector('input[name="value"]:checked')?.value,
        especificaciones: document.querySelector('input[name="specifications"]:checked')?.value,
        mejoras: Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')).map(cb => cb.value) // .map busca los valores y los sustituye (aplica una transformación)
    }
    return datos
}

function validarFormulario(){
    const datos = obtenerValoresFormulario();

    if(!datos.calidad || !datos.servicio || !datos.variedad || !datos.valor || !datos.especificaciones || datos.mejoras.length == 0){
        //alert("Por favor, completa todos los campos del formulario antes de enviarlo.");
        Swal.fire({ // Hace alertas más bonitas
            icon: "error",
            title: "Datos faltantes",
            text: "Por favor, completa todos los campos del formulario antes de enviarlo."
        });
        return;
    }else{
        //alert("¡Gracias por tu opinión!");
        Swal.fire({ // Hace alertas más bonitas
            icon: "question",
            title: "¿Deseas enviar la encuesta?",
            showCancelButton: true,
            confirmButtonText: "Sí, enviar",
            cancelButtonText: "Cancelar"
        }).then((resultado) => { // .then es para mostrar un resultado de acuerdo a lo que el usuario elija
            if (resultado.isConfirmed) {enviarEncuesta();}

        })
        return;
    }
}

// Función que se llama cuando se ha presionado el boton de enviar
function enviarEncuesta(){
    Swal.fire({
        icon: "question",
        title: "Encuesta enviada",
        text: "Su respuesta ha sido registrada. ¡Gracias por tu tiempo!",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1813b8ff"
    });
    limpiarFormulario();
}

// Función para limpiar los campos de llenado
function limpiarFormulario(){
    let divTabla = document.getElementById("contenedorTabla");
    divTabla.style.display = "none"; // Se esconde la tabla otra vez
    document.getElementById("categoria").value = "0"; // No se selecciona ninguna categoría
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false); // Se deseleccionan los radios (opciones de la tabla)
    document.querySelectorAll('input[type="checkbox"]').forEach(box => box.checked = false); // Se deseleccionan los radios (opciones de la tabla)

}



document.addEventListener("DOMContentLoaded", () => {
    rellenarDatos();
    mostrarTabla();

    document.getElementById("categoria").addEventListener("change", mostrarTabla);
    document.getElementById("btn-enviar").addEventListener("click", validarFormulario);
    document.getElementById("btn-limpiar").addEventListener("click", limpiarFormulario);

    // Actualizar el badge del carrito en el inicio.html
    const spanCarrito = document.getElementById("spanCarrito");
    if(spanCarrito){
        spanCarrito.textContent = getTotalArticulos();
    }
})
