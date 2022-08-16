const sequelize = require('sequelize')
const db =  require('../connections/databaseConnection')

const Users = db.define("users", {
  id:{
    type:sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  providerId:{
    type:sequelize.STRING,
  },
  displayName: {
    type: sequelize.STRING
  },
  firstName: {
    type: sequelize.STRING
  },
  lastName: {
    type: sequelize.STRING
  },
  email: {
    type: sequelize.STRING,
    unique:true,
    allowNull: false,
  },
  authProvider:{
    type: sequelize.ENUM,
    values:['GOOGLE','FACEBOOK','PASSWORD']
  }

});

Users.sync({ alter: true }).then(()=>{
  console.log(`User table created`)
})
module.exports=Users

