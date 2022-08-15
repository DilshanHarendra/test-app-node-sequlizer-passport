const sequelize = require('sequelize')
const db =  require('../connections/databaseConnection')

const Menus = db.define("menus", {
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    title: {
        type: sequelize.STRING
    },
    displayPriority: {
        type: sequelize.DOUBLE
    },
    data: {
        type: sequelize.STRING
    }

});

Menus.sync().then(()=>{
    console.log(`Menus table created`)
})
module.exports=Menus

