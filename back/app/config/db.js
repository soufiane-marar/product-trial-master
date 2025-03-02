const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: 5432,
        dialect: 'postgres',
        logging: true,
    }
);


sequelize.authenticate()
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('Error connecting to DB: ', err);
    });

module.exports = sequelize;