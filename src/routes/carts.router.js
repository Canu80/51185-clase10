import { Router } from "express";
import CartsManager from "../manager/cartsManager.js";

const router = Router();
const cartsManager = new CartsManager();

// Obtener todos los carritos
router.get("/", async (req, res) => {
  let allCarts = await cartsManager.getCarts();
  res.send({ allCarts });
});

// Obtenemos un carrito según su ID para ver sus productos
router.get("/:cid", async (req, res) => {
  const idCart = parseInt(req.params.cid);
  let cartByID = await cartsManager.getCartByID(idCart);
  res.send({ cartByID });
});

//Generamos un nuevo carrito
router.post("/", async (req, res) => {
  const msg = await cartsManager.addCart();
  res.send(msg);
});

// Agregamos un producto al carrito seleccionado según su ID
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const result = await cartsManager.addProductsInCart(idCart, idProduct);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
