const socket = io();


const allProducts = document.getElementById("allProducts");

socket.on("renderProducts", products =>{
   //console.log(products);

   products.forEach(element => {
      allProducts.innerHTML += `<P>${element.title}</P>
      <P>${element.price}</P>
      <P>${element.stock}</P>
      <P>${element.description}</P>
      <P>${element.code}</P>`
      console.log(element)
      
   });
})



