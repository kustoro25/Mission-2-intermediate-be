const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course Management API",
      version: "1.0.0",
      description: "API untuk manajemen course video belajar",
      contact: {
        name: "API Support",
        email: "support@videobelajar.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Course: {
          type: "object",
          required: ["title", "description", "price"],
          properties: {
            id: {
              type: "integer",
              description: "ID course",
            },
            title: {
              type: "string",
              description: "Judul course",
            },
            description: {
              type: "string",
              description: "Deskripsi course",
            },
            thumbnail_url: {
              type: "string",
              description: "URL thumbnail course",
            },
            price: {
              type: "number",
              format: "float",
              description: "Harga course",
            },
            category_id: {
              type: "integer",
              description: "ID kategori",
            },
            instructor_id: {
              type: "integer",
              description: "ID instructor",
            },
            average_rating: {
              type: "number",
              format: "float",
              description: "Rating rata-rata",
            },
            total_ratings: {
              type: "integer",
              description: "Total rating",
            },
            is_published: {
              type: "boolean",
              description: "Status publish",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
            },
            data: {
              type: "null",
            },
          },
        },
      },
    },
  },
  apis: ["./app.js"], // file yang berisi dokumentasi
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
