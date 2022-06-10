import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Shop = db.define('shop',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description : DataTypes.STRING,
    location : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Shop;

(async()=>{
    await db.sync();
})();