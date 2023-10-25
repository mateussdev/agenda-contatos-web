exports.index = (req, res) => {
  return res.render('login');
};

exports.login = (req, res) => {
  res.send(req.body);
};
