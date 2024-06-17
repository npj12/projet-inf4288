const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projet INF4288',
      description: "API endpoints for a numerization and authencication of birth certificates documented on swagger",
      contact: {
        name: "Junior Nango",
        email: "prince.nango@facsciences-uy1.cm"
      },
      version: '1.0.0',
    },
    components: {
      securitySchemes:{
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server"
      },
      {
        url: "https://projet-inf4288.onrender.com:3000/",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./api/routes/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port=process.env.PORT | 3000) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = swaggerDocs