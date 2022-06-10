import Wayang from "../models/WayangModel.js";
import path from "path";
import fs from "fs";

export const getWayang = async(req, res)=>{
    try {
        const response = await Wayang.findAll();
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getWayangById = async(req, res)=>{
    try {
        const response = await Wayang.findOne({
            where:{
                id : req.params.id
            }
        })

        if (response === null) return error
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const saveWayang = (req, res)=>{
    if(req.files === null) return res.status(400).json({
        error: "true",
        msg: "No Wayang Uploaded"});

    const name = req.body.name;
    const description = req.body.description;
    const origin = req.body.origin;
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
            await Wayang.create({name: name, image: fileName, description: description, origin: origin, url: url});
            res.status(201).json({
                error: "false",
                msg: "Wayang Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateWayang = async(req, res)=>{
    const wayang = await Wayang.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!wayang) return res.status(404).json({
        error: "true",
        msg: "No Wayang Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = wayang.image;
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

        const filepath = `./public/images/${wayang.image}`;
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
        await Wayang.update({name: name, image: fileName, description: description, origin: origin, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Wayang Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteWayang = async(req, res)=>{
    const wayang = await Wayang.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!wayang) return res.status(404).json({
        error: "true",
        msg: "No Wayang Found"});

    try {
        const filepath = `./public/images/${wayang.image}`;
        fs.unlinkSync(filepath);
        await Wayang.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Wayang Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}