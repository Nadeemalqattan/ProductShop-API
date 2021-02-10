const express = require("express");
const app = express();
const db = require("./db/models");
const productRoutes = require("./routes/products");

//Middleware
app.use(express.json());
app.use("/products/", productRoutes);

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
