const socket = io();


const allProducts = document.getElementById("allProducts");

socket.on("renderProducts", products =>{
   //console.log(products);

   products.forEach(element => {
      allProducts.innerHTML += `
      <h3>Producto ${element.id}</h3>
      <P>Título: ${element.title}</P>
      <P>Descripción: ${element.description}</P>
      <P>Precio: ${element.price}</P>
      <td><img src="${element.thumbnail}" width="150"></td>
      <P>Código: ${element.code}</P>
      <P>Stock: ${element.stock}</P>
      <P>Estado: ${element.status}</P>
      <P>Categoría: ${element.category}</P>
      `
   });
})



