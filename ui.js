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

function displayProducts(products) {
    let productsElement = document.querySelector("#left");

    productsElement.innerHTML = "";

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

    products.push(newProduct);

}

function handleCreateButton() {
    console.log("create button");
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
    globalThis.gg = id;
}

function handleSaveProduct(gg) {
    products[gg].name = document.querySelector("#name").value;
    products[gg].price = document.querySelector("#price").value;
    products[gg].quantity = document.querySelector("#quantity").value;
    products[gg].picture = document.querySelector("#picture").value;
}