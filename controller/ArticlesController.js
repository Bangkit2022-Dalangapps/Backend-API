import Articles from "../models/ArticlesModel.js";
import path from "path";
import fs from "fs";

export const getArticles = async(req, res)=>{
    try {
        const response = await Articles.findAll();
        res.status(200).json({
            status : res.statusCode,
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getArticlesById = async(req, res)=>{
    try {
        const response = await Articles.findOne({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            status : res.statusCode,
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const saveArticles = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No Article Uploaded"});
    const title = req.body.title;
    const description = req.body.description;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Articles.create({title: title, image: fileName, description: description, url: url});
            res.status(201).json({msg: "Article Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateArticles = async(req, res)=>{
    const articles = await Articles.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!articles) return res.status(404).json({msg: "No Article Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = articles.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${articles.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const title = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Articles.update({title: title, image: fileName, description: description, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Article Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteArticles = async(req, res)=>{
    const articles = await Articles.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!articles) return res.status(404).json({msg: "No Article Found"});

    try {
        const filepath = `./public/images/${articles.image}`;
        fs.unlinkSync(filepath);
        await Articles.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Article Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}