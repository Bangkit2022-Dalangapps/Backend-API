import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Dalang = db.define('dalang',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    biography : DataTypes.TEXT,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Dalang;

(async()=>{
    await db.sync();
})();