import { Router } from "express";
import ProductsManager from "../manager/productsManager.js";

const router = Router();
const productsManager = new ProductsManager();

// Obtenemos todos los productos
router.get("/", async (req, res) => {
  let allProducts = await productsManager.getProducts();
  res.render("home", { products: allProducts });
});

export default router;