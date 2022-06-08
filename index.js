import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";
import FileUpload from "express-fileupload";
dotenv.config();
const app = express();


try {
    await db.authenticate();
    console.log('Database Connected...')
    await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({credential: true, origin:'*'}));
app.use(express.static("public"))
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(router);

app.listen(5000, ()=> console.log('Server running at port 5000'));
