import express from "express";
import { readFile } from "fs/promises";

const app = express();
const PORT = 8080;

const products = app.get("/", (req, res) => {
  res.send(
    "¡Bienvenido al 3er Entregable de Marianella Torressi para el curso de Backend!"
  );
});

app.get("/products", async (req, res) => {
  try {
    const data = await readFile("./src/Productos.json", "utf-8");

    const todosProductos = JSON.parse(data);

    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : todosProductos.length;

    const limitProductos = todosProductos.splice(0, limit);

    res.json(limitProductos);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const data = await readFile("./src/Productos.json", "utf-8");
    const productos = JSON.parse(data);

    console.log(req.params);
    const { pid } = req.params;

    const producto = productos.find((prod) => prod.id === Number(pid));
    if (producto) {
      return res.json(producto);
    }

    res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
