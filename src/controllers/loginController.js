const User = require("../models/UserModel");

exports.index = (req, res) => {
  return res.render("login");
};

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.login();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Você entrou no sistema!");
    req.session.user = user.user;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
