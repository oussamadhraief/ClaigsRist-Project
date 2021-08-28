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
    ref.on("value", gotData, errData);
}

function errData(error) {
    console.log(error.message, error.code);
}

function gotData(data) {
    let productsElement = document.querySelector("#left");
    productsElement.innerHTML = `<button id="json-button" onclick="handleDownloadButton()">Download products</button>
    <button id="delete-all-products" onclick="handleDeleteAllButton()">Delete all products</button>
    <br>
    `;
    if (data.exists()) {
        data = data.val();
        let keys = Object.keys(data);
        globalThis.x = data[keys[keys.length - 1]].id + 1;
        for (let a = 0; a < keys.length; a++) {
            productsElement.innerHTML += productBox(data[keys[a]]);
        }
    } else {
        globalThis.x = 0;
    }
}

function getFormData() {
    let formData = {
        name: document.querySelector("#name").value,
        category: document.querySelector("#category").value,
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
    ref.push(newProduct);
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
    ref.on("value", getData, errData);

    function getData(data) {
        data = data.val();
        let keys = Object.keys(data);
        for (let j = 0; j < keys.length; j++) {
            if (data[keys[j]].id == id) {
                globalThis.fbi = keys[j];
            }
        }
        document.querySelector("#name").value = data[fbi].name;
        document.querySelector("#category").value = data[fbi].category;
        document.querySelector("#manufacturer").value = data[fbi].manufacturer;
        document.querySelector("#product-description").value = data[fbi].description;
        document.querySelector("#price").value = data[fbi].price;
        document.querySelector("#quantity").value = data[fbi].quantity;
        document.querySelector("#picture").value = data[fbi].picture;
        globalThis.bruh = id;
    }
}

function handleSaveProduct(bruh) {
    globalThis.saveVal = {
        id: bruh,
        name: document.querySelector("#name").value,
        category: document.querySelector("#category").value,
        manufacturer: document.querySelector("#manufacturer").value,
        picture: document.querySelector("#picture").value,
        description: document.querySelector("#product-description").value,
        price: parseInt(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
    };
    let disab = document.querySelector("#saveButton");
    disab.disabled = true;
    disab.classList.add("clickable-save");
    disab.classList.remove("clickable");
    ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        for (let o = 0; o < keys.length; o++) {
            if (snapshot[keys[o]].id == bruh) {
                globalThis.saveVar = keys[o];
            }
        }
    });
}



function handleDeleteButton(bro) {
    let conf;
    conf = confirm("Are you sure you want to delete this product ?", "confirm");
    if (conf) {

        ref.on("value", geatData, errData);

        function geatData(data) {
            data = data.val();
            let keys = Object.keys(data);
            for (let index = 0; index < keys.length; index++) {
                if (data[keys[index]].id == bro) {
                    globalThis.delVar = keys[index];
                }
            }
        }
        ref.child(delVar).remove();
    }
    let disab = document.querySelector("#saveButton");
    disab.disabled = true;
    disab.classList.add("clickable-save");
    disab.classList.remove("clickable");
    displayProducts();
}

function handleDownloadButton() {
    products.length = 0;
    ref.on("value", (snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        for (let i = 0; i < keys.length; i++) {
            let newObj = {
                name: snapshot[keys[i]].name,
                category: snapshot[keys[i]].category,
                manufacturer: snapshot[keys[i]].manufacturer,
                picture: snapshot[keys[i]].picture,
                description: snapshot[keys[i]].description,
                price: snapshot[keys[i]].price,
                quantity: snapshot[keys[i]].quantity,
            }
            products.push(newObj);
        }
    });

    download("products.json", JSON.stringify(products))
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

function handleDeleteAllButton(){
    let conf = confirm("Are you sure you want to delete all these products ?", "confirm");
    if(conf){
        ref.set({});
    }
    
}