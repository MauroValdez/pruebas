const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const {insert, read, update, remove} = require('./operaciones');
const {insertPool, readPool, updatePool, removePool} = require('./operaciones-pool');

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE
});

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE
});

connection.connect( err => {
  if(err) throw err;
  console.log('Coneccion establecida');
})

// rutas

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/insert', (req, res) => {
  insert( connection,
    {nombre: "pelo rapado con crema", precio: "100"},
    (result) => {res.json(result);} 
  );
});

app.get('/read', (req, res) => {
  read( connection,
    (result) => {res.json(result);} 
  );
});

app.get('/update', (req, res) => {
  update( connection,
    {id: 6},
    (result) => {res.json(result);} 
  );
});

app.get('/remove', (req, res) => {
  remove( connection,
    {id: 6},
    (result) => {res.json(result);} 
  );
});

app.listen(3000, () => {
  console.log('Abrir el port 3000!');
});

//rutas pool

app.get('/insert-pool', (req, res) => {
  insertPool( pool,
    {nombre: "lavado completo", precio: "100"},
    (result) => {res.json(result);} 
  );
});

app.get('/read-pool', (req, res) => {
  readPool( pool,
    (result) => {res.json(result);} 
  );
});

app.get('/update-pool', (req, res) => {
  updatePool( pool,
    {id: 5},
    (result) => {res.json(result);} 
  );
});

app.get('/remove-pool', (req, res) => {
  removePool( pool,
    {id: 7},
    (result) => {res.json(result);} 
  );
});