const mongoose = require('mongoose');
const {database} = require("../../options/mongoDB");

var baseDeDatosConectada = false;

function conectarDB( cb) {
    mongoose.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      if(!err) {
        baseDeDatosConectada = true;
      }
      if(cb != null) {
        cb(err);
      }
  });
}

module.exports = {
  conectarDB
}
