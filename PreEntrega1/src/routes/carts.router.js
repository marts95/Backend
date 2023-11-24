import { Router } from "express";
import Carts from "../Carts.js";

const nuevoCart = new Carts("./src/carrito.json");

const router = Router();

// const carts = [];

router.get("/", async (req, res) => {
  const carts = await nuevoCart.getCarts();
  res.json(carts);
});

router.post("/", async (req, res) => {
  try {
    const carts = await nuevoCart.getCarts();
    const { id, products } = req.body;

    const { cid } = req.params;
    const cart = carts.find((cart) => cart.id === Number(cid));

    if (carts.length === 0) {
      cart.id = 1;
    } else {
      carts.push({
        id: carts.length + 1,
        products: [],
      });
      res.json({ products: { products } });
    }
    nuevoCart.saveFile(cart);
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const carts = await nuevoCart.getCarts();
    const { cid } = req.params;

    const cart = carts.find((cart) => cart.id === Number(cid));

    if (cart) {
      return res.json(cart.products);
    }

    res.json({ mensaje: "Carrito no encontrado" });
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/:cid/product/:pid"),
  async (req, res) => {
    try {
      const carts = await nuevoCart.getCarts();
      const { cid, pid } = req.params;

      const index = carts.find((cart) => cart.id === Number(cid));

      const { id, products } = req.body;

      if (index == -1) {
        return res.json("Carrito no encontrado");
      }

      const carritoExistente = carts[index];
      const productIndex = carts[index].products.findIndex(
        (prod) => prod.product === Number(pid)
      );

      if (productIndex == -1) {
        carritoExistente.products.push({
          product: Number(pid),
          quantity: 1,
        });
      } else {
        carritoExistente.products[productIndex].quantity++;
      }

      carts[index] = carritoExistente;

      await nuevoCart.saveFile(carts)

      res.json(carritoExistente)
    
    } catch {
      console.error("Error al leer el archivo JSON:", error);
      res.status(500).send("Error interno del servidor");
    }
  };

export default router;
