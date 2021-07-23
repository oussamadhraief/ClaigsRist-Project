// useless();
displayProducts();


document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleCreateButton();
    handleResetButton();
});

document.querySelector("#saveButton").addEventListener("click", function (e) {
    e.preventDefault();
    handleSaveProduct(bruh);
    database.ref("Products/" + saveVar).update(saveVal);
    displayProducts();
    handleResetButton();
});