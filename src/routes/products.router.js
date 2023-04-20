import { Router } from "express";
import ProductsManager from "../manager/productsManager.js";

const router = Router();
const productsManager = new ProductsManager();

// Obtenemos todos los productos
router.get("/", async (req, res) => {
  let allProducts = await productsManager.getProducts();
  res.render("realTimeProducts", { products: allProducts });
});

// Obtenemos un producto según su ID
router.get("/:pid", async (req, res) => {
  const idProduct = parseInt(req.params.pid);
  let productById = await productsManager.getProductByID(idProduct);
  res.send({ productById });
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

// Modificar un producto existente
router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  const msg = await productsManager.updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );
  res.send(msg);
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const msg = await productsManager.deleteProduct(id);
  res.render(msg);
});

export default router;
