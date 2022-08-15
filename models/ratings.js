const sequelize = require('sequelize')
const db =  require('../connections/databaseConnection')

const Ratings = db.define("ratings", {
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    ratingNumber: {
        type: sequelize.DOUBLE
    },
    ratingCount:{
        type: sequelize.INTEGER,
    },
    isPopular:{
        type:sequelize.BOOLEAN,
    },
});

Ratings.sync({ alter: true }).then(()=>{
    console.log(`Ratings table created`)
})
module.exports=Ratings
