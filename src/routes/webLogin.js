const { Router } = require('express');
const webLogin = Router();


const ContenedorUsuarios = require('../daos/ContenedorUsuarios')
const usuariosBD = new ContenedorUsuarios()


webLogin.get("/", (req, res) => {
    const title = 'Login'
    console.log(req.session.user)
    res.render('pages/login', { titulo: title })
})

webLogin.post("/", async (req, res) => {
    const { usuario: correo, clave } = req.body
    
    const [user] = await usuariosBD.listarPorCorreo(correo)

    if(user)
    {
        if(user.clave == clave){
            req.session.user = user
        }
    }

    res.redirect('/')

})

webLogin.get("/registro", (req, res) => {
    res.render('pages/registro')
})

webLogin.post("/registro", (req, res) => {

    let usuario = req.body

    usuariosBD.guardar(usuario)

    req.session.user = user

    res.redirect('/')
})


webLogin.get("/logout", (req, res) => {
    const user = req.session.user

    req.session.destroy(err => {
        if (err) {
          res.json({ status: 'Logout ERROR', body: err })
        } else {
            res.render('pages/bye',{user: user})
        }

    })
})

exports.webLogin = webLogin;