
const {MongoClient} = require ('mongodb');
const {database} = require("../../options/mongoDB");


class Mongo {

    constructor() {
        const client = new MongoClient(database.url, { serverSelectionTimeOutMS: 5000 });

        client.connect();

        this.collection = client.db('CursoNode').collection('mensajes')
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async AddMensaje(data) {

        await this.collection.insertOne(data)
            .then()

        return await this.getAll();
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        const array = await this.collection.find().toArray()
        return array
    }
}
module.exports = Mongo