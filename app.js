const express = require("express");
const app = express();
const conn = require("./config/db");
const { specs, swaggerUi } = require("./swagger");

app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Mendapatkan semua data courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan semua courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: sukses menampilkan semua data courses
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/course", function (req, res) {
  const queryStr = "SELECT * FROM courses";
  conn.query(queryStr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "sukses menampilkan semua data courses",
        data: result,
      });
    }
  });
});

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Mendapatkan course berdasarkan ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID course
 *     responses:
 *       200:
 *         description: Sukses mendapatkan course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: sukses menampilkan data course
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/course/:id", function (req, res) {
  const id = req.params.id;
  const queryStr = "SELECT * FROM courses WHERE id = ?";

  conn.query(queryStr, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: "data course tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "sukses menampilkan data course",
          data: result[0],
        });
      }
    }
  });
});

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Membuat course baru
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript Fundamentals"
 *               description:
 *                 type: string
 *                 example: "Belajar dasar-dasar JavaScript"
 *               thumbnail_url:
 *                 type: string
 *                 example: "https://example.com/thumbnail.jpg"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 199000
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               instructor_id:
 *                 type: integer
 *                 example: 1
 *               average_rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               total_ratings:
 *                 type: integer
 *                 example: 100
 *               is_published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sukses membuat course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sukses menyimpan data
 *                 data:
 *                   type: null
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/course", function (req, res) {
  const param = req.body;
  const title = param.title;
  const description = param.description;
  const thumbnail_url = param.thumbnail_url;
  const price = param.price;
  const category_id = param.category_id;
  const instructor_id = param.instructor_id;
  const average_rating = param.average_rating;
  const total_ratings = param.total_ratings;
  const is_published = param.is_published;

  const queryStr =
    "INSERT INTO courses (title, description, thumbnail_url, price, category_id, instructor_id, average_rating, total_ratings, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    title,
    description,
    thumbnail_url,
    price,
    category_id,
    instructor_id,
    average_rating,
    total_ratings,
    is_published,
  ];

  conn.query(queryStr, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses menyimpan data",
        data: null,
      });
    }
  });
});

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Mengupdate course berdasarkan ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript Fundamentals Updated"
 *               description:
 *                 type: string
 *                 example: "Belajar dasar-dasar JavaScript - Updated"
 *               thumbnail_url:
 *                 type: string
 *                 example: "https://example.com/thumbnail-updated.jpg"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 299000
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               instructor_id:
 *                 type: integer
 *                 example: 1
 *               average_rating:
 *                 type: number
 *                 format: float
 *                 example: 4.7
 *               total_ratings:
 *                 type: integer
 *                 example: 150
 *               is_published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sukses mengupdate course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sukses mengupdate data
 *                 data:
 *                   type: null
 *       404:
 *         description: Course tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put("/course/:id", function (req, res) {
  const id = req.params.id;
  const param = req.body;
  const title = param.title;
  const description = param.description;
  const thumbnail_url = param.thumbnail_url;
  const price = param.price;
  const category_id = param.category_id;
  const instructor_id = param.instructor_id;
  const average_rating = param.average_rating;
  const total_ratings = param.total_ratings;
  const is_published = param.is_published;

  const queryStr =
    "UPDATE courses SET title = ?, description = ?, thumbnail_url = ?, price = ?, category_id = ?, instructor_id = ?, average_rating = ?, total_ratings = ?, is_published = ? WHERE id = ?";
  const values = [
    title,
    description,
    thumbnail_url,
    price,
    category_id,
    instructor_id,
    average_rating,
    total_ratings,
    is_published,
    id,
  ];

  conn.query(queryStr, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: "data course tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Sukses mengupdate data",
          data: null,
        });
      }
    }
  });
});

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Menghapus course berdasarkan ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID course
 *     responses:
 *       200:
 *         description: Sukses menghapus course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sukses menghapus data
 *                 data:
 *                   type: null
 *       404:
 *         description: Course tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete("/course/:id", function (req, res) {
  const id = req.params.id;
  const queryStr = "DELETE FROM courses WHERE id = ?";

  conn.query(queryStr, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: "data course tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Sukses menghapus data",
          data: null,
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log(
    "Swagger documentation available at http://localhost:3000/api-docs"
  );
});
