import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const VentaProducto = sequelize.define("VentaProducto" , {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps: false
});