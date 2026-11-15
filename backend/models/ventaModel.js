import { DataTypes} from "sequelize";
import { sequelize } from "./db.js"
import { Producto } from "./productoModel.js";

export const Venta = sequelize.define("Venta", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull:false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    timestamps:false
});