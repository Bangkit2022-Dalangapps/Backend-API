import Dalangs from "../models/DalangsModel.js";
import path from "path";
import fs from "fs";

export const getDalangs = async(req, res)=>{
    try {
        const response = await Dalangs.findAll();
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getDalangsById = async(req, res)=>{
    try {
        const response = await Dalangs.findOne({
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

export const saveDalangs = (req, res)=>{
    if(req.files === null) return res.status(400).json({
        error: "true",
        msg: "No Dalang Uploaded"});

    const name = req.body.name;
    const biography = req.body.biography;
    const origin = req.body.origin;
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
        error: "true",
        msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Dalangs.create({name: name, image: fileName, biography: biography, origin: origin, source: source, url: url});
            res.status(201).json({
                error: "false",
                msg: "Dalang Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateDalangs = async(req, res)=>{
    const dalangs = await Dalangs.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!dalang) return res.status(404).json({
        error: "true",
        msg: "No Dalang Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = dalangs.image;
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

        const filepath = `./public/images/${dalangs.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({
                error: "true",
                msg: err.message});
        });
    }
    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Dalangs.update({name: name, image: fileName, biography: biography, origin: origin, source: source, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Dalang Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDalangs = async(req, res)=>{
    const dalangs = await Dalangs.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!dalangs) return res.status(404).json({
        error: "true",
        msg: "No Dalang Found"});

    try {
        const filepath = `./public/images/${dalangs.image}`;
        fs.unlinkSync(filepath);
        await Dalangs.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Dalang Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}