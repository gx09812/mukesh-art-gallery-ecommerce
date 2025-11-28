
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.body.section;

    if (!category) {
      console.log("❌ ERROR: section not received");
      return cb(new Error("Section missing"));
    }

    const uploadPath = path.join(__dirname, "uploads", category);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).any();   // <── FIXED

app.post("/upload", upload, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  const category = req.body.section;
  const imageFile = req.files[0].filename;

  return res.json({
    success: true,
    filePath: `/uploads/${category}/${imageFile}`,
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => console.log("Server running on port 5000"));
