import Stories from "../models/PSModel.js";
import path from "path";
import fs from "fs";

export const getStories = async(req, res)=>{
    try {
        const response = await Stories.findAll();
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getStoriesById = async(req, res)=>{
    try {
        const response = await Stories.findOne({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const saveStories = (req, res)=>{
    if(req.files === null) return res.status(400).json({
        error: "true",
        msg: "No Stories Uploaded"});

    const title = req.body.title;
    const description = req.body.description;
    const source = req.body.source;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
        error: "true",
        msg: "Invalid Images"});

    if(fileSize > 5000000) return res.status(422).json({
        error:"true",
        msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Stories.create({title: title, image: fileName, description: description, source: source, url: url});
            res.status(201).json({
                error: "false",
                msg: "Stories Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateStories = async(req, res)=>{
    const stories = await Stories.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!stories) return res.status(404).json({
        error: "true",
        msg: "No Stories Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = stories.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
            error: "true",
            msg: "Invalid Images"});

        if(fileSize > 5000000) return res.status(422).json({
            error: "true",
            msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${stories.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({
                error: "true",
                msg: err.message});
        });
    }
    const title = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Stories.update({title: title, image: fileName, description: description, source: source, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Stories Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteStories = async(req, res)=>{
    const stories = await Stories.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!stories) return res.status(404).json({
        error: "true",
        msg: "No Stories Found"});

    try {
        const filepath = `./public/images/${stories.image}`;
        fs.unlinkSync(filepath);
        await Stories.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Stories Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}