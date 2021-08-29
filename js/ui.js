// I used Firebase in this version of my website

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


function displayProducts() {
    ref.get().then((data) => {
        let productsElement = document.querySelector("#left");
        let max = 0;
        productsElement.innerHTML = `<button id="json-button" onclick="handleDownloadButton()">Download products</button>
    <button id="delete-all-products" onclick="handleDeleteAllButton()">Delete all products</button>
    <br>
    `;
        if (data.exists()) {
            data = data.val();
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                database.ref("Products/" + keys[i]).get().then((snapshot) => {
                    snapshot = snapshot.val();
                    let key = Object.keys(snapshot)
                    for (let a = 0; a < key.length; a++) {
                        productsElement.innerHTML += productBox(snapshot[key[a]]);
                        if (snapshot[key[a]].id > max) {
                            max = snapshot[key[a]].id;
                        }
                    }
                    globalThis.x = max + 1;
                })
            }
        } else {
            globalThis.x = 0;
        }
    })
}

function getFormData() {
    let formData = {
        name: document.querySelector("#name").value,
        category: uppercaseFirstLetter(document.querySelector("#category").value),
        manufacturer: document.querySelector("#manufacturer").value,
        picture: document.querySelector("#picture").value,
        description: document.querySelector("#product-description").value,
        price: parseFloat(document.querySelector("#price").value),
        quantity: parseFloat(document.querySelector("#quantity").value),

    };

    return formData;
}

function addProduct({
    name,
    category,
    manufacturer,
    picture,
    description,
    price,
    quantity
}) {
    document.querySelector("#category").disabled = false;
    document.querySelector("#manufacturer").disabled = false;
    let newProduct = {
        id: x,
        name: name,
        category: category,
        manufacturer: manufacturer,
        picture: picture,
        description: description,
        price: price,
        quantity: quantity,
    };
    x++;
    database.ref("Products/" + uppercaseFirstLetter(newProduct.category)).push(newProduct);
}

function handleCreateButton() {
    addProduct(getFormData());
    let disab = document.querySelector("#saveButton");
    disab.disabled = true;
    disab.classList.add("clickable-save");
    disab.classList.remove("clickable");
    displayProducts();
}

function handleResetButton() {
    document.querySelector("#form").reset();
    document.querySelector("#category").disabled = false;
    document.querySelector("#manufacturer").disabled = false;
    let disab = document.querySelector("#saveButton");
    disab.disabled = true;
    disab.classList.add("clickable-save");
    disab.classList.remove("clickable");
}

function addToForm(id) {
    handleResetButton();
    let disab = document.querySelector("#saveButton");
    disab.disabled = false;
    disab.classList.remove("clickable-save");
    disab.classList.add("clickable");
    ref.get().then(("value", (data) => {
        data = data.val();
        let keys = Object.keys(data);
        for (let j = 0; j < keys.length; j++) {
            database.ref("Products/" + keys[j]).get().then((snapshot) => {
                snapshot = snapshot.val();
                let key = Object.keys(snapshot)
                for (let u = 0; u < key.length; u++) {
                    if (snapshot[key[u]].id == id) {
                        fbi = snapshot[key[u]];
                        globalThis.cia = key[u];
                        document.querySelector("#name").value = fbi.name;
                        document.querySelector("#category").value = fbi.category;
                        document.querySelector("#category").disabled = true;
                        document.querySelector("#manufacturer").value = fbi.manufacturer;
                        document.querySelector("#manufacturer").disabled = true;
                        document.querySelector("#product-description").value = fbi.description;
                        document.querySelector("#price").value = fbi.price;
                        document.querySelector("#quantity").value = fbi.quantity;
                        document.querySelector("#picture").value = fbi.picture;
                        globalThis.bruh = id;
                    }
                }
            })
        }
    }))
}

function handleSaveProduct(bruh) {
    saveVal = {
        id: bruh,
        name: document.querySelector("#name").value,
        picture: document.querySelector("#picture").value,
        description: document.querySelector("#product-description").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
    }
    document.querySelector("#category").disabled = false;
    document.querySelector("#manufacturer").disabled = false;
    let disab = document.querySelector("#saveButton");
    disab.disabled = true;
    disab.classList.add("clickable-save");
    disab.classList.remove("clickable");
    database.ref("Products/" + uppercaseFirstLetter(document.getElementById('category').value) + "/" + cia).update(saveVal)
}



function handleDeleteButton(bro) {
    let conf;
    conf = confirm("Are you sure you want to delete this product ?", "confirm");
    if (conf) {

        ref.get().then((data) => {
            data = data.val();
            let keys = Object.keys(data);
            for (let j = 0; j < keys.length; j++) {
                database.ref("Products/" + keys[j]).get().then((snapshot) => {
                    snapshot = snapshot.val();
                    let key = Object.keys(snapshot)
                    for (let u = 0; u < key.length; u++) {
                        if (snapshot[key[u]].id == bro) {
                            ref.child(keys[j]).child(key[u]).remove();
                            let disab = document.querySelector("#saveButton");
                            disab.disabled = true;
                            disab.classList.add("clickable-save");
                            disab.classList.remove("clickable");
                            document.querySelector("#category").disabled = false;
                            document.querySelector("#manufacturer").disabled = false;
                            handleResetButton();
                            displayProducts();
                        }
                    }
                })
            }
        })
    }
}

function handleDownloadButton() {
    products.length = 0;
    ref.get().then((data) => {
        data = data.val();
        let keys = Object.keys(data);
        for (let j = 0; j < keys.length; j++) {
            database.ref("Products/" + keys[j]).get().then((snapshot) => {
                snapshot = snapshot.val();
                let key = Object.keys(snapshot)
                for (let i = 0; i < key.length; i++) {
                    let newObj = {
                        name: snapshot[key[i]].name,
                        category: snapshot[key[i]].category,
                        manufacturer: snapshot[key[i]].manufacturer,
                        picture: snapshot[key[i]].picture,
                        description: snapshot[key[i]].description,
                        price: snapshot[key[i]].price,
                        quantity: snapshot[key[i]].quantity,
                    }
                    products.push(newObj);
                }
                if (j == (keys.length - 1)) {
                    console.log("1");
                    download("products.json", JSON.stringify(products))
                }
            });

        }
    })
}

function download(filename, text) {
    var element = document.createElement('a');
    element.style.display = "none";
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

    element.setAttribute('download', filename);
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function handleDeleteAllButton() {
    let conf = confirm("Are you sure you want to delete all these products ?", "confirm");
    if (conf) {
        ref.set({});
        displayProducts();
    }
}

function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}