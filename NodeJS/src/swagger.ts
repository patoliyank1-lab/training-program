import swaggerJsdoc from "swagger-jsdoc";

// Swagger options definition
export const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "A sample API documentation using Express and Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT!}`, // Your server URL
        description: "Development server",
      },
    ],
  },
  // Path to the API route files (e.g., './routes/*.js' or './app.js')
  apis: ["./src/router/**.ts", "./src/routes/*.ts"],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in JSON format
export const swaggerSpec = swaggerJsdoc(options);
