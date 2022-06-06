import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Places = db.define('places',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Places;

(async()=>{
    await db.sync();
})();