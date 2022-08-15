const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE||"db",
    process.env.DB_USERNAME||"root",
    process.env.DB_PASSWORD||"root",
    {
        host: process.env.DB_HOST||"localhost",
        dialect: process.env.DB_CONNECTION||'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);


module.exports = sequelize;
