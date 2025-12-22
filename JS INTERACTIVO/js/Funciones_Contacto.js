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
    selectDestino.innerHTML=`<option value= "" selected disabled>Selecciona una opción</option>`; // .innerHTML sirve para colocar algo en el código de HTML de manera "forzada"

    const listaDelegaciones = getDelegaciones(estado);

    listaDelegaciones.forEach(d => {
        const option = document.createElement("option") // .createElement lo que hace a nivel HTML es crear un <option></option>
        option.value = d.idDelegacion; // <option value="d.idDelegacion"></option>
        option.text = d.nombre; // <option value="d.idDelegacion">d.nombre</option>

        selectDestino.appendChild(option); // .appendChild sirve para agregar un elemento hijo a otro elemento padre. Se usa en lugar de .innerHTML para no sobreescribir todo el contenido existente
    })
}



document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("estado").addEventListener("change", () =>{
        motrarDivDelegacion();
        cargarDelegaciones();
    });
});