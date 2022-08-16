const express = require('express')
const Menus = require("../models/menus");
const data = require("../data/menuItems.json");
const router = express.Router()


router.post('/', (req,res)=>{

    try {
        Menus.bulkCreate(data)
        res.status(200).send(data)
    }catch (err) {
        res.status(400).send({message:err})
    }
})
router.get('/',async (req,res)=>{

    try {
        let menus= await  Menus.findAll()
        res.status(200).send(menus)
    }catch (err) {
        res.status(400).send({message:err})
    }
})



module.exports =router
