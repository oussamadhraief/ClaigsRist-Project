let i = 0;
let placeholder = "";
const txt = "What are you looking for?";
const txt1 = "ClaigsRist"
const speed = 120;
let searchBox = document.querySelector(".searchTerm");
let searchButton = document.querySelector("#search-icon");

function type() {
  placeholder += txt.charAt(i);
  document.querySelector("#webname").innerHTML += txt1.charAt(i);
  searchBox.setAttribute("placeholder", placeholder);
  i++;
  setTimeout(type, speed);
}

type();

//Search Functionnality

function productBox({
  id,
  name,
  price,
  quantity,
  picture
}) {
  return `<div class="prod2" id="${id}">
    <img src="${picture}" class="prodimg1" alt="product image">
    <div>
    <p class="const2 formargin">Product Name:</p>
    <p class="vari2">${name}</p>
    <p class="const2">Price:</p>
    <p class="vari2">${price} DT.</p>
    <p class="const2">Quantity Available: </p>
    <p class="vari2">${quantity} pieces.</p>
    <button class="addtochart1" onClick="handleOrderButton(${id})">Add To Chart</button></div>
    </div>
    
</div>`;
}


searchButton.addEventListener("click", () => {
  let searchedFor = searchBox.value;

  ref.on("value", (snapshot) => {
    snapshot = snapshot.val();
    let keys = Object.keys(snapshot);
    let searchProducts = document.querySelector("#modal-search");
    searchProducts.innerHTML = `<a class="close-modal" onClick="handleCloseModal('modal-search')" href="#">x</a>
          <p>Showing the search results for... "${searchedFor}" :</p>`;

    let x = 0;
    for (let i = start; i < keys.length; i++) {
      if (snapshot[keys[i]].name.toUpperCase().includes(searchedFor.toUpperCase())) {
        searchProducts.innerHTML += productBox(snapshot[keys[i]]);
        x++;
      }

    }
    if (x == 0) {
      searchProducts.innerHTML = `<a class="close-modal" onClick="handleCloseModal('modal-search')" href="#">x</a>
          <p>There are no products that match with "${searchedFor}".</p>`;
    }
  });
});