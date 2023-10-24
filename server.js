require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('ready');
  })
  .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const path = require('path');
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOptions = session({
  secret: 'ksdgfjksgdfjshgdfjkhdsiruyfhgiey()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('ready', () => {
  app.listen('4000', () => {
    console.log('Servidor rodando na porta 4000.')
    console.log('Acessar http://localhost:4000');
  });
})