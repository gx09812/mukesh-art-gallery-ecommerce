const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());



//  DATABASE CONNECTION

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "good",
  database: "art_gallery"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});



//  CREATE TABLE IF NOT EXISTS

db.query(`
  CREATE TABLE IF NOT EXISTS uploaded_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(255),
    image_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);



//  MULTER STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.section;
    const uploadPath = path.join("uploads", folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });



//  UPLOAD ROUTE

app.post("/upload", upload.single("image"), (req, res) => {
  const { title, section } = req.body;

  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  const filePath = `/uploads/${section}/${req.file.filename}`;

  const sql = `INSERT INTO uploaded_images (title, category, image_path) VALUES (?, ?, ?)`;

  db.query(sql, [title, section, filePath], (err, result) => {
    if (err) {
      console.log("MySQL Error:", err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      filePath: filePath,
      id: result.insertId
    });
  });
});



//  SEARCH ROUTE

app.get("/search", (req, res) => {
  const q = req.query.q;

  db.query(
    "SELECT * FROM uploaded_images WHERE title LIKE ? LIMIT 50",
    [`%${q}%`],
    (err, results) => {
      if (err) return res.json([]);
      res.json(results);
    }
  );
});



//  DELETE by ID

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT image_path FROM uploaded_images WHERE id = ?", [id], (err, rows) => {
    if (rows.length === 0) return res.json({ success: false });

    const imagePath = rows[0].image_path;

    fs.unlink("." + imagePath, () => {
      db.query("DELETE FROM uploaded_images WHERE id = ?", [id]);
      res.json({ success: true });
    });
  });
});



//  DELETE by TITLE  **(THIS IS WHAT YOU WANTED)**

app.delete("/delete", (req, res) => {
  const title = req.query.title;

  if (!title) return res.json({ success: false, message: "No title given" });

  db.query("SELECT image_path FROM uploaded_images WHERE title = ?", [title], (err, rows) => {
    if (err || rows.length === 0) {
      return res.json({ success: false, message: "Image not found" });
    }

    const imagePath = rows[0].image_path;

    // Delete image file
    fs.unlink("." + imagePath, () => {
      db.query("DELETE FROM uploaded_images WHERE title = ?", [title], (err2) => {
        if (err2) return res.json({ success: false });
        res.json({ success: true });
      });
    });
  });
});



//  SERVE STATIC FILES

app.use("/uploads", express.static("uploads"));



//  START SERVER

app.listen(5000, () => console.log("Server running on port 5000"));
