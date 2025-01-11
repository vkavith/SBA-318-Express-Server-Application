const express = require("express");
const app = express();
const port = 3000;

//const areas = require("./data/area");

const areaRoutes = require("./routes/areaRoutes");
const mealRoutes = require("./routes/mealRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const bodyParser = require("body-parser");

//Routes

app.use("/api/areas", areaRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/category", categoryRoutes);
//Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to MealDB API");
});

//end of route if areaID doesnt exist

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found" });
});

app.listen(port, () => {
  console.log(`server listening on: ${port}`);
});
