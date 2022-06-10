import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Wayangs = db.define('wayangs',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    origin : DataTypes.STRING,
    source : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Wayangs;

(async()=>{
    await db.sync();
})();