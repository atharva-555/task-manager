import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for Task Manager project",
    },
    servers: [
      {
        url: "http://localhost:5000", // your backend URL
      },
    ],
  },
  apis: [".src/routes/*.js"], // paths to files where APIs are defined
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
