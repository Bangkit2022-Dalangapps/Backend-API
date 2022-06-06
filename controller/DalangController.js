import Dalang from "../models/DalangModel.js";
import path from "path";
import fs from "fs";

export const getDalang = async(req, res)=>{
    try {
        const response = await Dalang.findAll();
        res.status(200).json({
            status : res.statusCode,
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getDalangById = async(req, res)=>{
    try {
        const response = await Dalang.findOne({
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

export const saveDalang = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No Dalang Uploaded"});
    const name = req.body.name;
    const biography = req.body.biography;
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
            await Dalang.create({name: name, image: fileName, biography: biography, url: url});
            res.status(201).json({msg: "Dalang Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateDalang = async(req, res)=>{
    const dalang = await Dalang.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!dalang) return res.status(404).json({msg: "No Dalang Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = dalang.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${dalang.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Dalang.update({name: name, image: fileName, biography: biography, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Dalang Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDalang = async(req, res)=>{
    const dalang = await Dalang.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!dalang) return res.status(404).json({msg: "No Dalang Found"});

    try {
        const filepath = `./public/images/${dalang.image}`;
        fs.unlinkSync(filepath);
        await Dalang.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Dalang Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}