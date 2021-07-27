// I used localStorage in this version of my website

function productBox({
    id,
    name,
    price,
    quantity,
    picture
}) {
    return `
    <div class="prod" id="${id}">
        <a href="#" class="icon" onClick="addToForm(${id})"><img class="editicon" src="https://manula.r.sizr.io/large/user/1/img/editbutton-android_v1.png" alt="edit"></a>
        <a href="#" class="delicon" onClick="handleDeleteButton(${id})"><img class="deleteicon" src="https://icon-library.com/images/delete-icon/delete-icon-14.jpg" alt="edit"></a> 
        <img src="${picture}" class="prodimg" alt="product image" width="150px" height="150px">
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <br>
        <p>${name}</p>
        <p>${price} DT (${quantity} pieces)</p>
    </div>
    `;
}

function displayProducts(products) {

    let productsElement = document.querySelector("#left");
    productsElement.innerHTML = "";
    if (localStorage.length > 0) {
        if (products.length < localStorage.length && edited == false) {
            hyper = JSON.parse(localStorage.getItem("Table"));
            for (let w = 0; w < hyper.length; w++) {
                products.push(hyper[w]);
            }
        } else {
            localStorage.setItem("Table", JSON.stringify(products));
        }
    } else {
        let whatever = [];
        localStorage.setItem("Table", JSON.stringify(whatever));

    }

    if (products.length > 0 && products[0] !== 0) {
        for (let c = 0; c < products.length; c++) {
            productsElement.innerHTML += productBox(products[c]);
        }
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

function addProduct({
    name,
    price,
    quantity,
    picture
}) {
    x = products.length;
    let newProduct = {
        id: x,
        name: name,
        price: price,
        quantity: quantity,
        picture: picture,
    };
    if (products[0] !== 0) {
        products.push(newProduct);
    } else {
        products.length = 0;
        products.push(newProduct);
    }
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
    let saveVal = {
        id: bruh,
        name: document.querySelector("#name").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
        picture: document.querySelector("#picture").value,
    };
    products[bruh] = saveVal;
}

function handleDeleteButton(bruh) {
    let conf;
    conf = confirm("Are you sure you want to delete this product ?", "confirm");
    edited = false;
    if (conf == true) {
        products.splice(bruh, 1);
        if (products.length > 0) {
            for (let z = bruh; z < products.length; z++) {
                products[z].id = products[z].id - 1;
            }
        }
        edited = true;
        displayProducts(products);
    }
}