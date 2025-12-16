const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Categories that allow only one image
const singleImageCategories = ["home", "articles", "freegift"];

//  DATABASE 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "good",
  database: "art_gallery"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");

  //  REVIEWS TABLE 
  db.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      review TEXT NOT NULL,
      rating INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) throw err;
    console.log("Reviews table checked/created");
  });

  //  UPLOADED IMAGES TABLE 
  db.query(`
    CREATE TABLE IF NOT EXISTS uploaded_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(255),
      image_path VARCHAR(255),
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) throw err;
    console.log("Uploaded Images table checked/created");
  });
});

//  MULTER STORAGE 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
    if (!category) return cb(new Error("Category missing"), null);

    const uploadPath = path.join("uploads", category);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

//  ROUTES 

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  const { title, category } = req.body;

  if (!req.file || !category) {
    return res.json({ success: false, message: "Missing data" });
  }

  const filePath = `/uploads/${category}/${req.file.filename}`;

  if (singleImageCategories.includes(category)) {
    // 🔹 Step 1: Get old image
    db.query(
      "SELECT image_path FROM uploaded_images WHERE category = ?",
      [category],
      (err, rows) => {
        if (err) return res.json({ success: false });

        // 🔹 Step 2: Delete old file if exists
        if (rows.length > 0) {
          const oldFile = "." + rows[0].image_path;
          if (fs.existsSync(oldFile)) {
            fs.unlinkSync(oldFile);
          }
        }

        // 🔹 Step 3: Delete old DB row FIRST
        db.query(
          "DELETE FROM uploaded_images WHERE category = ?",
          [category],
          (err) => {
            if (err) return res.json({ success: false });

            // 🔹 Step 4: Insert new image
            db.query(
              "INSERT INTO uploaded_images (title, category, image_path) VALUES (?, ?, ?)",
              [title, category, filePath],
              (err, result) => {
                if (err) {
                  return res.json({
                    success: false,
                    message: "Duplicate blocked by DB"
                  });
                }

                res.json({
                  success: true,
                  message: "Free image replaced successfully",
                  id: result.insertId,
                  image_path: filePath
                });
              }
            );
          }
        );
      }
    );
  } else {
    // 🔹 Multiple image categories
    db.query(
      "INSERT INTO uploaded_images (title, category, image_path) VALUES (?, ?, ?)",
      [title, category, filePath],
      (err, result) => {
        if (err) return res.json({ success: false });

        res.json({
          success: true,
          id: result.insertId,
          image_path: filePath
        });
      }
    );
  }
});

// Get latest image by category
app.get("/get/:category", (req, res) => {
  const category = req.params.category;
  db.query(
    "SELECT * FROM uploaded_images WHERE category = ? ORDER BY uploaded_at DESC LIMIT 1",
    [category],
    (err, rows) => {
      if (err) return res.json({ success: false });
      if (!rows || rows.length === 0) return res.json({ success: false });

      res.json({
        success: true,
        id: rows[0].id,
        title: rows[0].title,
        image_path: rows[0].image_path
      });
    }
  );
});

// Gallery images
app.get("/gallery", (req, res) => {
  const { category, page = 1, limit = 6 } = req.query;
  const offset = (page - 1) * limit;

  let sql = "SELECT * FROM uploaded_images";
  let params = [];

  if (category && category !== "all") {
    sql += " WHERE category = ?";
    params.push(category);
  }

  sql += " ORDER BY uploaded_at DESC LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  db.query(sql, params, (err, rows) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, artworks: rows });
  });
});

// Delete by title
app.delete("/delete", (req, res) => {
  const title = req.query.title;
  if (!title) return res.json({ success: false, message: "No title given" });

  db.query("SELECT image_path FROM uploaded_images WHERE title = ?", [title], (err, rows) => {
    if (!rows || rows.length === 0) return res.json({ success: false });

    fs.unlink("." + rows[0].image_path, () => {
      db.query("DELETE FROM uploaded_images WHERE title = ?", [title]);
      res.json({ success: true });
    });
  });
});

// Add review
app.post("/reviews", (req, res) => {
  const { name, review, rating } = req.body;

  if (!name || !review || !rating) {
    return res.json({ success: false });
  }

  db.query(
    "INSERT INTO reviews (name, review, rating) VALUES (?, ?, ?)",
    [name, review, rating],
    err => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

// Get all reviews
app.get("/reviews", (req, res) => {
  db.query(
    "SELECT * FROM reviews ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.json({ success: false });
      res.json({
        success: true,
        reviews: rows
      });
    }
  );
});

// SEARCH IMAGES BY TITLE
app.get("/search", (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const searchTerm = `%${q}%`;
  db.query(
    "SELECT * FROM uploaded_images WHERE title LIKE ? ORDER BY uploaded_at DESC",
    [searchTerm],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.json([]);
      }
      res.json(rows);
    }
  );
});


// Serve static files
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));