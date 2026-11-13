import express from "express";
import * as productosController from "../controllers/productosController.js"
import { subirImagen } from "../middlewares/subirImagen.js";
import { validarProducto, validarId } from "../middlewares/validarProducto.js";

const router = express.Router();

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductosPorId)

// el multer va antes que la validacion porque sino req.body viene vacio en los form-data
router.post("/", subirImagen.single("imagen"), validarProducto, productosController.crearProducto);
router.put("/:id", validarId, subirImagen.single("imagen"), validarProducto, productosController.actualizarProducto);

router.patch("/:id/desactivar", validarId, productosController.desactivarProducto);
router.patch("/:id/activar", validarId, productosController.activarProducto);

export default  router;
