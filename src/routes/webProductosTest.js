const { Router } = require('express');
const webProductosTest = Router();

const { image, commerce } = require('faker');
/* -------------------------------------- */

webProductosTest.get("/", (req, res) => {
    const items = [];
    const cant = 25;
    let producto;
    for (let i = 0; i <= cant; i++) {

        producto = {
            id: i,
            title: commerce.productName(),
            price: commerce.price(),
            thumbnail: image.imageUrl()
        };

        items.push(producto);
    }

    const title = 'Lista de productos';

    res.render('pages/ListadoProductos', { titulo: title, productos: items });

})

exports.webProductosTest = webProductosTest;