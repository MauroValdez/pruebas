const mysql = require('mysql');

// inserta en la base de datos
function insertPool(pool, data, callback) {
  let insertQuery = 'INSERT INTO servicios (nombre, precio) VALUES (?, ?)';
  let query = mysql.format(insertQuery, [data.nombre, data.precio]);

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
      connection.release();
    })
  })
}

// lee de la base de datos

function readPool(pool, callback) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query('SELECT * FROM servicios', function(err, result) {
        if(err) throw err;
        callback(result);
        connection.release();
    })
  })
}

// actualiza en la base de datos

function updatePool(pool, data, callback) {
  const newNombre = 'pelo rapado';
  const newPrecio = '95' ;

  let updateQuery = 'UPDATE servicios SET nombre = ?, precio = ? WHERE id = ?';
  let query = mysql.format(updateQuery, [newNombre, newPrecio, data.id]);

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
      connection.release();
    })
  })
}

//eliminar de la base de datos

function removePool(pool, data, callback) {
  let removeQuery = 'DELETE FROM servicios WHERE id = ?';
  let query = mysql.format(removeQuery, [data.id]);

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
      connection.release();
    })
  })
}

module.exports = {insertPool, readPool, updatePool, removePool};