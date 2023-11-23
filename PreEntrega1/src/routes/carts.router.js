import { Router } from "express";
import ProductManager from "../ProductManager.js";

const nuevoProductManager = new ProductManager("./src/Productos.json");

const router = Router();

const carts = [];

router.get("/", (req, res) => {
  res.json(carts)
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;

    const { cid } = req.params;
    const cart = carts.find((carrito) => carrito.id === Number(cid));

    const newCart = {id, products : []}

    if (carts.length === 0) {
      cart.id = 1;
    } else {
      carts.push({
        id: carts.length + 1,
        products: [],
      });

      res.json({
        cart: {
          products: [],
        },
      });
    }
  } catch {
    // console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = products.find((prod) => prod.id === Number(cid));

  if (cart) {
    return res.json(cart);
  }
});

export default router;
