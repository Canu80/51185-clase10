const socket = io();


const allProducts = document.getElementById("allProducts");

socket.on("renderProducts", products =>{
   console.log(products);
   allProducts.innerHTML = JSON.stringify(products);
})



