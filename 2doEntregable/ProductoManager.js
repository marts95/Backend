const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        let products = fs.readFileSync(path, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async saveFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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

    // if (product) {
    //   return product;
    // } else {
    //   return console.log("Not Found");
    // }
    if (fs.existsSync(path)) {
      try {
        let product = fs.readFileSync(path, "utf-8");
        this.product = JSON.parse(products);
      } catch (error) {
        this.product = {};
      }
    } else {
      this.product = {};
    }
  }

  async updateProduct(id, campoActualizado) {
    const productId = this.products.find((product) => product.id === id);

    if (!productId) {
      console.log("Producto no encontrado");
      return;
    }

    const productUpdated = this.product[productId];

    for (const key in campoActualizado) {
      if (key in productUpdated) {
        productUpdated[key] = campoActualizado[key];
      } else {
        console.log(`El campo '${key}' no es existe`);
      }
    }

    this.products[productId] = productUpdated;
    await this.saveFile(this.products);
  }

  async deleteProduct(id) {
    const productId = this.products.find((product) => product.id === id);

    if (productId) {
      const nuevoProducts = this.products.filter(
        (product) => product.id === id
      );
      this.products = nuevoProducts;
      await this.saveFile();
    } else {
      console.log("No se pudo borrar el producto");
    }
  }
}

class Product {
  constructor(title, description, price, code, thumbnail, stock) {
    this.title = title || "";
    this.description = description || "";
    this.price = price || "";
    this.code = code;
    this.thumbnail = thumbnail || "";
    this.stock = stock || "";
  }
}

//prueba
const manejadorProducto = new ProductManager("./Productos.json");

const product1 = new Product(
  "Zapatos",
  "Cómodos y baratos",
  2500,
  "A1",
  "FotoZapatos",
  25
);

const product2 = new Product(
  "Sandalias",
  "Las mejores de la temporada",
  4500,
  "A2",
  "FotoSandalias",
  35
);

console.log("Buscar un producto por ID");
const producto1 = manejadorProducto.getProductById(1);
console.log(producto1);
const producto2 = manejadorProducto.getProductById(5);

const actualizarPorducto = manejadorProducto.updateProduct(1, {
  description: "Como nunca los viste antes",
});
console.log(manejadorProducto.getProducts());

manejadorProducto.deleteProduct(2);
console.log(manejadorProducto.getProducts());
