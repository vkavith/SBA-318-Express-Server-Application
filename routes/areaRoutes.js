const express = require("express");
const router = express.Router();
const areas = require("../data/area");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(areas);
});

router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.description && req.body.popularDish) {
    if (areas.find((a) => a.name == req.body.name)) {
      res.json({ error: "This dish already present " });
      return;
    }
    const area = {
      areaID: areas[areas.length - 1].areaID + 1,
      name: req.body.name,
      description: req.body.description,
      popularDish: req.body.popularDish,
    };

    areas.push(area);
    res.json(areas[areas.length - 1]);
  } else res.json({ error: " not enough data" });
});

router.get("/:areaID", (req, res) => {
  const area = areas.find((a) => a.areaID == req.params.areaID);
  if (area) res.json(area);
  //else next();
});

module.exports = router;
