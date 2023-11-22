import { Router } from "express";

const router = Router();

const pets = []

router.get("/", (req, res) => {
  res.json({
    pets,
  });
});

router.post("/", (req, res) => {
  const { name, age, breed } = req.body;

  pets.push({ name, age, breed });

  res.json({
    pet: { name, age, breed },
  });
});

export default router;