function productsBox ({id,name,price,quantity,picture}) {
    return `<div class="prod1" id="${id}">
    <img src="${picture}" class="prodimg" alt="product image" width="150px" height="150px">
    <p class="const1">Product Name:</p>
    <p class="vari1">${name}</p>
    <p class="const1">Price:</p>
    <p class="vari1">${price} DT.</p>
    <p class="const1">Quantity Available: </p>
    <p class="vari1">${quantity} pieces.</p>
    <button class="addtochart">Add To Chart</button>
</div>`;
}

function displayProduct(){
  let shopProducts = document.querySelector("#products");
  shopProducts.innerHTML= "";
  let products = JSON.parse(localStorage.getItem("Table"));
  for(let i = 0; i<products.length;i++){
    shopProducts.innerHTML+= productsBox(products[i]);
  }
}

displayProduct();