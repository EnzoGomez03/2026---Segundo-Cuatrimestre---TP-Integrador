import express  from "express";
import rutas from  "./routes/index.js"
import rutasProductos from "./routes/productos.js"
import rutasAdmin from "./routes/admin.js"
import { sequelize } from "./models/db.js"
import "./models/productoModel.js"
import "./models/relaciones.js"
import rutasVentas from "./routes/ventas.js"
import ticketsRouter from "./routes/tickets.js";
import "./models/usuarioModel.js"
import rutasUsuarios from "./routes/usuarios.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// vistas del back office
app.set("view engine", "ejs");
app.set("views", "./views");

// los archivos de /public salen en la raiz y las imagenes subidas en /uploads
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

/*=========Rutas=========*/
app.use("/",rutas);
app.use("/api/productos" , rutasProductos);
app.use("/admin", rutasAdmin);
app.use("/api/ventas",rutasVentas);
app.use("/api/usuarios",rutasUsuarios);
app.use("/ventas", ticketsRouter);
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
