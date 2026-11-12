/**
 * @file        app.js
 * @description Servidor inicial de PuntoGym con Express.
 *              Levanta el servidor en el puerto 3000 y responde a la
 *              ruta raiz con un mensaje de verificacion.
 * @subject     Programacion III - UTN
 * @topic       TP Integrador - Backend
 * @version     1.0.0
 * @since       2026
 */

// =============================================================================
// DEPENDENCIAS
// =============================================================================
const express = require("express");
const app = express();
const rutas = require("./routes/index");
const rutasProductos = require("./routes/productos");
const sequelize = require("./models/db");

// =============================================================================
// RUTAS
// =============================================================================
app.use("/",rutas);
app.use("/api/productos" , rutasProductos)
// =============================================================================
// PUESTA EN MARCHA DEL SERVIDOR
// =============================================================================
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

sequelize.authenticate()
    .then(()=> {
        console.log("Conexion a SQLite exitosa");
    })
    .catch((error) => {
        console.log("Error al conectar con SQLite", error);
    });
