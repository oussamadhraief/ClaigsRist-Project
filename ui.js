function productBox({ id, name, price, quantity, picture }) {
    return `
    <div class="prod" id="${id}">
        <a href="#" class="icon" onClick="addToForm(${id})"><img class="editicon" src="https://icon-library.com/images/icon-edit/icon-edit-11.jpg" alt="edit"></a>
        <img src="${picture}" id="prodimg" alt="product image" width="150px" height="150px">
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <p>${name}</p>
        <p>${price} DT (${quantity} pieces)</p>
    </div>
    `;
}

function insertionSort(arr) {
    let length = arr.length;
    for (let h = 1; h < length; h++) {
        let k = arr[h].id;
        let obj = arr[h];
        let g = h - 1;
        while (g >= 0 && arr[g].id > k) {
            arr[g + 1] = arr[g];
            g = g - 1;
        }
        arr[g + 1] = obj;
    }
    return arr;
};

function displayProducts(products) {
    let productsElement = document.querySelector("#left");

    productsElement.innerHTML = "";

    if (localStorage.length > 0) {
        for (let j = 0; j < localStorage.length; j++) {
            let key = localStorage.key(j);
            let value = JSON.parse(localStorage.getItem(key));
            if (products.findIndex(v => v.id == value.id) == -1) {
                products.push(value);
            } else {
                products[value.id].name = value.name;
                products[value.id].price = value.price;
                products[value.id].quantity = value.quantity;
                products[value.id].picture = value.picture;
            }
        }
    }

    products = insertionSort(products);

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


function addProduct({ name, price, quantity, picture }) {
    let x = products.length;
    let newProduct = {
        id: x,
        name: name,
        price: price,
        quantity: quantity,
        picture: picture,
    };
    x++;

    addToLocal(newProduct);

}

let ind = products.length;
function addToLocal(lclstrg) {
    console.log("lcl", lclstrg);
    localStorage.setItem(ind, JSON.stringify(lclstrg));
    console.log("inlcl", localStorage.getItem(ind));
    ind++;
}

function handleCreateButton() {
    addProduct(getFormData());
    displayProducts(products);
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
    if (bruh < 3) {
        products[bruh].name = document.querySelector("#name").value;
        products[bruh].price = document.querySelector("#price").value;
        products[bruh].quantity = document.querySelector("#quantity").value;
        products[bruh].picture = document.querySelector("#picture").value;
    } else {
        let saveVal = {
            id: bruh,
            name: document.querySelector("#name").value,
            price: parseInt(document.querySelector("#price").value),
            quantity: parseInt(document.querySelector("#quantity").value),
            picture: document.querySelector("#picture").value,
        };
        let saveKey = localStorage.key(bruh - 3);
        localStorage.setItem(saveKey, JSON.stringify(saveVal));
    }
}