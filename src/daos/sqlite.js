const { options } = require('../../options/sqlite')

const knex = require('knex')(options)

const moment = require('moment')


class sqlite {
    constructor() {

    }

    async getAll() {

        try {
            this.listaMensajes = await knex.select('author', 'text', 'fechayhora').from('mensajes').orderBy('fechayhora', 'desc')
        }
        catch (err) { console.log(err) }

        return this.listaMensajes;
    }

    AddMensaje(data) {

        this.listaMensajes.push(data)

        const { author, text, fechayhora } = data

        try {
            knex('mensajes').insert({
                author: author,
                text: text,
                fechayhora: fechayhora
            }).then(console.log('insert exitoso'))
        }
        catch (err) { console.log(err) }

        return this.listaMensajes;
    }

}

module.exports = sqlite