import { Router } from "express";

const router = Router();

const carts = [];

router.post("/", (req, res) => {
  
 const { id } = req.params;
 const cart = carts.find((prod) => prod.id === Number(id));

  pets.push({ name, age, breed });

  res.json({
    
  });
});

router.get("/:cid", (req, res) => {
const { cid } = req.params;
const cart = products.find((prod) => prod.id === Number(cid));

  if(cart){
    return res.json(cart)
  }
});

export default router;