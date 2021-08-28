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

let products = new Array();

let s = 0;

//Functions

document.querySelector("#webname").addEventListener("click", () => {
  window.location.reload(true);
});

function productsBox({
  id,
  name,
  price,
  quantity,
  picture
}) {
  return `<div class="prod1" id="${id}">
    <div class="remargin"><img src="${picture}" class="prodimg" alt="product image" width="150px" height="150px"></div>
    <p class="vari1">${name}</p>
    <p class="vari1">${price} DT.</p>

    <button class="addtochart" onClick="handleOrderButton(${id})">Add To Chart</button></div>
</div>`;
}

function displayProduct() {
  let shopProducts = document.querySelector("#products");
  shopProducts.innerHTML = ``;

  if (pageInd == (pagesNumber + 1)) {
    for (let i = start; i < products.length; i++) {
      shopProducts.innerHTML += productsBox(products[i]);
    }
  } else {
    for (let i = start; i < end; i++) {
      shopProducts.innerHTML += productsBox(products[i]);
    }
  }

  if (products.length == 0) {
    shopProducts.innerHTML = `<p style="color: #383838;">There are no products to display.</p>`;
  }

  document.querySelector(".loading").style.height = (document.querySelector("#container").offsetHeight - 40) + "px";
  document.querySelector(".loading").style.width = document.getElementById('sort-menu-area').offsetWidth + "px";
  document.querySelector("#loading-animation").style.display = "none";
}

function handlePageButton(id, pageIndex) {
  let classRemoval = document.querySelector("#pages");
  for (let h = 0; h < classRemoval.children.length; h++) {
    classRemoval.children[h].classList.remove("page-selected");
  }
  let selected = document.querySelector("#" + id);

  selected.classList.add("page-selected");

  globalThis.pageInd = pageIndex;

  let bannerRemoval = document.querySelector(".banner");

  if (pageIndex == 1) {
    if (bannerRemoval !== null) {

      if (randomize == 1 && bannerRemoval.innerHTML == "") {
        bannerRemoval.innerHTML = `<video id="banner" width="100%" height="auto" loop muted autoplay>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/WEBM">
    </video>`;


        const sectionOneOptions = {
          rootMargin: "100px 0px 0px 0px"
        };

        const sectionOneObserver = new IntersectionObserver(function (
            entries,
            sectionOneObserver
          ) {
            entries.forEach(entry => {
              if (!entry.isIntersecting) {
                header.classList.remove("nav-scrolled");
              } else {
                header.classList.add("nav-scrolled");
              }
            });
          },
          sectionOneOptions);

        sectionOneObserver.observe(sectionOne);
      } else if (randomize == 2 && bannerRemoval.innerHTML == "") {
        header.classList.add("nav-scrolled");
        header.style.border = "none";
        header.style.boxShadow = "1px 1px 5px black";
        bannerRemoval.innerHTML = ` 
        <div id="slider">
            
            
			<img src="https://www.scoop.com.tn/modules/sphomeslider/images/c3e8e4b0ad02f2470a20317442c308b549d37633_Asus%20(1).jpg" class="animate__animated animate__fadeIn">
			<a href="#"  class="previous" onClick="nextIsSlider5()">&#8249;</a>
            <a href="#" class="next" onClick="nextIsSlider2()">&#8250;</a>
            <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
        
	</div>`;

        document.querySelector("#slider img").addEventListener("load", () => {
          document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
          document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
          document.querySelector("#slider").style.padding = "0px";
          document.querySelector("#slider img").style.marginTop = "3px";
          header.style.top = "0px";
        });

        window.addEventListener("resize", () => {

          document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
          document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
          document.querySelector("#slider").style.padding = "0px";
          document.querySelector("#slider img").style.marginTop = "3px";
          header.style.top = "0px";

        });

        globalThis.slidingPics = document.querySelector("#slider");
        slider2();
      }
      document.querySelector("#container").style.marginTop = "0px";
    }

    globalThis.end = 8;
    globalThis.start = 0;

  } else {
    if (bannerRemoval !== null) {


      if (randomize == 1) {
        bannerRemoval.innerHTML = "";
        document.querySelector("#nav").style.top = "0px";
        document.querySelector("#container").style.marginTop = (document.querySelector("#nav").offsetHeight + 10) + "px";
      } else {
        for (let i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i]);
        }
        timeouts.length = 0;
        for (let i = 0; i < anotherTimeouts.length; i++) {
          clearTimeout(anotherTimeouts[i]);
        }
        bannerRemoval.innerHTML = "";

        document.querySelector("#nav").style.top = "0px";
        document.querySelector("#container").style.marginTop = (document.querySelector("#nav").offsetHeight + 10) + "px";
      }
    }
    globalThis.end = 8 + ((pageIndex - 1) * 20);
    globalThis.start = 8 + ((pageIndex - 1) * 20) - 20;
  }

  displayProduct();
}

