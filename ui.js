// function addProdsToLocal() {
//     localStorage.setItem(
//         0,
//         JSON.stringify({
//             id: 0,
//             name: "Lenovo Ideapad 1",
//             price: 2450,
//             quantity: 25,
//             picture: "https://images-na.ssl-images-amazon.com/images/I/61Dw5Z8LzJL._SY450_.jpg",
//         })
//     );
//     localStorage.setItem(
//         1,
//         JSON.stringify({
//             id: 1,
//             name: "Asus X550VX",
//             price: 1800,
//             quantity: 14,
//             picture: "https://www.tunisianet.com.tn/53878-large/pc-portable-asus-x550vx-xx057d-i7-6e-gen-16-go.jpg",
//         })
//     );
//     localStorage.setItem(
//         2,
//         JSON.stringify({
//             id: 2,
//             name: "MSI Gaming GF65",
//             price: 3300,
//             quantity: 10,
//             picture: "https://www.tunisianet.com.tn/143911-large/pc-portable-msi-gaming-gf65-thin-9sd-i7-9e-gen-32-go-sim-orange-30-go.jpg",
//         })
//     );
// }

// function addToProds() {
//     let p = localStorage.key(0);
//     products.push(JSON.parse(localStorage.getItem(p)));
//     console.log(localStorage.getItem(p));
//     p = localStorage.key(1);
//     products.push(JSON.parse(localStorage.getItem(p)));
//     p = localStorage.key(2);
//     products.push(JSON.parse(localStorage.getItem(p)));

// }

// function useless() {
//     if (localStorage.length == 0) {
//         addProdsToLocal();
//         addToProds();
//         displayProducts(products);
//     }else{
//         displayProducts(products);
//     }
// }


function productBox({
    id,
    name,
    price,
    quantity,
    picture
}) {
    return `
    <div class="prod" id="${id}">
        <a href="#" class="icon" onClick="addToForm(${id})"><img class="editicon" src="https://icon-library.com/images/icon-edit/icon-edit-11.jpg" alt="edit"></a>
        <img src="${picture}" class="prodimg" alt="product image" width="150px" height="150px">
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <p>${name}</p>
        <p>${price} DT (${quantity} pieces)</p>
    </div>
    `;
}

function insertionSort(arr) {
    for (let h = 1; h < arr.length; h++) {
        let obj = arr[h];
        let g = h - 1;
        while (g >= 0 && parseInt(arr[g].id) > parseInt(arr[h].id)) {
            arr[g + 1] = arr[g];
            g = g - 1;
        }
        arr[g + 1] = obj;
    }
    return arr;
}

function displayProducts(products) {
    let productsElement = document.querySelector("#left");

    productsElement.innerHTML = "";

    for (let j = 0; j < myStg.length; j++) {
        let key = myStg.key(j);
        console.log(key);
        let value = JSON.parse(myStg.getItem(key));
        if (products.findIndex((v) => v.id == value.id) == -1) {
            products.push(value);
        } else {
            products[value.id].name = value.name;
            products[value.id].price = parseInt(value.price);
            products[value.id].quantity = parseInt(value.quantity);
            products[value.id].picture = value.picture;
        }
    }
    console.log(products);
    products = insertionSort(products);
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        productsElement.innerHTML += productBox(products[i]);
    }
}

function getFormData() {
    let formData = {
        name: document.querySelector("#name").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
        picture: document.querySelector("#picture").value,
    };

    return formData;
}

let x = myStg.length;

function addProduct({
    name,
    price,
    quantity,
    picture
}) {
    let newProduct = {
        id: x,
        name: name,
        price: price,
        quantity: quantity,
        picture: picture,
    };
    ++x;
    console.log(newProduct);
    addToLocal(newProduct);
}

let nig = "yedek";
function addToLocal(lclstrg) {

    myStg.setItem(nig+=nig, JSON.stringify(lclstrg));
}

function handleCreateButton() {
    addProduct(getFormData());
    displayProducts(products);
    console.log(products);
}

function handleResetButton() {
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#picture").value = "";
}

function addToForm(id) {
    handleResetButton();
    document.querySelector("#name").value = products[id].name;
    document.querySelector("#price").value = products[id].price;
    document.querySelector("#quantity").value = products[id].quantity;
    document.querySelector("#picture").value = products[id].picture;
    globalThis.bruh = id;
}

function handleSaveProduct(bruh) {
    let saveVal = {
        id: bruh,
        name: document.querySelector("#name").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
        picture: document.querySelector("#picture").value,
    };
    let saveKey;
    for (u = 0; u < myStg.length; u++) {
        saveKey = myStg.key(u);
        if (JSON.parse(myStg.getItem(saveKey)).id === bruh) {
            myStg.setItem(saveKey, JSON.stringify(saveVal));
        }
    }
}