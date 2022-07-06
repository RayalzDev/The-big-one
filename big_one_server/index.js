const { ObjectId } = require("mongodb");
const express = require("express");
const md5 = require("nodejs-md5");
const { response } = express();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
let db = null;
let MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) throw err;
  db = client;
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

//------CRUD del usuario--------//

//Obetener todos los usuarios

app.get("/usuario", async function (request, response) {
  let database = db.db("big_one_server");
  await database
    .collection("usuarios")
    .find()
    .toArray((err, results) => {
      if (!results) {
        response.status(404).send("El usuario no existe");
      }
      response.status(200).send(results);
    });
});

//Obtener un usuario

app.get("/usuarios/:id", async function (request, response) {
  let database = db.db("big_one_server");
  await database.collection("usuarios").findOne({ _id: { $eq: ObjectId(request.params.id) } },
     async function (err, results) {
      if (!results) {
        response.status(404).send("usuario no encontrado");
      }

      response.status(200).send(results);
    });
});

//Crear usuario

app.post("/usuario", async function (request, response) {
  let database = db.db("big_one_server");

  md5.string.quiet(request.body.contraseña, function (err, md5) {
    if (err) {
      console.log(err);
    } else {
      request.body.contraseña = md5;
    }
  });

  await database
    .collection("usuarios")
    .insertOne(request.body, function (err, res) {
      if (!res) {
        //Comprobar que recibe respuesta, si no salta error
        response
          .status(500)
          .send("Error inesperado, no se ha podido crear usuario");
      } else {
        response.status(200).send("usuario registrado");
      }
    });
});

//Editar usuario

app.put("/usuario/:id", async function (request, response) {
  let database = db.db("big_one_server");
  await database
    .collection("usuarios")
    .updateOne(
      { _id: { $eq: ObjectId(request.params.id) } },
      { $set: request.body }
    );
  response.json("usuario modificado");
});

//Borrar usuario

app.delete("/usuario", async function (request, response) {
  let database = db.db("big_one_server");
  await database
    .collection("usuarios")
    .deleteOne({ _id: ObjectId(request.body._id) });
  response.json("usuario borrado");
});

//Login usuario
app.post("/login", async function (request, response) {
  let database = db.db("big_one_server");

  md5.string.quiet(request.body.contraseña, async function (err, md5) {
    if (err) {
      console.log(err);
    } else {
      request.body.contraseña = md5;
      await database
        .collection("usuarios")
        .findOne(
          { nombre: { $eq: request.body.nombre } },
          function (err, result) {
            if (!result) {
              response.send("Usuario no existe");
            } else {
              if (request.body.contraseña === result.contraseña) {
                response.send(result);
              } else {
                response.send("Contraseña no valida.");
              }
            }
          }
        );
    }
  });
});

//----------Endpoints de Empresas--------------//

//Get todas las empresas
app.get("/empresas", async function (request, response) {
  let database = db.db("big_one_server");

  await database
    .collection("empresas")
    .find()
    .toArray((err, results) => {
      if (!results) {
        response.status(404).send("No hay empresas");
      }

      response.status(200).send(results);
    });
});

//Obtener una empresa

app.get("/empresas/:name", async function (request, response) {
  let database = db.db("big_one_server");

  await database
    .collection("empresas")
    .findOne({ name: { $eq: request.params.name } }, (err, results) => {
      if (!results) {
        response.status(404).send("Empresa no encontrada");
      }

      response.status(200).send(results);
    });
});

//Borrar una empresa

app.delete("/empresas", async function (request, response) {
  let database = db.db("big_one_server");

  await database
    .collection("empresas")
    .deleteOne({ _id: ObjectId(request.body._id) }, (err, results) => {
      if (!results) {
        response.status(404).send("Empresa no encontrada");
      }
      response.status(200).send("Empresa borrada");
    });
});

//Editar una empresa

app.put("/empresas", async function (request, response) {
  let database = db.db("big_one_server");

  await database
    .collection("empresas")
    .updateOne({ _id: ObjectId(request.body._id) }, { $set: request.body });
});
