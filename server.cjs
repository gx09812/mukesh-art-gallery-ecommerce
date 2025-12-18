require('dotenv').config(); // MUST BE AT THE VERY TOP
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql2");
const axios = require("axios");
const FormData = require("form-data");
const { Readable } = require("stream");
const PDFDocument = require("pdfkit");

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION (Using .env) ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");

  // REVIEWS TABLE 
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

  // UPLOADED IMAGES TABLE 
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

/*  MULTER  */

// Disk (Gallery)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || "contact_requests";
    const uploadPath = path.join("uploads", category);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: diskStorage });

// Memory (Telegram)
const uploadToMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB safety
});

/*  IMAGE to  PDF  */
function imageBufferToPDF(imageBuffer) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ autoFirstPage: false });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.addPage({ size: "A4", margin: 40 });
    doc.image(imageBuffer, {
      fit: [520, 750],
      align: "center",
      valign: "center",
    });

    doc.end();
  });
}

/*  TELEGRAM ORDER ROUTE  */


app.post(
  "/contact-telegram",
  uploadToMemory.single("attachment"),
  async (req, res) => {
    const { name, message } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Clean, safe caption
    const caption = `🛒 *New Order Received*\n👤 Name: ${name}\n📝 Message: ${message}\n📅 ${new Date().toLocaleString()}`;

    try {
      // 1️⃣ No file → send just message
      if (!req.file) {
        const form = new FormData();
        form.append("chat_id", chatId);
        form.append("text", caption);
        form.append("parse_mode", "Markdown");

        return form.submit(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          (err, telegramRes) => {
            if (err) {
              console.error("Telegram Error:", err);
              return res.status(500).json({ success: false, message: err.message });
            }
            telegramRes.on("data", () => {});
            telegramRes.on("end", () => res.json({ success: true, type: "message" }));
          }
        );
      }

      // 2️⃣ Validate image type
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ success: false, message: "Only image files allowed" });
      }

      // 3️⃣ Validate file size (max 10MB)
      if (req.file.size > 10 * 1024 * 1024) {
        return res.status(400).json({ success: false, message: "File too large (max 10MB)" });
      }

      // 4️⃣ Convert image → PDF
      const pdfBuffer = await new Promise((resolve) => {
        const doc = new PDFDocument({ autoFirstPage: false });
        const buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        doc.addPage({ size: "A4", margin: 40 });
        doc.image(req.file.buffer, { fit: [520, 750], align: "center", valign: "center" });
        doc.end();
      });

      console.log("PDF buffer size:", pdfBuffer.length);

      // 5️⃣ Send PDF to Telegram with caption
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("caption", caption);
      formData.append("parse_mode", "Markdown"); // ensures bold, emojis work
      formData.append(
        "document",
        Readable.from(pdfBuffer), // new stream
        { filename: `order-${Date.now()}.pdf`, contentType: "application/pdf" }
      );

      formData.submit(
        `https://api.telegram.org/bot${botToken}/sendDocument`,
        (err, telegramRes) => {
          if (err) {
            console.error("Telegram Error:", err);
            return res.status(500).json({ success: false, message: err.message });
          }

          telegramRes.on("data", () => {});
          telegramRes.on("end", () => res.json({ success: true, type: "pdf" }));
        }
      );

    } catch (error) {
      console.error("Unexpected Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);


// ORIGINAL GALLERY UPLOAD ROUTE
const singleImageCategories = ["home", "articles", "freegift"];
app.post("/upload", upload.single("image"), (req, res) => {
  const { title, category } = req.body;

  if (!req.file || !category) {
    return res.json({ success: false, message: "Missing data" });
  }

  const filePath = `/uploads/${category}/${req.file.filename}`;

  if (singleImageCategories.includes(category)) {
    db.query("SELECT image_path FROM uploaded_images WHERE category = ?", [category], (err, rows) => {
        if (err) return res.json({ success: false });
        if (rows.length > 0) {
          const oldFile = "." + rows[0].image_path;
          if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
        }
        db.query("DELETE FROM uploaded_images WHERE category = ?", [category], (err) => {
            if (err) return res.json({ success: false });
            db.query("INSERT INTO uploaded_images (title, category, image_path) VALUES (?, ?, ?)",
              [title, category, filePath], (err, result) => {
                if (err) return res.json({ success: false, message: "Duplicate blocked by DB" });
                res.json({ success: true, message: "Free image replaced successfully", id: result.insertId, image_path: filePath });
              }
            );
          }
        );
      }
    );
  } else {
    db.query("INSERT INTO uploaded_images (title, category, image_path) VALUES (?, ?, ?)",
      [title, category, filePath], (err, result) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, id: result.insertId, image_path: filePath });
      }
    );
  }
});

// GET LATEST IMAGE BY CATEGORY
app.get("/get/:category", (req, res) => {
  const category = req.params.category;
  db.query("SELECT * FROM uploaded_images WHERE category = ? ORDER BY uploaded_at DESC LIMIT 1",
    [category], (err, rows) => {
      if (err || !rows || rows.length === 0) return res.json({ success: false });
      res.json({ success: true, id: rows[0].id, title: rows[0].title, image_path: rows[0].image_path });
    }
  );
});

// GALLERY IMAGES (PAGINATED)
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

// DELETE BY TITLE
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

// REVIEWS
app.post("/reviews", (req, res) => {
  const { name, review, rating } = req.body;
  if (!name || !review || !rating) return res.json({ success: false });

  db.query("INSERT INTO reviews (name, review, rating) VALUES (?, ?, ?)",
    [name, review, rating], err => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM reviews ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, reviews: rows });
  });
});

// SEARCH IMAGES
app.get("/search", (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);
  const searchTerm = `%${q}%`;
  db.query("SELECT * FROM uploaded_images WHERE title LIKE ? ORDER BY uploaded_at DESC",
    [searchTerm], (err, rows) => {
      if (err) return res.json([]);
      res.json(rows);
    }
  );
});
app.get("/test-telegram", async (req, res) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: "Telegram test successful ",
      }
    );
    res.send("OK");
  } catch (e) {
    res.status(500).json(e.response?.data || e.message);
  }
});


app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));