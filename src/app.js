import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import realTime from "./routes/realTime.router.js";
import ProductsManager from "./manager/productsManager.js";

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto: " + PORT);
});

const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) =>{
    if(req.body && req.body._method){
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use("/", viewsRouter);
app.use("/realtimeproducts", realTime);

const productsManager = new ProductsManager();

io.on("connection", async client =>{
    console.log("Conectado el cliente")
    const products = await productsManager.getProducts();
    io.emit("renderProducts", products);
    

    client.on("submitado", async data =>{
        await productsManager.addProduct(data);
        io.emit("addProduct", data);
    })

    client.on("delete", async data => {
        console.log("Se eliminara id: " + data);
        await productsManager.deleteProduct(data);
    })

})

