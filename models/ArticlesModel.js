import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Articles = db.define('article',{
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Articles;

(async()=>{
    await db.sync();
})();