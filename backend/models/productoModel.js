import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Producto = sequelize.define("Producto", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre: {
        type:DataTypes.STRING,
        allowNull : false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria : {
        type: DataTypes.STRING,
        allowNull:false
    },
    activo : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});