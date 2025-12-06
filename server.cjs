const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());


//    MySQL Connection

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


//    Auto-create table if not exists

db.query(`
  CREATE TABLE IF NOT EXISTS uploaded_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);


//    Multer Storage (Category-wise folders)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.body.section;

    const uploadPath = path.join("uploads", category);

    // Create folder if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


//    Upload API + Save to MySQL

app.post("/upload", upload.single("image"), (req, res) => {
  const { title, section } = req.body;

  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  const filePath = `/uploads/${section}/${req.file.filename}`;

  const sql = `
    INSERT INTO uploaded_images (title, category, image_path)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [title, section, filePath], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      filePath: filePath,
      id: result.insertId
    });
  });
});


//    Serve Uploaded Files

app.use("/uploads", express.static("uploads"));


//    Server Start

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
