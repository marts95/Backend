import express from "express";
import {ProductManager} from "./ProductManager.cjs";

const app = express();
const PORT = 5001;

const products =  

app.get("/", (req, res) => {
  res.send("¡Bienvenido al 3er Entregable de Marianella Torressi para el curso de Backend!")
});

app.get("/products", (req, res) => {
    const {limit} = req.params;

    //const datos = await getDatos()

    // if(limit){
    //     //Limitar el array de productos
    // }
  res.json(products);
});

app.get("/products/:pid", (req, res) => {
console.log(req.params);
const { id } = req.params;

const producto = products.find((prod) => prod.id === Number(id));
if (producto) {
  res.json(producto);
}

res.json({ error: "Producto no encontrado" });
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));