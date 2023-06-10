const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

// routes import
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

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
app.use("/news", newsRoutes);
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
