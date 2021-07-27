// I used localStorage in this version of my website

function productsBox({
    id,
    name,
    price,
    quantity,
    picture
}) {
    return `<div class="prod1" id="${id}">
      <div class="remargin"><img src="${picture}" class="prodimg" alt="product image" width="150px" height="150px"></div>
      <div class="info"><div class="hr"></div>
      <div class="forflex">
      <p class="const1 formargin">Product Name:</p>
      <p class="vari1">${name}</p>
      <p class="const1">Price:</p>
      <p class="vari1">${price} DT.</p>
      <p class="const1">Quantity Available: </p>
      <p class="vari1">${quantity} pieces.</p>
      </div>
      <button class="addtochart">Add To Chart</button></div>
  </div>`;
}

function displayProduct() {
    let shopProducts = document.querySelector("#products");
    shopProducts.innerHTML = "";
    let products = JSON.parse(localStorage.getItem("Table"));
    for (let i = 0; i < products.length; i++) {
        shopProducts.innerHTML += productsBox(products[i]);
    }
}

displayProduct();