const { options } = require('../../options/mariaDB')
const knex = require('knex')(options)


class ContenedorUsuarios {

    constructor() {
        this.crearTabla();
    }

    async crearTabla() {
        try {
            await knex.schema.hasTable('usuarios').then(function (exists) {
                if (!exists) {

                    return knex.schema.createTable('usuarios', table => {
                        table.increments('id');
                        table.string('correo');
                        table.string('clave');
                        table.string('Nombre');
                        table.string('Apellido');
                        table.integer('edad');
                        table.string('alias');
                        table.string('fecha_alta');
                    });

                    console.log('Tabla usuarios creada!');
                }
                else{console.log('Tabla usuarios ya existe!');}
            })
        } catch (error) {
            console.log(error);
        }
    }

    async listar() {
        try {
            const lista = await knex.select().from('usuarios')
            return lista;
        } catch (err) { console.log(err) }
    }


    async guardar(usuario) {

        try {
            let alta = new Date().toLocaleString();
            usuario.fecha_alta = alta
            let resultado = await knex('usuarios').insert(usuario);
            return resultado;
        } catch (error) {
            throw error;
        }

    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async listarPorId(idusuario) {
        try {
            let resultado = await knex('usuarios').where({ id: idusuario });
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async listarPorCorreo(correoUsuario) {
        try {
            let resultado = await knex('usuarios').where({ correo: correoUsuario });
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async borrar(idUsuario) {

        try {
            let result = await knex('productos').where('id', idUsuario).del()

            return result;
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

module.exports = ContenedorUsuarios