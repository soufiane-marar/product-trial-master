const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Accès refusé');

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).send('Token invalide');
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.email !== 'admin@admin.com') {
        return res.status(403).send('Accès non autorisé');
    }
    next();
};