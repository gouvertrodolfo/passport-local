const { Router } = require('express');


const webProductos = Router();
const Contenedor = require("../daos/ContenedorProductos")

const inventario =new Contenedor('productos.txt')


/* -------------------------------------- */

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  }

/* -------------------------------------- */

webProductos.get("/", checkAuthentication, async (req,res)=>{

    const { user } = req;
    console.log(user)

    let items = await inventario.getAll()
    const title = 'Productos'
   
    res.render('pages/index', {user:user, titulo:title , productos:items})
})

webProductos.post("/productos", async (req, res) => {
         let producto = req.body
         const id = await inventario.save(producto)
         
         socket.emit('productos', producto)
         
         res.redirect('/')
})

webProductos.get("/productos", async (req,res)=>{
    let items = await inventario.getAll()
    const title = 'Lista de productos'

    res.render('pages/ListadoProductos', { titulo:title, productos:items})
})

exports.webProductos = webProductos;