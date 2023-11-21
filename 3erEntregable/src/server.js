import express from "express";
// import { readFile } from "fs/promises";
import ProductManager from "./ProductManager.js";

const nuevoProductManager = new ProductManager("./src/Productos.json");
// const allProducts = nuevoProductManager.getProducts()
// console.log(allProducts);

const app = express();
const PORT = 8080;

const products = app.get("/", (req, res) => {
  res.send(
    "¡Bienvenido al 3er Entregable de Marianella Torressi para el curso de Backend!"
  );
});

app.get("/products", async (req, res) => {
  try {
    const productos = await nuevoProductManager.getProducts();

    const { limit } = req.query;

    if (limit) {
      const limitNumber = Number(limit);
      return res.send( productos.slice(0,limitNumber));
     
    }else{
      res.send(productos);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productos2 = await nuevoProductManager.getProducts();
    console.log(productos2);

    console.log(req.params);
    const { pid } = req.params;

    const producto = productos2.find((prod) => prod.id === Number(pid));
    if (producto) {
      return res.send(producto);
    }

    res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
