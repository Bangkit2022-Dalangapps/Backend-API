import Places from "../models/PlacesModel.js";
import path from "path";
import fs from "fs";

export const getPlaces = async(req, res)=>{
    try {
        const response = await Places.findAll();
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPlacesById = async(req, res)=>{
    try {
        const response = await Places.findOne({
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

export const savePlaces = (req, res)=>{
    if(req.files === null) return res.status(400).json({
        error: "true",
        msg: "No Places Uploaded"});

    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
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
            await Places.create({name: name, image: fileName, description: description, location: location, url: url});
            res.status(201).json({
                error: "false",
                msg: "Place Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updatePlaces = async(req, res)=>{
    const places = await Places.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!places) return res.status(404).json({
        error: "true",
        msg: "No Place Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = places.image;
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

        const filepath = `./public/images/${places.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Places.update({name: name, image: fileName, description: description, location: location, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Place Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePlaces = async(req, res)=>{
    const places = await Places.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!places) return res.status(404).json({
        error: "true",
        msg: "No Place Found"});

    try {
        const filepath = `./public/images/${places.image}`;
        fs.unlinkSync(filepath);
        await Places.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Place Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}