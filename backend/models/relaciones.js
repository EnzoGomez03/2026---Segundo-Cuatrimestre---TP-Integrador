import { Producto } from "./productoModel.js";
import { Venta } from "./ventaModel.js";
import { VentaProducto } from "./ventaProductoModel.js";


//BelongsToMany estamos diciendo que una venta puede tener varios productos.
Venta.belongsToMany(Producto, {
    through: VentaProducto,
});

//Lo mismo que arriba, pero a la inversa.
Producto.belongsToMany(Venta, {
    through: VentaProducto,
});