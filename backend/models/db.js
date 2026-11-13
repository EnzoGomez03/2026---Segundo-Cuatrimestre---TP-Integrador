import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./puntogym.sqlite",
    logging : false 
});

