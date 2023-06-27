const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
// routes import
const authRoutes = require("./routes/auth");

// SETTING MULTER
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fileUpload = require("./middleware/file-upload");
const filesUpload = multer({ dest: "uploads/images" });
const app = express();

// SET STATIC FOLDER
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.post("/upload", filesUpload.array("photos", 40), (req, res) => {
  console.log(req.files);

  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

//TODO: ROUTES
app.use("/auth", authRoutes);
// app.use("/news", newsRoutes);
// app.use("/discover", discoverRoutes);
// THE MIDDLEWARE OF ROUTES WILL BE ADDED HERE AFTER THE ABOVE MIDDLEWARE
app.use("/manga", require("./routes/shop"));
// ERROR FALLBACK
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "An unknown error occurred";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// START SERVER & BACKEND CONNECTION
mongoose
  .connect(
    "mongodb+srv://Specter:9YXRYF49i1R92ztH@cluster0.gecerxr.mongodb.net/specomics?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
