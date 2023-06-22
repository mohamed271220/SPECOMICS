const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes import
const authRoutes = require("./routes/auth");
const newsRoutes = require("../client/should_be_here/newsAPI");
const discoverRoutes = require("../client/should_be_here/discoverPage");
// SETTING MULTER
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(bodyParser.json());



// SET STATIC FOLDER
app.use("/uploads/images", express.static(path.join(__dirname, "images")));

// CORS CONFIGURATION
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//TODO: ROUTES
app.use("/auth", authRoutes);
// app.use("/news", newsRoutes);
// app.use("/discover", discoverRoutes);
// THE MIDDLEWARE OF ROUTES WILL BE ADDED HERE AFTER THE ABOVE MIDDLEWARE
app.use("/manga", require("./routes/shop"));
// ERROR FALLBACK
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
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
