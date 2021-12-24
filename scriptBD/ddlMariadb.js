const { options } = require('../options/mariaDB')
const knex = require('knex')(options)


knex.schema.hasTable('productos').then(function (exists) {

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
    }
    else
    {
        console.log('La tabla producto ya existe')
        knex.destroy()
    }

});

