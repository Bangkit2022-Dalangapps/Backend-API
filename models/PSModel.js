import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Stories = db.define('stories',{
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Stories;

(async()=>{
    await db.sync();
})();