function displayPages() {

    let shopPages = document.querySelector("#pages");
    shopPages.innerHTML =`<a href="#" id="page-1" onClick="handlePageButton('page-1',1)" class="page">1</a>`;
    globalThis.pagesNumber = Math.floor(Math.abs((products.length - 8) / 20));

    if (pagesNumber < ((products.length - 8) / 20)) {
      pagesNumber++;
    }

    for (let j = 0; j < pagesNumber; j++) {
      shopPages.innerHTML += `<a href="#" id='page-${j+2}' onClick='handlePageButton("page-${j+2}",${j+2})' class="page">${j+2}</p>`
    }

}

function handleSortMenu() {
  let sortMenu = document.querySelector("#sort-menu");
  switch (sortMenu.value) {
    case 'ascend':
      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        let minimumPrice;
        let maximumPrice;
        if(mqMedia.matches == false){
          let priceInputs = document.querySelectorAll(".unempty-input");
          minimumPrice = priceInputs[0].value;
          maximumPrice = priceInputs[1].value;
        }else{
          minimumPrice = 0;
          maximumPrice = 20000;
        }
        for (let i = 0; i < keys.length; i++) {
          if (snapshot[keys[i]].price >= minimumPrice && snapshot[keys[i]].price <= maximumPrice) {
            products.push(snapshot[keys[i]]);
          }
        }
        displayPages();
      });

      for (let i = products.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
          if (products[j - 1].price > products[j].price) {
            let temp = products[j - 1];
            products[j - 1] = products[j];
            products[j] = temp;
          }
        }
      }
      if (pageInd !== 1) {
        handlePageButton("page-1", 1);
      }

      displayProduct();

      break;

    case 'descend':
      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        let minimumPrice;
        let maximumPrice;
        if(mqMedia.matches == false){
          let priceInputs = document.querySelectorAll(".unempty-input");
          minimumPrice = priceInputs[0].value;
          maximumPrice = priceInputs[1].value;
        }else{
          minimumPrice = 0;
          maximumPrice = 20000;
        }
        for (let i = 0; i < keys.length; i++) {
          if (snapshot[keys[i]].price >= minimumPrice && snapshot[keys[i]].price <= maximumPrice) {
            products.push(snapshot[keys[i]]);
          }
        }
        displayPages();
      });
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (products[i].price > products[j].price) {
            let temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
        }
      }
      if (pageInd !== 1) {
        handlePageButton("page-1", 1);
      }

      displayProduct();

      break;

    case 'newest':
      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        let minimumPrice;
        let maximumPrice;
        if(mqMedia.matches == false){
          let priceInputs = document.querySelectorAll(".unempty-input");
          minimumPrice = priceInputs[0].value;
          maximumPrice = priceInputs[1].value;
        }else{
          minimumPrice = 0;
          maximumPrice = 20000;
        }
        for (let i = 0; i < keys.length; i++) {
          if (snapshot[keys[i]].price >= minimumPrice && snapshot[keys[i]].price <= maximumPrice) {
            products.push(snapshot[keys[i]]);
          }
        }
        displayPages();
      });
      products = products.reverse();
      if (pageInd !== 1) {
        handlePageButton("page-1", 1);
      }

      displayProduct();

      break;

    case 'oldest':

      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        let minimumPrice;
        let maximumPrice;
        if(mqMedia.matches == false){
          let priceInputs = document.querySelectorAll(".unempty-input");
          minimumPrice = priceInputs[0].value;
          maximumPrice = priceInputs[1].value;
        }else{
          minimumPrice = 0;
          maximumPrice = 20000;
        }
        for (let i = 0; i < keys.length; i++) {
          if (snapshot[keys[i]].price >= minimumPrice && snapshot[keys[i]].price <= maximumPrice) {
            products.push(snapshot[keys[i]]);
          }
        }
        displayPages();
        if (s == 0 || pageInd !== 1) {
          s++;
          handlePageButton("page-1", 1);
        }
        displayProduct();
      });


      break;

    default:

      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        
        let minimumPrice;
        let maximumPrice;
        if(mqMedia.matches == false){
          let priceInputs = document.querySelectorAll(".unempty-input");
          minimumPrice = priceInputs[0].value;
          maximumPrice = priceInputs[1].value;
        }else{
          minimumPrice = 0;
          maximumPrice = 20000;
        }
        
        for (let i = 0; i < keys.length; i++) {
          if (snapshot[keys[i]].price >= minimumPrice && snapshot[keys[i]].price <= maximumPrice) {
            products.push(snapshot[keys[i]]);
          }
        }
        displayPages();
        if (pageInd !== 1) {
          handlePageButton("page-1", 1);
        }

        displayProduct();
      });


      break;
  }
}


const mqMedia = window.matchMedia("(max-width: 570px)");

handleSortMenu();