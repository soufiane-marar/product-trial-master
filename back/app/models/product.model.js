const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    internalReference: DataTypes.STRING,
    shellId: DataTypes.INTEGER,
    inventoryStatus: {
        type: DataTypes.ENUM('INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'),
        defaultValue: 'INSTOCK',
    },
    rating: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Product;
