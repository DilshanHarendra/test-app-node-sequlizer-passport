const express = require('express')
const router = express.Router()
const data = require("../data/foods.json")
const Foods = require("../models/foods")
const Ratings = require("../models/ratings")

router.get('/', (req,res)=>{

    try {
        data.forEach(item=>{
            item.data.forEach(dish=>{
                Foods.create({
                    ...dish
                },{include: [{model: Ratings, as: 'rating',}]})
            })
        })
        res.status(200).send(data)
     }catch (err) {
         res.status(400).send({message:err})
     }
})
router.get('/',async (req,res)=>{

    try {
         let foods= await  Foods.findAll({include: [{model: Ratings, as: 'rating',}]})
        res.status(200).send(foods)
    }catch (err) {
        res.status(400).send({message:err})
    }
})


module.exports =router
