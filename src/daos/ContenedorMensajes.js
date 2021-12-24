// const sqlite = require('./mensajes/sqlite')
const mongoDB = require('./mongo')

const moment = require('moment')

class ContenedorMensajes {
    constructor() {
        this.contenedor = new mongoDB();
    }

    async getAll() {
        return await this.contenedor.getAll()
    }

    async AddMensaje(data) {

        data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');

        return await this.contenedor.AddMensaje(data)
    }

}

module.exports = ContenedorMensajes