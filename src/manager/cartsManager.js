import fs from "fs";
import __dirname from "../utils.js"

const path = __dirname + "/files/carts.json";

export default class CartsManager {
  // Recibo todos los carritos
  getCarts = async () => {
    if (fs.existsSync(path)) {
      const read = await fs.promises.readFile(path, "utf-8");
      const carts = JSON.parse(read);
      return carts;
    } else {
      return [];
    }
  };

  // Recibo el carrito en base a su ID
  getCartByID = async (idCart) => {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => {
      return cart.id == idCart;
    });
    return cart;
  };

  // Creamos un nuevo carrito
  addCart = async () => {
    const carts = await this.getCarts();
    let newCart = {
      products:[],
    };

    if (carts.length === 0) {
      newCart.id = 1;
    } else {
      let id = carts[carts.length - 1].id;
      newCart.id = ++id;
    }
    carts.push(newCart);
    try{
    await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
    return "Nuevo carrito creado";
    } catch (error) {
    return error;
    }
  };

  // Agregamos productos al carrito
  addProductsInCart = async (idCart, idProduct) => {
    const carts = await this.getCarts();
    const filteredCar = carts.find((cart) => cart.id == idCart);
    let productsInCart = filteredCar.products;
    const indexProduct = productsInCart.findIndex((product) => product.id == idProduct);

    if (indexProduct == -1) {
      let newProduct = {
        id: idProduct,
        quantity: 1,
      };
      productsInCart.push(newProduct);
    } else {
      productsInCart[indexProduct].quantity = productsInCart[indexProduct].quantity + 1;
    }
    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2), "utf-8");
    return filteredCar;
  };
}
