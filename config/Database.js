import {Sequelize} from "sequelize";

const db = new Sequelize('db_tes','root','luwakwhitecoffee',{
    host: "34.101.250.155",
    dialect: "mysql"
});

export default db;