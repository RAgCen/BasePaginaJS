/*const delegacion = {
    idDelegacion: 0,   // Int
    nombre: "",        // String
    abreviatura: "",   // String
    estado: ""         // String 
}*/

let delegaciones = [
    {idDelegacion: 1, nombre: "Álvaro Obregón", abreviatura: "AO", estado: "CDMX"},
    {idDelegacion: 2, nombre: "Azcapotzalco", abreviatura: "AZC", estado: "CDMX"},
    {idDelegacion: 3, nombre: "Benito Juárez", abreviatura: "BJ", estado: "CDMX"},
    {idDelegacion: 4, nombre: "Coyoacán", abreviatura: "COYO", estado: "CDMX"},
    {idDelegacion: 5, nombre: "Cuajimalpa", abreviatura: "CUA", estado: "CDMX"},
    {idDelegacion: 6, nombre: "Cuauhtémoc", abreviatura: "CTM", estado: "CDMX"},
    {idDelegacion: 7, nombre: "Gustavo A. Madero", abreviatura: "GAM", estado: "CDMX"},
    {idDelegacion: 8, nombre: "Iztacalco", abreviatura: "IZC", estado: "CDMX"},
    {idDelegacion: 9, nombre: "Iztapalapa", abreviatura: "IZT", estado: "CDMX"},
    {idDelegacion: 10, nombre: "Magdalena Contreras", abreviatura: "MC", estado: "CDMX"},
    {idDelegacion: 11, nombre: "Miguel Hidalgo", abreviatura: "MH", estado: "CDMX"},
    {idDelegacion: 12, nombre: "Milpa Alta", abreviatura: "MA", estado: "CDMX"},
    {idDelegacion: 13, nombre: "Tláhuac", abreviatura: "TLA", estado: "CDMX"},
    {idDelegacion: 14, nombre: "Tlalpan", abreviatura: "TLP", estado: "CDMX"},
    {idDelegacion: 15, nombre: "Venustiano Carranza", abreviatura: "VC", estado: "CDMX"},
    {idDelegacion: 16, nombre: "Xochimilco", abreviatura: "XOCH", estado: "CDMX"},
    {idDelegacion: 17, nombre: "Amecameca", abreviatura: "ADJ", estado: "EDOMEX"},      // 16
    {idDelegacion: 18, nombre: "Atlacomulco", abreviatura: "15014", estado: "EDOMEX"},
    {idDelegacion: 19, nombre: "Cuautitlán Izcalli", abreviatura: "IZCALLI", estado: "EDOMEX"},
    {idDelegacion: 20, nombre: "Ecatepec", abreviatura: "ECATEPEC", estado: "EDOMEX"},
    {idDelegacion: 21, nombre: "Naucalpan", abreviatura: "057", estado: "EDOMEX"},
    {idDelegacion: 22, nombre: "Nezahualcóyotl", abreviatura: "NEZA", estado: "EDOMEX"},
    {idDelegacion: 23, nombre: "Texcoco", abreviatura: "15099", estado: "EDOMEX"},
    {idDelegacion: 24, nombre: "Toluca", abreviatura: "ZMT", estado: "EDOMEX"},
    {idDelegacion: 25, nombre: "Querétaro", abreviatura: "QRO", estado: "QRO"}
]


/*
const sucursal = {
    idSucursal: null,    // Int
    estado: "",          // String
    idDelegacion: null,  // Int
    ubicacion: "",       // String
    diasLaborales: "",   // String
    horasLaborales: "",  // String
    correo: "",          // String
    telefono: ""         // String
}*/


