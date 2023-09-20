const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Snkrs Store',
            version: '1.0.0',
        },
    },
    apis: [
        './src/document/user.yaml',
        './src/document/product.yaml',
        './src/document/favorites.yaml',
        './src/document/trolley.yaml',
        './src/document/shopping.yaml',
        './src/document/type.yaml',
        './src/document/category.yaml'
    ], // Ruta al archivo principal de Swagger
};

// Genera la especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;