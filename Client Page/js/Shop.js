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
                anchors.forEach(item => item.classList.add("nav-anchors-unscrolled"));
                searchTerm.classList.add("nav-input-unscrolled");
                webname.classList.remove("webname");
                webname.classList.add("webname-unscrolled");
                searchBorder.classList.add("search-unscrolled");
                searchIcon.src = "search-unscrolled.png";
              } else {
                header.classList.add("nav-scrolled");
                anchors.forEach(item => item.classList.remove("nav-anchors-unscrolled"));
                searchTerm.classList.remove("nav-input-unscrolled");
                webname.classList.add("webname");
                webname.classList.remove("webname-unscrolled");
                searchBorder.classList.remove("search-unscrolled");
                searchIcon.src = "search.png";
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

        document.querySelector("#slider img").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
        globalThis.slidingPics = document.querySelector("#slider");
        slider2();
      }
      document.querySelector("#sort-menu-area").style.marginTop = "20px";
    }
    
    globalThis.end = 7;
    globalThis.start = 0;

  } else {
    if (bannerRemoval !== null) {


      if (randomize == 1) {
        bannerRemoval.innerHTML = "";
        document.querySelector("#nav").style.top = "0px";
        document.querySelector("#sort-menu-area").style.marginTop = (document.querySelector("#nav").offsetHeight + 10) + "px";
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
        document.querySelector("#sort-menu-area").style.marginTop = (document.querySelector("#nav").offsetHeight + 10) + "px";
      }
    }
    globalThis.end = 7 + ((pageIndex - 1) * 10);
    globalThis.start = 7 + ((pageIndex - 1) * 10) - 10;
  }

  displayProduct();
}

function displayPages() {

  ref.once("value", (snapshot) => {
    snapshot = snapshot.val();
    let keys = Object.keys(snapshot);
    let shopPages = document.querySelector("#pages");

    globalThis.pagesNumber = Math.floor(Math.abs((keys.length - 7) / 10));

    if (pagesNumber < ((keys.length - 7) / 10)) {
      pagesNumber++;
    }

    for (let j = 0; j < pagesNumber; j++) {
      shopPages.innerHTML += `<a href="#" id='page-${j+2}' onClick='handlePageButton("page-${j+2}",${j+2})' class="page">${j+2}</p>`
    }
    handleSortMenu();
  });

}

function handleSortMenu() {
  let sortMenu = document.querySelector("#sort-menu");
  switch (sortMenu.value) {
    case 'ascend':
      ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        products.length = 0;
        for (let i = 0; i < keys.length; i++) {
          products.push(snapshot[keys[i]]);
        }
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
        for (let i = 0; i < keys.length; i++) {
          products.push(snapshot[keys[i]]);
        }
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
        for (let i = 0; i < keys.length; i++) {
          products.push(snapshot[keys[i]]);
        }
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
        for (let i = 0; i < keys.length; i++) {
          products.push(snapshot[keys[i]]);

        }
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
        for (let i = 0; i < keys.length; i++) {
          products.push(snapshot[keys[i]]);

        }
        if (pageInd !== 1) {
          handlePageButton("page-1", 1);
        }

        displayProduct();
      });


      break;
  }
}

displayPages();