const Contact = require('./../models/ContactModel');

exports.index = (req, res) => {
  res.render('contact');
};

exports.new = (req, res) => {
  res.render('register-contact', { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato cadastrado com sucesso.');
    req.session.save(() => res.redirect(`/contact/edit/${contact.contact._id}`));
    return;

  } catch(e) {
    console.log(e);
  }
}

exports.editIndex = async (req, res) => {
  if(!req.params.id) return res.render('error');

  const contact = await Contact.findById(req.params.id);

  if(!contact) return res.render('error');

  res.render('register-contact', { contact });
}

exports.edit = async (req, res) => {
  try {
    if(!req.params.id) return res.render('error');

    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    req.session.save(() => res.redirect(`/contact/edit/${contact.contact._id}`));
    return;
  } catch(e) {
    console.log(e);
    res.render('error')
  }
}