/**
 * @file        inicioController.js
 * @description Controlador de la ruta principal de PuntoGym.
 *              Decide que se responde cuando alguien visita la raiz del sitio.
 * @subject     Programacion III - UTN
 * @topic       TP Integrador - Backend
 * @version     1.0.0
 * @since       2026
 */

// =============================================================================
// CONTROLADORES
// =============================================================================

/**
 * Responde a la ruta principal con el mensaje de verificacion del servidor.
 * @param {Object} req - Peticion recibida del cliente.
 * @param {Object} res - Respuesta que se envia al cliente.
 */
const mostrarInicio = (req, res) => {
    res.send("Servidor PuntoGym funcionando");
};

// =============================================================================
// EXPORTACION
// =============================================================================
module.exports = { mostrarInicio };
