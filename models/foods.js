const sequelize = require('sequelize')
const db =  require('../connections/databaseConnection')
const Ratings = require('./ratings')
const Foods = db.define("foods", {
    dishId:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    dishName: {
        type: sequelize.STRING
    },
    discountPercentage:{
        type: sequelize.DOUBLE,
        allowNull: true,
    },
    mrp:{
        type:sequelize.INTEGER,
    },
    priceDiff:{
        type: sequelize.STRING,
    },
    description:{
        type:sequelize.TEXT('long'),
    },
    imageUrl:{
        type: sequelize.TEXT,
        allowNull: true,
    },
    currency:{
        type: sequelize.TEXT
    },

});

Foods.hasOne(Ratings);
Ratings.belongsTo(Foods)

Foods.sync({ alter: true }).then(()=>{
    console.log(`Foods table created`)
})



module.exports=Foods
