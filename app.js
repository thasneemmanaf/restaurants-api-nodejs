const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");

// Middlewares
app.use(express.json());

app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(5000, () => {
  console.log("listening to port 5000");
});

module.exports = app;
