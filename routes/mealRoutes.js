const express = require("express");
const router = express.Router();
const meals = require("../data/meals");

router.use(express.json());

router.get("/", (req, res) => {
  let filterMeals = [...meals];
  //res.json(meals);
  //});

  // Filter by category
  if (req.query.category) {
    filterMeals = filterMeals.filter(
      (meal) => meal.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  //Filter by area
  if (req.query.area) {
    filterMeals = filterMeals.filter(
      (meal) => meal.area.toLowerCase() === req.query.area.toLowerCase()
    );
  }

  //Filter by difficulty
  if (req.query.difficulty) {
    filterMeals = filterMeals.filter(
      (meal) =>
        meal.difficulty.toLowerCase() === req.query.difficulty.toLowerCase()
    );
  }

  //Filter by maximum cooking time
  if (req.query.maxTime) {
    filterMeals = filterMeals.filter(
      (meal) => meal.cookTime <= parseInt(req.query.maxTime)
    );
  }

  //Limit number of results
  if (req.query.limit) {
    filterMeals = filterMeals.slice(0, parseInt(req.query.limit));
  }

  res.json(filterMeals);
});

router.post("/", (req, res) => {
  console.log(req.body);
  if (
    req.body.name &&
    req.body.category &&
    req.body.area &&
    req.body.instructions &&
    req.body.difficulty &&
    req.body.cookTime
  ) {
    if (meals.find((m) => m.area == req.body.area)) {
      res.json({ error: "Area Dish already taken" });
      return;
    }

    const meal = {
      id: meals[meals.length - 1].mealID + 1, //uuid - a long random string
      name: req.body.name,
      category: req.body.category,
      area: req.body.area,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      cookTime: req.body.cookTime,
    };

    meals.push(meal);
    res.json(meals[meals.length - 1]);
  } else res.json({ error: "Insufficent Data" });
});

router.get("/:mealID", (req, res) => {
  const meal = meals.find((m) => m.mealID == req.params.mealID);
  if (meal) res.json(meal);
  //else next();
});

/*router.patch("/:id", (req, res) => {
  const user = users.find((u, i) => {

    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
   // return true;
  });
  
  console.log(user);

  if (user) res.json(user);
  else next();
});*/

router.put("/:mealID", (req, res) => {
  const meal = meals.find((m, i) => {
    if (m.mealID == req.params.mealID) {
      for (const key in req.body) {
        meals[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (meal) res.json(meal);
  //else next();
});

router.delete("/:mealID", (req, res) => {
  const meal = meals.find((m, i) => {
    if (m.mealID == req.params.mealID) {
      meals.splice(i, 1);
      return true;
    }
  });

  if (meal) res.json(meal);
});

module.exports = router;
