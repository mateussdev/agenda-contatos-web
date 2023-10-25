const { csrfMiddleware } = require("../middlewares/middleware");

exports.index = (req, res) => {
  res.render('register');
}

exports.register = (req, res) => {
  res.send(req.body);
}