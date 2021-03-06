const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const app = express();
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");

//Middleware
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);

//Routes
app.use(userRoutes);
app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

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

db.sequelize.sync();
// db.sequelize.sync({ force: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
