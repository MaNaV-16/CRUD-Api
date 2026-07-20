const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My CRUD API'
  },
  host: 'localhost:5000',
  schemes: ['http']
};
const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);