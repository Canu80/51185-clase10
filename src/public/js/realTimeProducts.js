const socket = io();

const botonEnviar = document.getElementById("enviar");

botonEnviar.addEventListener("click", (event) => {
  //event.preventDefault();
  if (event) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };

    socket.emit("message", newProduct);
  }
});

//socket.on("Products", products => {
//  let allProducts = document.getElementById("products");
//  allProducts.innerHTML = allProducts;
//});


