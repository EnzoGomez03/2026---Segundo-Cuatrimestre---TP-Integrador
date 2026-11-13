/**
 * Responde a la ruta principal con el mensaje de verificacion del servidor.
 * @param {Object} req - Peticion recibida del cliente.
 * @param {Object} res - Respuesta que se envia al cliente.
 */
export const mostrarInicio = (req, res) => {
    res.send("Servidor PuntoGym funcionando");
};
