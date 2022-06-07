import {Sequelize} from "sequelize";

const db = new Sequelize('dalangapp','root','tundalapardiperut',{
    host: "34.101.61.109",
    dialect: "mysql"
});

export default db;