// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  LOGIN
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getLogin(req, res) {
  if (req.isAuthenticated()) {

    const user = req.user;
    console.log('user logueado');
    res.redirect('/')
  }
  else {
    console.log('user NO logueado');
    res.render('pages/login', {});
  }
}

function getSignup(req, res) {
  res.render('pages/signup', {});

}


function postLogin(req, res) {
  // var user = req.user;

  //grabo en user fecha y hora logueo
  res.redirect('/')
}

function postSignup(req, res) {
  // var user = req.user;
  //console.log(user);

  //grabo en user fecha y hora logueo
  res.redirect('/')
}

function getFaillogin(req, res) {
  console.log('error en login');
  const title = 'USER ERROR LOGIN';
  res.render('pages/error', {titulo:title}); 
}

function getFailsignup(req, res) {
  console.log('error en signup');
  const title = 'USER ERROR SIGNUP';
  res.render('pages/error', {titulo:title}); 
}

function getLogout(req, res) 
{
  const user = req.user;
  console.log(user)

  req.logout();
  res.render('pages/bye',{user: user.username});
}

function failRoute(req, res) {
  const title = 'ROUTING ERROR';
  res.status(404).res.render('pages/error', {titulo:title});
}

module.exports = {
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  failRoute,
  getSignup,
  postSignup,
  getFailsignup
}
