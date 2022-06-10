import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Dalangs = db.define('dalangs',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    biography : DataTypes.STRING,
    origin : DataTypes.STRING,
    source : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Dalangs;

(async()=>{
    await db.sync();
})();