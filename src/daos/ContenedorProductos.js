const { options } = require('../../options/mariaDB')
const knex = require('knex')(options)

class ContenedorProductos {

    constructor() {
        this.crearTabla();
        this.listaproductos = []
    }

    async crearTabla() {
        
        try {

            await knex.schema.hasTable('productos').then(function (exists) {
                if (!exists) {

                    knex.schema.createTable('productos', table => {
                        table.increments()
                        table.string('title')
                        table.string('price')
                        table.string('thumbnail')   
                    })
                        .then(console.log("tabla productos creada"))
                        .catch((err) => { console.log(err); throw err })
                        .finally(() => { knex.destroy() })
            

                    console.log('Tabla productos creada!');
                }
                else
                {console.log('La tabla productos ya existe!');}
            })
        } catch (error) {
            console.log(error);
        }
    }

    async init() {
        try {
            this.listaproductos = await knex.select().from('productos').orderBy('id', 'desc')
        } catch (err) { console.log(err) }

        return this.listaproductos;
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    getAll() {
        return this.listaproductos;
    }

    getMaxId() {
        let id = 0
        this.listaproductos.forEach(item => {
            if (item.id > id) {
                id = item.id;
            }
        });

        return id
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(object) {
        let nuevo_id

        const { title, price, thumbnail } = object

        try {
            nuevo_id = await knex('productos')
                .insert({
                    title: title,
                    price: price,
                    thumbnail: thumbnail
                })
                .then(JSON.parse)
      
        }
        catch (error) {
            console.log(`Error al guardar archivo ${error}`)
        }

        object.id = nuevo_id;
        
        this.listaproductos.push(object);

        return nuevo_id;

    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(clave) {
        let objeto

        this.listaproductos.forEach(element => {
            if (element.id == clave) {
                objeto = element
            }
        });
        return objeto
    }


    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(clave) {

        let array = [];

        try {
            await knex('productos').where('id', clave).del()

            this.listaproductos = await knex.select().from('productos').orderBy('id', 'desc')
        }
        catch (error) {
            console.log(`Error al eliminar ${error}`)
        }

    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        const items = []
        try {
            knex('productos').truncate()
        }
        catch (error) {
            console.log(`Error al truncar ${error}`)
        }

        this.listaproductos = []

    }

    // update(Object):  Recibe un objeto, que busca en el archivo y actualiza .
    async update(clave, data) {
        try {
            const { title, price, thumbnail } = data

            await knex('productos').where('id', clave).update({
                title: title,
                price: price,
                thumbnail: thumbnail
            });

            this.listaproductos = await knex.select().from('productos').orderBy('id', 'desc')
        }
        catch (error) {
                console.log(`Error al actualizar ${error}`)
            }
        }
}

module.exports = ContenedorProductos