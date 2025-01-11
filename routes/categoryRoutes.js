const express = require("express");
const router = express.Router();
const categories = require("../data/categories");

//USER ROUTES
//get all users
//localhost:3000/api/users/api/users
router.use(express.json());

router.get("/", (req, res) => {
  res.json(categories);
});

router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.description) {
    if (categories.find((c) => c.name == req.body.name)) {
      res.json({ error: "This Category Dish taken" });
      return;
    }

    const category = {
      id: categories[categories.length - 1].catid + 1, //uuid - a long random string
      name: req.body.name,
      description: req.body.description,
    };

    categories.push(category);
    res.json(categories[categories.length - 1]);
  } else res.json({ error: "Insufficent Data" });
});

router.get("/:catid", (req, res) => {
  const category = categories.find((c) => c.catid == req.params.catid);
  if (category) res.json(category);
  //else next();
});

router.patch("/:catid", (req, res) => {
  const category = categories.find((c, i) => {
    if (c.catid == req.params.catid) {
      for (const key in req.body) {
        categories[i][key] = req.body[key];
      }
      return true;
    }
  });

  console.log(category);

  if (category) res.json(category);
  else next();
});

router.delete("/:catid", (req, res) => {
  const category = categories.find((c, i) => {
    if (c.catid == req.params.catid) {
      categories.splice(i, 1);
      return true;
    }
  });

  if (category) res.json(category);
});

module.exports = router;
