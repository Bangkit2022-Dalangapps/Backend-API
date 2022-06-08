import {Sequelize} from "sequelize";

const db = new Sequelize('dalang-apps','root','tundalapardiperut',{
    host: "34.101.61.109",
    dialect: "mysql"
});

export default db;