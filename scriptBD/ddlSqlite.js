const { options } = require("../options/sqlite")
const knex = require('knex')(options)


knex.schema.hasTable('mensajes').then(function (exists) {

    if (!exists) {

        knex.schema.createTable('mensajes', table => {
            table.string('author');
            table.string('text');
            table.datetime('fechayhora');
        })
            .then(console.log("tabla mensajes creada"))
            .catch((err) => { console.log(err); })
            .finally(() => { knex.destroy() })
    }
    else {
        console.log("la tabla mensajes ya existe")
        knex.destroy()
    }
});