if (process.env.USER) require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorhandler = require("./errors/errorHandler");

// app.use("/movies", moviesRouter);
app.use("reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorhandler);

module.exports = app;
