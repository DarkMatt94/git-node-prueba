const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'containers-us-west-139.railway.app',
  user: 'root',
  password: '38HkJQMsxBb1SXxZ8BEd',
  database: 'railway',
  port: 7544,
});

// Conéctate a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.message);
  } else {
    console.log('Conexión a la base de datos MySQL exitosa');
  }
});

// Ruta para agregar un usuario ficticio
app.get('/agregar-usuario', (req, res) => {
  const usuario = 'usuario_ficticio';
  const email = 'usuario@ficticio.com';
  const contraseña = 'contraseña_ficticia';
  const rol = 'usuario_normal';

  const sql =
    'INSERT INTO usuarios (usuario, email, contraseña, rol) VALUES (?, ?, ?, ?)';
  db.query(sql, [usuario, email, contraseña, rol], (err, result) => {
    if (err) {
      console.error('Error al agregar usuario: ' + err.message);
      res.status(500).send('Error en el servidor');
    } else {
      console.log('Usuario agregado con éxito');
      res.send('Usuario agregado con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios: ' + err.message);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results);
    }
  });
});
