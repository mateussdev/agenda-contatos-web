const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model("Contact", ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.register = async function () {
  this.validateFields();
  if (this.errors.length > 0) return;
  this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validateFields = function () {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("E-mail inválido");
  if (!this.body.name) this.errors.push("Nome é um campo obrigatório.");
  if (!this.body.email && !this.body.telefone) {
    this.errors.push(
      "Pelo menos um contato precisa ser enviado: e-mail ou telefone."
    );
  }
};

Contact.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    lastName: this.body.lastName,
    tel: this.body.tel,
    email: this.body.email
  };
};

Contact.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.validateFields();
  if(this.errors.length > 0) return;
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
}

Contact.findById = async function (id) {
  if (typeof id !== "string") return;
  const contact = await ContactModel.findById(id);
  return contact;
};


module.exports = Contact;
