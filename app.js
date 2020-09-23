const express = require("express");
const app = express();
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/users", userRoutes);

// To handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, "404"));
});

// To handle all errors
app.use(globalErrorHandler);

module.exports = app;
