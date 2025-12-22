import { getDelegaciones, buscarPorEstado, buscarPorEstadoDelegacion } from "./Estructuras/Sucursales.js"; // Al hacer el import el archivo se convierte en un modulo

function getEstado(){return document.getElementById("estado").value;}
function getDelegacion(){return document.getElementById("delegacion").value;}


function motrarDivDelegacion(){
    let divContenedor=document.getElementById("divDelegacion");
    const estado = getEstado();
    if(estado=="CDMX" || estado=="EDOMEX" || estado=="QRO"){
        divContenedor.style.display="block";
    }else{
        divContenedor.style.display="none";
    }
}


function cargarDelegaciones(){
    const estado = getEstado();
    const selectDestino = document.getElementById("delegacion");
    selectDestino.innerHTML=`<option value= "" selected selected>Selecciona una opción</option>`; // .innerHTML sirve para colocar algo en el código de HTML de manera "forzada"

    const listaDelegaciones = getDelegaciones(estado);

    listaDelegaciones.forEach(d => {
        const option = document.createElement("option") // .createElement lo que hace a nivel HTML es crear un <option></option>
        option.value = d.idDelegacion; // <option value="d.idDelegacion"></option>
        option.text = d.nombre; // <option value="d.idDelegacion">d.nombre</option>

        selectDestino.appendChild(option); // .appendChild sirve para agregar un elemento hijo a otro elemento padre. Se usa en lugar de .innerHTML para no sobreescribir todo el contenido existente
    })
}



function validarBusqueda(){
    const estado = getEstado(); // Obligatorio para la búsqueda
    const delegacion = getDelegacion(); // Opcional para la búsqueda

    // Si el valor de un select es "", null, undefined, 0, NaN, false, se considera falso, en caso contrario verdadero
    if(!estado){
        Swal.fire({ // Hace alertas más bonitas
            icon: "error",
            title: "Búsqueda incorrecta",
            text: "Debes seleccionar un estado"
        });
        return;
    }else{
        if(!delegacion){
            const resultado = buscarPorEstado(estado);
            cargarTabla(resultado);
            return;
        }
        const resultado = buscarPorEstadoDelegacion(estado, delegacion);
        cargarTabla(resultado);
    }
}


function cargarTabla(lista){
    const tbodyDestino=document.getElementById("tbody-sucursales");
    tbodyDestino.innerHTML=""; // Limpiar el contenido previo de la tabla

    if(lista.length==0){
        // colspan sirve para unir varias columnas en una sola
        // text-center sirve para centrar el texto dentro de una celda
        // py-3 sirve para agregar padding vertical (arriba y abajo) de 1rem (16px). Se deja que Bootstrap haga el trabajo para no tener que usar CSS personalizado y se pueda visualizar la página en diferentes dispositivos
        tbodyDestino.innerHTML=`
            <tr>
                <td colspan="6" class="text-center" py-3>No se encontraron sucursales que coincidan con los criterios de búsqueda.</td>
            </tr>
        `;
    }

    // s -> sucursal encontrada
    // index -> posición en la lista
    lista.forEach((s, index) => {
        // Uso de template literals (``) para facilitar la construcción de cadenas multilínea y la inclusión de variables
        // ${} sirve para insertar el valor de una variable dentro de un template literal
        tbodyDestino.innerHTML+=`
            <tr class="align-middle">
                <th scope="row" class="text-center">${index + 1}</th>
                <th scope="row">${s.estado}</th>
                <th scope="row">${s.delegacion} (${s.abreviatura})</th>
                <th scope="row">${s.ubicacion}</th>
                <th scope="row">${s.diasLaborales}
                    <br> ${s.horasLaborales}
                </th>
                <th scope="row" class="text-center">
                    <img src="/imagenes/acciones/contacto.png" width="32px" style="cursor:pointer;">
                </th>
            </tr>
        `
    })
}


document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("estado").addEventListener("change", () =>{
        motrarDivDelegacion();
        cargarDelegaciones();
    });
    document.getElementById("btn-buscar").addEventListener("click", validarBusqueda)
});
