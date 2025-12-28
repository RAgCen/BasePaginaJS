const cupones = [
    {valor: "ABCD1234", descuento: 15},
    {valor: "AEIO9876", descuento: 30},
    {valor: "WXYZ1357", descuento: 20},
    {valor: "12345678", descuento: 10},
    {valor: "87654321", descuento: 5},
    {valor: "WASD2468", descuento: 28},
    {valor: "HOLA4567", descuento: 50},
]


export function buscarDescuentoCupon(cupon){
    const encontrado = cupones.find(item => { 
        return item.valor.toUpperCase().trim() === cupon.toUpperCase().trim(); 
    })

    if(encontrado){ return encontrado.descuento; }
    else{ return 0; }
}
