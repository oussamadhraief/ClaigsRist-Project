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

let insertionSort = (arr) => {
    let length = arr.length;
    for (let h = 1; h < length; h++) {
        let k = arr[h].id;
        let g = h - 1;
        while (g >= 0 && arr[g].id > k) {
            arr[g + 1].id = arr[g].id;
            g = g - 1;
        }
        arr[g + 1].id = k;
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
            if (products.findIndex(v => v.id === value.id) == -1) {
                products.push(value);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        productsElement.innerHTML += productBox(products[i]);
    }
}

function getFormData() {

    let formData = {
        name: document.querySelector("#name").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: document.querySelector("#quantity").value,
        picture: document.querySelector("#picture").value,
    };

    return formData;

}


function addProduct({ name, price, quantity, picture }) {
    let newProduct = {
        id: ++lastId,
        name: name,
        price: price,
        quantity: quantity,
        picture: picture,
    };

    addToLocal(newProduct);

}

let ind = 3;
function addToLocal(lclstrg) {

    localStorage.setItem(ind, JSON.stringify(lclstrg));
    ind++;
}

function handleCreateButton() {
    console.log("create button");
    addProduct(getFormData());
    products = insertionSort(products);
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
    globalThis.gg = id;
}

function handleSaveProduct(gg) {
    products[gg].name = document.querySelector("#name").value;
    products[gg].price = document.querySelector("#price").value;
    products[gg].quantity = document.querySelector("#quantity").value;
    products[gg].picture = document.querySelector("#picture").value;
}
