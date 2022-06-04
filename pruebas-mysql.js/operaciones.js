const mysql = require('mysql');

// inserta en la base de datos
function insert(connection, data, callback) {
  let insertQuery = 'INSERT INTO servicios (nombre, precio) VALUES (?, ?)';
  let query = mysql.format(insertQuery, [data.nombre, data.precio]);

  connection.query(query, function(err, result) {
    if(err) throw err;
    callback(result);
    connection.end();
  })
}

// lee de la base de datos

function read(connection, callback) {
  connection.query('SELECT * FROM servicios', function(err, result) {
    if(err) throw err;
    callback(result);
    connection.end();
  })
}

// actualiza en la base de datos

function update(connection, data, callback) {
  const newNombre = 'pelo con crema';
  const newPrecio = '80' ;

  let updateQuery = 'UPDATE servicios SET nombre = ?, precio = ? WHERE id = ?';
  let query = mysql.format(updateQuery, [newNombre, newPrecio, data.id]);

  connection.query(query, function(err, result) {
    if(err) throw err;
    callback(result);
    connection.end();
  })
}

//eliminar de la base de datos

function remove(connection, data, callback) {
  let removeQuery = 'DELETE FROM servicios WHERE id = ?';
  let query = mysql.format(removeQuery, [data.id]);

  connection.query(query, function(err, result) {
    if(err) throw err;
    callback(result);
    connection.end();
  })
}

module.exports = {insert, read, update, remove};