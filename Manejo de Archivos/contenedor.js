const fs = require('fs')

class Contenedor {

    //constructor que recibe el nombre del archivo, productos.txt
    constructor(ruta){
        this.ruta = ruta
    }

    //TODO: VER que no se repita el producto
    //save(Object)
    async save(obj){
        //obtenemos todos los objetos
        const listado = await this.getAll() //[]

        //SI existe el producto no agregar nada
        if(listado.length > 0 && listado.some((el) => el.title === obj.title))
        {
            //throw new Error(`El producto ya se encuentra en el catalogo`)
            console.log("El producto ya se encuentra en el catalogo");
            return
        }

        //identificamos el ultimo id y lo incrementamos
        let nuevoId //= listado.length + 1

        //MANEJAR DOS CASOS
        //CASO1: NO HAY DATA
        if(listado.length == 0){
            nuevoId = 1
        }
        //SI HAY DATA [...] [1] => 0
        else {
            nuevoId = listado[listado.length - 1].id + 1
        }

        //ASIGNAR EL NUEVO ID A MI OBJETO
        const nuevoObjConID = {...obj, id: nuevoId}

        //INSERTAR MI OBJETO AL LISTADO
        listado.push(nuevoObjConID)

        //lo guardamos usando fs y try catch
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null ,2))
            return nuevoId
        } catch (error) {
            throw new Error(`Error al guardar un nuevo objeto: ${error}`)
        }
    }


    //function para obtener objetos usandy await/async
    //asumimos que tenemos el txt y que tiene data
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    //function para obtener un objeto por ID
    //TODO: Validar que devuelva el null
    async getById(id) {
        try {
            const listado = await this.getAll() //[]
            return listado.find(item => item.id === id) ?? null
        } catch (error) {
            //TODO: VALIDAR DEAD CODE 
            throw new Error(`No se encontro el dato: ${error}`)
        }
    }

    async deleteById(id) {
        const listado = await this.getAll() //[]

        //FILTRAMOS EL ID
        const nuevoListado = listado.filter( item=> item.id != id)

        //SOBREESCRIBIMOS LA DATA
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null ,2))
        } catch (error) {
            throw new Error(`No se pudo borrar la data: ${error}`)
        }
    }


    //function para borrar todo
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null ,2))
        } catch (error) {
            throw new Error(`No se pudo borrar la data: ${error}`)
        }
    }

}

module.exports = Contenedor