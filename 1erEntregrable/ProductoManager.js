class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((prod) => prod.code === product.code)) {
      console.log("Ya existe un producto con ese código");
      return;
    }

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      return console.log("Not Found");
    }
  }
}

class Product {
  constructor(title, description, price, code, thumbnail, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.code = code;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
}

//prueba
const manejadorProducto = new ProductManager();

console.log(`Creando un producto sin descripción`);
manejadorProducto.addProduct(
  new Product("Zapatillas", 2500, "A1", "FotoZapatilla", 25)
);

console.log(`Creando un producto`);
manejadorProducto.addProduct(
  new Product("Zapatos", "Cómodos y baratos", 2500, "A1", "FotoZapatos", 25)
);

console.log(`Creando un producto con código repetido`);
manejadorProducto.addProduct(
  new Product("Botas", "Elegantes y a la moda", 3500, "A1", "FotoBotas", 35)
);

console.log(`Creando un producto con código nuevo`);
manejadorProducto.addProduct(
  new Product("Sandalias", "Elegantes y a la moda", 4500, "A2", "FotoBotas", 35)
);

console.log(manejadorProducto.getProducts());

console.log("Buscar un producto por ID");
const producto1 = manejadorProducto.getProductById(1);
console.log(producto1);
const producto2 = manejadorProducto.getProductById(5);
