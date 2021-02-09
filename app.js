const express = require("express");
const app = express();
const db = require("./db/models");
const productRoutes = require("./routes/products");

//Middleware
app.use(express.json());
app.use("/products/", productRoutes);

db.sequelize.sync({});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
