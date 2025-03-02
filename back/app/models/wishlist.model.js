const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Wishlist = sequelize.define('Wishlist', {}, {timestamps: true});

module.exports = Wishlist;
