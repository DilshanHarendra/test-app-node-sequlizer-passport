const express = require('express')
const router = express.Router()
const data = require("../data/foods.json")
const Foods = require("../models/foods")
const Ratings = require("../models/ratings")

router.get('/',async (req,res)=>{

      Foods.create({
          "ratedDishId":1259,
         // "dishId":39320,
          "dishName":"\"Rare\"\" fried rice ., This is to check the number of characters to  a dish name maximumly . So check this",
          "discountPercentage":null,
          "mrp":18000,
          "displayPricing":19500,
          "priceDiff":"-8%",
          "description":"Rare\"\" fried rice ., This is to check the number of characters to  a dish description maximumly . So check12 again check 123 next one too",
          "imageUrl":null,
          "currency":"LKR",
          "rating":{
              "ratingNumber":"3.9",
              "ratingCount":"70",
              "isPopular":0
          }
      },{
          include:[{
              association: Foods.hasOne,
          }]
      }).then(food=>{

          res.status(200).send(food)
      }).catch(err=>{
          res.status(400).send({message:err})
      })



})



module.exports =router
