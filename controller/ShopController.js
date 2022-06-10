import Shop from "../models/ShopModel.js";
import path from "path";
import fs from "fs";

export const getShop = async(req, res)=>{
    try {
        const response = await Shop.findAll();
        res.status(200).json({
            error: "false",
            msg : "Success",
            data : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getShopById = async(req, res)=>{
    try {
        const response = await Shop.findOne({
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

export const saveShop = (req, res)=>{
    if(req.files === null) return res.status(400).json({
        error: "true",
        msg: "No Shop Uploaded"});

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
            await Dalang.create({name: name, image: fileName, description: description, location: location, url: url});
            res.status(201).json({
                error: "false",
                msg: "Shop Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateShop = async(req, res)=>{
    const shop = await Shop.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!shop) return res.status(404).json({
        error: "true",
        msg: "No Shop Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = shop.image;
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

        const filepath = `./public/images/${shop.image}`;
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
        await Shop.update({name: name, image: fileName, description: description, location: location, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Shop Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteShop = async(req, res)=>{
    const shop = await Shop.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!shop) return res.status(404).json({
        error: "true",
        msg: "No Shop Found"});

    try {
        const filepath = `./public/images/${dalang.image}`;
        fs.unlinkSync(filepath);
        await Shop.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({
            error: "false",
            msg: "Shop Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}