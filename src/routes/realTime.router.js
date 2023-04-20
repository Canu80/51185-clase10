import { Router } from "express";
import ProductsManager from "../manager/productsManager.js";

const router = Router();
const productsManager = new ProductsManager();

// Obtenemos todos los productos
router.get("/", async (req, res) => {
  let allProducts = await productsManager.getProducts();
  res.render("realTimeProducts", { products: allProducts });
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    res.send("Faltan datos por cargar");
    return;
  }
  const newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status: true,
    category,
  };

  const msg = await productsManager.addProduct(newProduct);
  res.send(msg);
});


// Eliminar un producto
router.delete("/", async (req, res) => {
  const id = parseInt(req.params.pid);
  const msg = await productsManager.deleteProduct(id);
  res.send(msg);
});

export default router;
