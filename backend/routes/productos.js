import express from "express";
import * as productosController from "../controllers/productosController.js"

const router = express.Router();

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductosPorId)
router.post("/", productosController.crearProducto);

export default  router;