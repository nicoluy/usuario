const Contenedor = require('./contenedor.js')
const log = (p) => console.log(p)
//DATOS DE PRUEBA
const item1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}

const item2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
  
const item3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
}

const item4 = {
    title: "Escuadra",
    price: 12343,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}

async function main() {
    //CREANDO INSTANCIA
    const contenedor = new Contenedor('./productos.txt')

    //DATA DEBERIA ESTAR VACIA => []
    let datos1 = await contenedor.getAll()
    log(datos1)

    //DEBE TENER 1 ELEMENTO Y RETORNAR 1 (ARCHIVO DEBE CREARSE)
    let id1 = await contenedor.save(item1)
    log(id1)

    //DEBE TENER 2 ELEMENTO Y RETORNAR 2
    let id2 = await contenedor.save(item2)
    log(id2)

    //DATA DEBERIA TENER DOS ELEMENTOS 2
    let datos2 = await contenedor.getAll()
    log(datos2)

    //BUSCAR POR ID 1// NAME debe ser escuadra
    let busca1 = await contenedor.getById(1)
    log(busca1)

    //BUSCAR POR ID QUE NO EXISTE
    let busca2 = await contenedor.getById(10)
    log(busca2)

    //DEBE SALIR UN MENSAJE DE ERROR
    let id3 = await contenedor.save(item4)
    log(id3)

    //BORRAR EL ID 1, deberia tener 1 elemento, solamente el id 2
    await contenedor.deleteById(1)
    let delete1 = await contenedor.getAll()
    log(delete1)

    //BORRAR TODO no deberia tener elementos
    await contenedor.deleteAll()
    let delete2 = await contenedor.getAll()
    log(delete2)

}

main() 