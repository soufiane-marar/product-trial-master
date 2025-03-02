const router = require('express').Router();
const {Product} = require('../models');
const {authenticate, isAdmin} = require('../middlewares/authentication');

router.get('/', authenticate, async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.post('/bulk', authenticate, isAdmin, async (req, res) => {
    try {
        const products = await Product.bulkCreate(req.body);
        res.status(201).json(products);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({error: 'Produit non trouvé'});
        res.json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.patch('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({error: 'Produit non trouvé'});
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({error: 'Produit non trouvé'});
        await product.destroy();
        res.json({message: 'Produit supprimé'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;