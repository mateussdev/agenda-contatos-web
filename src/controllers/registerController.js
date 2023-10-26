const Register = require('./../models/registerModel');

exports.index = (req, res) => {
  res.render('register');
}

exports.register = async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.register();

    if(register.errors.length > 0) {
      req.flash('errors', register.errors);
      req.session.save(function () {
        return res.redirect('/register');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi cadastrado com sucesso. Faça seu login!');
    req.session.save(function () {
      return res.redirect('/login');
    });
  } catch(e) {
    console.log(e);
  };
}