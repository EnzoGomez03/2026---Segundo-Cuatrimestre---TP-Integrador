import express  from "express";
import rutas from  "./routes/index.js"
import rutasProductos from "./routes/productos.js"
import { sequelize } from "./models/db.js"
import "./models/productoModel.js"

const app = express();
app.use(express.json());
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

sequelize.sync()
    .then(() => {
        console.log("Base de datos sincronizada");
    })
    .catch((error) => {
        console.log("Error al sincronizar la base de datos", error);
    });