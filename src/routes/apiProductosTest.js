const { Router } = require('express');

const apiProductosTest = Router();


const { image, commerce } = require('faker');

/* ------------------------------------------------------ */

// GET '/api/productos' -> devuelve todos los productos.
apiProductosTest.get('/', async (req, res) => {
  const array = [];
  const cant = 5;
  let producto;
  for (let i = 0; i <= cant; i++) {

    producto = {
      id: i,
      title: commerce.productName(),
      price: commerce.price(),
      thumbnail: image.imageUrl()
    };

    array.push(producto);
  }
  res.json(array);
});

exports.apiProductosTest = apiProductosTest;