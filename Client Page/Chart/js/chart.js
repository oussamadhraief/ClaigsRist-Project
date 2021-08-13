var firebaseConfig = {
    apiKey: "AIzaSyCDcfRlaYDRLzA8cVeSXfbh98HeVXoyR-c",
    authDomain: "claigsrist.firebaseapp.com",
    databaseURL: "https://claigsrist-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "claigsrist",
    storageBucket: "claigsrist.appspot.com",
    messagingSenderId: "927216397570",
    appId: "1:927216397570:web:c58e81522d3bc3ca60261b",
    measurementId: "G-PDP8VG2MSV"
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

const Auth = firebase.auth();

let ref = database.ref("Products");

document.querySelector("#chart").style.marginTop = (document.querySelector("#nav").offsetHeight + 10).toString() + "px";

const chartProductBox = ({
    id,
    name,
    price,
    quantity,
    picture
}) => {
    return `<tr class="tr${id}">
     <td><img src="${picture}" alt="" class="product-image"></td>
     <td class="description-field">${name}</td>
     <td>${quantity}</td>
     <td> ${price}&#160;TND</td>
     <td><input type="number" value="1" min="1" class="quantity" id="input${id}" onChange="handleTotal(${id})" required><div>
         <button type="button" class="decrement-button" onClick="handleDecrementButton(${id})">-</button>
         <button type="button" class="increment-button" onClick="handleIncrementButton(${id},${quantity})">+</button>
     </div></td>
     <td><img src="https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/delete-icon-256.png" alt="remove-product" class="remove-product" id="remove-product${id}" onClick="handleRemoveProduct(${id})"></td>
     <td id="total${id}">1&#160;Pieces<br>
         ${price}&#160;TND</td>
 </tr>`;
}
document.querySelector("#body").style.height = (screen.height-document.querySelector("#nav").offsetHeight) +"px";
console.log(screen.height);
console.log(document.querySelector("#body").offsetHeight);

const displayProducts = () => {
    const chartProductsElement = document.querySelector("tbody");
    chartProductsElement.innerHTML = "";
    let s = 0;
    Auth.onAuthStateChanged(user => {
        database.ref("Users/" + user.uid).get().then((data) => {
            data = data.val();
            database.ref("Products").get().then((snapshot) => {
                snapshot = snapshot.val();
                let keys = Object.keys(snapshot);
                let length = keys.length;
                if (!data.chartProducts == "") {
                    for (let i = 0; i < length; i++) {
                        if (data.chartProducts.includes(keys[i])) {
                            s++;
                            chartProductsElement.innerHTML += chartProductBox(snapshot[keys[i]]);
                        }
                    }
                    // console.log("1");
                    // console.log(screen.height);
                    // if (s == 0) {
                    //     document.querySelector("#footer").style.marginTop = (screen.height - document.querySelector("#footer").offsetHeight).toString() + "px";
                    // } else if (s == 1) {
                    //     document.querySelector("#footer").style.marginTop = (screen.height - document.querySelector("#footer").offsetHeight - 160).toString() +"px";
                    // } else if (s == 2) {
                    //     document.querySelector("#footer").style.marginTop = (screen.height - document.querySelector("#footer").offsetHeight - 320).toString() +"px";
                    // } else {
                    //     document.querySelector("#footer").style.marginTop = "10px";
                    // }
                } else {
                    // console.log("1");
                    // console.log(screen.height);
                    // document.querySelector("#footer").style.marginTop = (screen.height - document.querySelector("#footer").offsetHeight).toString() + "px";
                    chartProductsElement.innerHTML += `<tr>
                    <td colspan="7" id="no-products-chart">Your chart is empty ! Explore our products and add them to your shopping chart to view them here.</td>
                    </tr>`;
                    // document.querySelector("#footer").style.marginTop = "400px";
                }

            });
        });

    });

}

const handleIncrementButton = (id, maxQuantity) => {
    if (document.querySelector(`#input${id}`).value < maxQuantity) {
        document.querySelector(`#input${id}`).value++;
        handleTotal(id);
    }
}

const handleDecrementButton = (id) => {
    if (document.querySelector(`#input${id}`).value > 1) {
        document.querySelector(`#input${id}`).value--;
        handleTotal(id);
    }

}

const handleTotal = (id) => {
    if (document.querySelector(`#input${id}`).value < 1) {
        document.querySelector(`#input${id}`).value = 1;
    }

    database.ref("Products").get().then((snapshot) => {
        snapshot = snapshot.val();
        let keys = Object.keys(snapshot);
        for (let i = 0; i < keys.length; i++) {
            if (snapshot[keys[i]].id == id) {
                if (document.querySelector(`#input${id}`).value > snapshot[keys[i]].quantity) {
                    document.querySelector(`#input${id}`).value = snapshot[keys[i]].quantity;
                }
                let totalPrice = document.querySelector(`#input${id}`).value * snapshot[keys[i]].price;
                document.querySelector(`#total${id}`).innerHTML = `
                ${document.querySelector(`#input${id}`).value}&#160;Pieces<br>
                ${totalPrice}&#160;TND
                `;
            }
        }
    });

}

const handleRemoveProduct = (id) => {

    Auth.onAuthStateChanged(user => {
        const chartProductsElement = document.querySelector("tbody");
        database.ref("Products").get().then((snapshot) => {
            snapshot = snapshot.val();
            let keys = Object.keys(snapshot);
            for (let i = 0; i < keys.length; i++) {
                if (snapshot[keys[i]].id == id) {
                    document.querySelector(`.tr${id}`).classList.add("animationFadeOut");
                    setTimeout(() => {
                        chartProductsElement.innerHTML -= chartProductBox(snapshot[keys[i]]);
                        database.ref("Users/" + user.uid).get().then((snapshot) => {
                            snapshot = snapshot.val();

                            newChartProducts = snapshot.chartProducts.replace(keys[i], "");

                            database.ref("Users/" + user.uid).update({
                                chartProducts: newChartProducts
                            });
                            displayProducts();
                        });
                    }, 500);



                }
            }
        });


    });

}

displayProducts();