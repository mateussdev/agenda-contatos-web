const express = require('express');
const app = express();

const path = require('path');

const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.listen('4000', () => {
  console.log('Servidor rodando na porta 4000.')
  console.log('Acessar http://localhost:4000');
});