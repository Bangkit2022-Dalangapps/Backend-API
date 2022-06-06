import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Wayang = db.define('wayang',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Wayang;

(async()=>{
    await db.sync();
})();