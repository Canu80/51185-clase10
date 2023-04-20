import fs from "fs";
import __dirname from "../utils.js"

const path = __dirname + "/files/products.json";

export default class ProductsManager {
  // Recibo todos los productos
  getProducts = async () => {
    if (fs.existsSync(path)) {
      const read = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(read);
      return products;
    } else {
      return [];
    }
  };

  // Recibo el producto en base a su ID
  getProductByID = async (idProduct) => {
    const products = await this.getProducts();
    const product = products.find((product) => {
      return product.id == idProduct;
    });
    return product;
  };

  // Agregamos un nuevo producto
  addProduct = async (newProduct) => {
    const products = await this.getProducts();

    if (products.length === 0) {
      newProduct.id = 1;
    } else {
      let id = products[products.length - 1].id;
      newProduct.id = ++id;
    }
    products.push(newProduct);
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return "Producto agregado";
    } catch (error) {
      return error;
    }
  };

  // Modificamos un producto existente
  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) => {
    const products = await this.getProducts();

    const indexProduct = products.findIndex((product) => {
      return product.id == id;
    });

    products[indexProduct].title = title;
    products[indexProduct].description = description;
    products[indexProduct].price = price;
    products[indexProduct].thumbnail = thumbnail;
    products[indexProduct].code = code;
    products[indexProduct].stock = stock;
    products[indexProduct].category = category;

    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return "Producto modificado";
    } catch (error) {
      return error;
    }
  };

  // Eliminamos un producto
  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const indexProduct = products.findIndex((product) => {
      return product.id == id;
    });
    products.splice(indexProduct,1)
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return "Producto eliminado";
    } catch (error) {
      return error;
    }
  };
}
