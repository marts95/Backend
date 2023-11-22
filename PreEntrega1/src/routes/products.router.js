import { Router } from "express";

const router = Router();

const products = [
  {
    id: 1,
    title: "Alfajores",
    description: "Alfajores de dulce de leche tipo marplatenses y de maicena",
    code: "A1",
    price: 1500,
    status: true,
    stock: 25,
    category: "dulce",
  },
  {
    id: 2,
    title: "Bizcochos",
    description: "Los clásicos redonditos o cuadraditos hojaldrados",
    code: "A2",
    price: 1500,
    status: true,
    stock: 35,
    category: "salado",
  },
  {
    id: 3,
    title: "Pan de miga",
    description: "Disponible solo durante el mes de diciembre",
    code: "A3",
    price: 3500,
    status: true,
    stock: 15,
    category: "especialidad",
  },
];

router.get("/", (req, res) => {
  const { limit } = req.query;

  if (limit) {
    const limitNumber = Number(limit);
    return res.send(products.slice(0, limitNumber));
  } else {
    res.json(products);
  }
});

router.get("/:pid", (req, res) => {
  console.log(req.params);
  const { pid } = req.params;

  const producto = products.find((prod) => prod.id === Number(pid));
  if (producto) {
    return res.json(producto);
  }

  res.json({ error: "Producto no encontrado" });
});

router.post("/", (req, res) => {
  const { id, title, description, code, price, status, stock, category } =
    req.body;

  const { pid } = req.params;
  const product = products.find((prod) => prod.id === Number(id));

  if (products.length === 0) {
    product.id = 1;
  } else {
    products.push({
      id: products.length + 1,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
    });

    res.json({
      product: {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
      },
    });

    //Ale te dejo los objetos para que copies y pegues para probar si se agregan
    //     {
    //     "title": "Cañoncitos",
    //     "description": "Con relleno de dulce de leche",
    //     "code": "A4",
    //     "price": 3500,
    //     "stock": 18,
    //     "category": "dulce"
    // }
    // {
    //     "title": "Chipaquitos",
    //     "description": "No apto para vegetarianos",
    //     "code": "A4",
    //     "price": 1600,
    //     "stock": 12,
    //     "category": "salado"
    // }
  }
});

router.put("/:pid", (req, res) => {
  console.log(req.params);
  const { pid } = req.params;

  // const { id } = req.params;
  const index = products.findIndex((prod) => prod.id === Number(pid));

  const { title, description, code, price, status, stock, category } = req.body;

  if (index == -1) {
    return res.json({ error: "Producto no encontrado" });
  }

  products[index] = {
    id: Number(pid),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
  };

  res.json({
    product: {
      id: Number(pid),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
    },
  });
  //{
  //     "title": "Chipaquitos",
  //     "description": "No apto para vegetarianos",
  //     "code": "A6",
  //     "price": 1600,
  //     "stock": 12,
  //     "category": "salado"
  // }
});

router.delete("/:pid", (req, res) => {
    const {pid} = req.params

    const index = products.findIndex((user) => user.id === Number(pid))

    if(index === -1){
        res.json({
            error: "Usuario no encontrado"
        })
    }

products.splice(index, 1)

res.json({
    status: "Usuario eliminado"
})})

export default router;
