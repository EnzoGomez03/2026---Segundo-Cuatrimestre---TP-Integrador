const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/", productosController.obtenerProductos);

router.get("/:id", productosController.obtenerProductosPorId)

module.exports = router;