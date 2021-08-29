displayProducts();


document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleCreateButton();
    handleResetButton();
});

document.querySelector("#saveButton").addEventListener("click", function (e) {
    e.preventDefault();
    handleSaveProduct(bruh);
    displayProducts();
    handleResetButton();
});

fileInput.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    reader.onload = function () {
        let prods = JSON.parse(reader.result);
        if (confirm("Are you sure you want add this/these product(s) ?", "confirm")) {
            for (let i = 0; i < prods.length; i++) {
                addProduct(prods[i]);
                handleResetButton();
            }
            displayProducts();
        }
    }
}, false);