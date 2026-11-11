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

// =============================================================================
// RUTAS
// =============================================================================
app.get("/", (req, res) => {
    res.send("Servidor PuntoGym funcionando");
});

// =============================================================================
// PUESTA EN MARCHA DEL SERVIDOR
// =============================================================================
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});
