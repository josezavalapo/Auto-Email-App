//modulos a utilizar
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// conexion a la base de datos
mongoose.connect(config.database);

// conectado a la base
mongoose.connection.on('conectado', () => {
  console.log('Conectado a la base de datos '+config.database);
});

// error de conexion a la base
mongoose.connection.on('error', (err) => {
  console.log('Error de base de datos: '+err);
});

const app = express();

const users = require('./routes/users');

// numero de puerto
const port = 3000;

// CORS Middleware
app.use(cors());

// folder estatico
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// ruta index
app.get('/', (req, res) => {
  res.send('Punto de termino invalido');
});

// empezar servidor
app.listen(port, () => {
  console.log('Servidor iniciado en el puerto '+port);
});