const express = require('express');
const router = express.Router();
const {User, Product} = require('../models');
const {authenticate} = require('../middlewares/authentication');

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{model: Product, as: 'CartItems', through: {attributes: ['quantity']}}],
        });
        res.json(user.CartItems);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        if (quantity <= 0)
            throw {message: "La quantité doit etre une valeur positif"}
        const user = await User.findByPk(req.user.id);
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({error: 'Produit non trouvé'});
        await user.addCartItem(product, {through: {quantity}});
        res.status(201).json({message: 'Produit ajouté'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.delete('/', authenticate, async (req, res) => {
    try {
        const {productId} = req.body;
        const user = await User.findByPk(req.user.id);
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({error: 'Produit non trouvé'});
        await user.removeCartItem(product);
        res.json({message: 'Produit supprimé'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;
