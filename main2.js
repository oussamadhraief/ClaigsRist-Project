displayProducts(products);


document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleCreateButton();
    handleResetButton();
});

document.querySelector("#saveButton").addEventListener("click", function (e) {
    e.preventDefault();
    handleSaveProduct(gg);
    handleResetButton();
});

// function compare(a, b) {
//     if (a > b) return 1;
//     if (a < b) return -1;

//     return;
// }


// function sortProducts() {
//     let pass = 1;
//     do {
//         globalThis.perm = new Boolean(false);
//         for (let h = 0; h < (products.length - pass); h++) {
//             if (products[h].id > products[h + 1].id) {
//                 let aux = products[h];
//                 products[h] = products[h + 1];
//                 products[+1] = aux;
//                 perm = true;
//             }
//         }
//         pass++;
//     } while (!perm);
// }



// sortProducts();

console.log(products);