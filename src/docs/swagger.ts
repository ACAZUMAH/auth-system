import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
        title: 'Auth System API',
        version: '1.0.0',
        description: 'Authentication system API',
        contact: {
            name: 'Auth System'
        },
        servers: ['https://auth-system-swart.vercel.app/']
        }
    },
    apis: ['dist/routers/*.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setUpSwagger = (app: any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setUpSwagger;
