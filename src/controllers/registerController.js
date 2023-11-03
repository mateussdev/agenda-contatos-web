const User = require("../models/UserModel");

exports.index = (req, res) => {
  res.render("register");
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(function () {
        return res.redirect("/register");
      });
      return;
    }

    req.flash(
      "success",
      "Seu usuário foi cadastrado com sucesso. Faça seu login!"
    );
    req.session.save(function () {
      return res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
  }
};
