const express = require("express");
/* Objeto para organizar rutass*/
const router = express.Router();

const inicioController = require("../controllers/inicioController");

router.get("/", inicioController.mostrarInicio);

module.exports = router;
