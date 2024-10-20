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
        servers: [
            {
            url : 'http://localhost:3500'
           }
        ]
        }
    },
    apis: ['dist/routers/*.js']
}

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setUpSwagger = (app: any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,
        {
            customCss:
            '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
            customCssUrl: CSS_URL,
        }
    ));
};

export default setUpSwagger;
