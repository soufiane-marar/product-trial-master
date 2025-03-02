const sequelize = require('../config/db');
const Product = require('./product.model');
const User = require('./user.model');
const Cart = require('./cart.model');
const Wishlist = require('./wishlist.model');


User.belongsToMany(Product, { through: Cart, as: 'CartItems' });
Product.belongsToMany(User, { through: Cart, as: 'UsersCart' });

User.belongsToMany(Product, { through: Wishlist, as: 'WishlistItems' });
Product.belongsToMany(User, { through: Wishlist, as: 'UsersWishlist' });

module.exports = {
    sequelize,
    Product,
    User,
    Cart,
    Wishlist,
};
