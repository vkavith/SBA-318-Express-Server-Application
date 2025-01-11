const express = require("express");
const app = express();
const port = 3000;

const areas = require("./data/area");

const areaRoutes = require("./routes/areaRoutes");

const bodyParser = require("body-parser");

//middleware

app.use("/api/areas", areaRoutes);



app.use(express.json());

app.get("/", (req, res) => {
  res.send("In progress");
});

//end of route if areaID doesnt exist

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found" });
});

app.listen(port, () => {
  console.log(`server listening on: ${port}`);
});