let sucursales = [
    {idSucursal: 1, estado: "CDMX", idDelegacion: 1,  ubicacion: "Calle 01", diasLaborales: "Lunes a Viernes", 
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb1@example.com", telefono: "55 1234 5678"},
    {idSucursal: 2, estado: "CDMX", idDelegacion: 3,  ubicacion: "Calle 321", diasLaborales: "Lunes a Sábado", 
        horasLaborales: "9:00 - 17:00 hrs", correo: "sucursalbbb2@example.com", telefono: "55 1234 5678"},
    {idSucursal: 3, estado: "CDMX", idDelegacion: 4,  ubicacion: "Calle 57", diasLaborales: "Lunes a Domingo", 
        horasLaborales: "11:00 - 16:00 hrs", correo: "sucursalbbb3@example.com", telefono: "55 1234 5678"},
    {idSucursal: 4, estado: "CDMX", idDelegacion: 6,  ubicacion: "Calle 74", diasLaborales: "Martes a Sábado", 
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb4@example.com", telefono: "55 1234 5678"},
    {idSucursal: 5, estado: "CDMX", idDelegacion: 9,  ubicacion: "Calle 123", diasLaborales: "Lunes a Viernes",    
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb5@example.com", telefono: "55 1234 5678"},
    {idSucursal: 6, estado: "CDMX", idDelegacion: 12, ubicacion: "Calle 65", diasLaborales: "Lunes a Viernes", 
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb6@example.com", telefono: "55 1234 5678"},
    {idSucursal: 7, estado: "CDMX", idDelegacion: 16, ubicacion: "Calle 11", diasLaborales: "Lunes a Sábado", 
        horasLaborales: "9:00 - 17:00 hrs", correo: "sucursalbbb7@example.com", telefono: "55 1234 5678"},
    {idSucursal: 8, estado: "EDOMEX", idDelegacion: 17, ubicacion: "Calle 245", diasLaborales: "Lunes a Viernes", 
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb8@example.com", telefono: "55 1234 5678"},
    {idSucursal: 9, estado: "EDOMEX", idDelegacion: 18, ubicacion: "Calle 146", diasLaborales: "Lunes a Sábado", 
        horasLaborales: "9:00 - 17:00 hrs", correo: "sucursalbbb9@example.com", telefono: "55 1234 5678"},
    {idSucursal: 10, estado: "EDOMEX", idDelegacion: 19, ubicacion: "Calle 50", diasLaborales: "Lunes a Viernes", 
        horasLaborales: "10:00 - 18:00 hrs", correo: "sucursalbbb10@example.com", telefono: "55 1234 5678"},
    {idSucursal: 11, estado: "EDOMEX", idDelegacion: 20, ubicacion: "Calle 34", diasLaborales: "Martes a Domingo", 
        horasLaborales: "10:00 - 17:00 hrs", correo: "sucursalbbb11@example.com", telefono: "55 1234 5678"},
    {idSucursal: 12, estado: "QRO", idDelegacion: 25, ubicacion: "Privada 5 Calle 2", diasLaborales: "Lunes a Viernes", 
        horasLaborales: "12:00 - 21:00 hrs", correo: "sucursalbbb12@example.com", telefono: "55 1234 5678"}
];


export function getDelegaciones(estado){
    /*
        == : buscar dos elementos que son iguales en valor, pero no necesariamente del mismo tipo.
        === : buscar dos elementos que son iguales en valor y del mismo tipo.
    */

    return delegaciones.filter(d => d.estado === estado).map(d =>({
        idDelegacion: d.idDelegacion,
        nombre: d.nombre
    }));
}

export function buscarPorEstado(estado){
    const resultado=sucursales.filter(s => s.estado === estado).map(s =>{
        // .find se encarga de buscar un solo elemento que cumpla con la condicion
        const delegacion = delegaciones.find(d => d.idDelegacion === s.idDelegacion); // Acceso a la estructura delegaciones desde sucursal usando delegacion

        return {
            idSucursal: s.idSucursal,
            estado: s.estado,
            delegacion: delegacion?.nombre || "No encontrado", // Operador de encadenamiento opcional, puede o no estar, en caso de no encontrar muestra el string
            abreviatura: delegacion?.abreviatura || "N.A",
            ubicacion: s.ubicacion,
            diasLaborales: s.diasLaborales,
            horasLaborales: s.horasLaborales,
            correo: s.correo,
            telefono: s.telefono
        }
        // En bases de datos, las se usa JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN para unir tablas relacionadas
    });
    return resultado
}


export function buscarPorEstadoDelegacion(estado, idDeleg){
    const resultado = sucursales.filter(s => s.estado === estado).map(s =>{
        // .find se encarga de buscar un solo elemento que cumpla con la condicion
        const delegacion = delegaciones.find(d => d.idDelegacion === s.idDelegacion); // Acceso a la estructura delegaciones desde sucursal usando delegacion

        return {
            idSucursal: s.idSucursal,
            idDelegacion: s.idDelegacion, // En este caso se usa el id de la delegación para comparar y hacer el filtrado posterior
            estado: s.estado,
            delegacion: delegacion?.nombre || "No encontrado", // Operador de encadenamiento opcional, puede o no estar, en caso de no encontrar muestra el string
            abreviatura: delegacion?.abreviatura || "N.A",
            ubicacion: s.ubicacion,
            diasLaborales: s.diasLaborales,
            horasLaborales: s.horasLaborales,
            correo: s.correo,
            telefono: s.telefono
        };
            // En bases de datos, las se usa JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN para unir tablas relacionadas
    }).filter(s => s.idDelegacion == idDeleg)
    // console.log(resultado); Para verificar si el arreglo está vacío o no
    return resultado;
}
