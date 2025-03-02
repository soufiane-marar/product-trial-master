const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Swagger endpoint (optional) - you can serve swagger.yaml statically or use swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerDocument = yaml.load(fs.readFileSync('./app/swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server after DB sync
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
