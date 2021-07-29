// I used firebase realtime database in this version of my website

//Data

var firebaseConfig = {
  apiKey: "AIzaSyCDcfRlaYDRLzA8cVeSXfbh98HeVXoyR-c",
  authDomain: "claigsrist.firebaseapp.com",
  databaseURL: "https://claigsrist-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "claigsrist",
  storageBucket: "claigsrist.appspot.com",
  messagingSenderId: "927216397570",
  appId: "1:927216397570:web:c58e81522d3bc3ca60261b",
  measurementId: "G-PDP8VG2MSV"
};
firebase.initializeApp(firebaseConfig);


let database = firebase.database();

let ref = database.ref("Products");

//Functions

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

function displayProduct(start, end) {
  ref.on("value", (snapshot) => {
    snapshot = snapshot.val();
    let keys = Object.keys(snapshot);
    let shopProducts = document.querySelector("#products");
    shopProducts.innerHTML = "";

    if (pageInd == (pagesNumber + 1)) {

      for (let i = start; i < keys.length; i++) {
        shopProducts.innerHTML += productsBox(snapshot[keys[i]]);

      }
    } else {
      for (let i = start; i < end; i++) {
        shopProducts.innerHTML += productsBox(snapshot[keys[i]]);

      }
    }
  });
}

function handlePageButton(id, pageIndex) {
  let classRemoval = document.querySelector("#pages");
  for (let h = 0; h < classRemoval.children.length; h++) {
    classRemoval.children[h].classList.remove("page-selected");
  }
  let selected = document.querySelector("#" + id);

  selected.classList.add("page-selected");

  globalThis.pageInd = pageIndex;

  if (pageIndex == 1) {
    globalThis.end = 7;
    globalThis.start = 0;
  } else {
    let bannerRemoval = document.querySelector("#banner");
    let navHeight = document.querySelector("#nav");
    console.log(navHeight.offsetHeight);
    bannerRemoval.style.height = navHeight.offsetHeight.toString() + "px";
   
    globalThis.end = 7 + ((pageIndex - 1) * 10);
    globalThis.start = 7 + ((pageIndex - 1) * 10) - 10;
  }

  displayProduct(start, end);
}

function displayPages() {
  ref.on("value", (snapshot) => {
    snapshot = snapshot.val();
    let keys = Object.keys(snapshot);
    let shopPages = document.querySelector("#pages");

    globalThis.pagesNumber = Math.floor((keys.length - 7) / 10);

    if (pagesNumber < ((keys.length - 7) / 10)) {
      pagesNumber++;
    }

    for (let j = 0; j < pagesNumber; j++) {
      shopPages.innerHTML += `<a href="#" id='page-${j+2}' onClick='handlePageButton("page-${j+2}",${j+2})' class="page">${j+2}</p>`
    }
  });
}

displayPages();

handlePageButton("page-1", 1);