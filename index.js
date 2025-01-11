const express = require("express");
const app = express();
const port = 3000;

//const areas = require("./data/area");
//Import Routes
const areaRoutes = require("./routes/areaRoutes");
const mealRoutes = require("./routes/mealRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const bodyParser = require("body-parser");

//Import middleware
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

//Routes

app.use("/api/areas", areaRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/category", categoryRoutes);
//Middleware
app.use(express.json());
app.use(requestLogger);

//Home Route
app.get("/", (req, res) => {
  res.send("Welcome to MealDB API");
});

//404 Handler

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found" });
});

//Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
