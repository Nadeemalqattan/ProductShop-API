const express = require("express");
const db = require("./db/models");
const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();
const path = require("path");

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/products", productRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

console.log("directory name", path.join(__dirname, "media"));

//Not found error 404
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path not found",
  });
});

//Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal server Error" });
});

db.sequelize.sync({});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
