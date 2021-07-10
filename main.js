displayProducts(products);

console.log(products);

document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleCreateButton();
    handleResetButton();
});

document.querySelector("#saveButton").addEventListener("click", function (e) {
    e.preventDefault();
    handleSaveProduct(gg);
    handleResetButton();
    displayProducts(products);
});

let myStorage = window.localStorage;

