let count = 0;

function slide(direction) {
    var container = document.querySelector("#featured-products ul");
    let scrollCompleted = 0;
    var slideVar = setInterval(function () {
        if (direction == 'left') {
            container.scrollLeft -= 60;
        } else {
            let temp = container.scrollLeft;
            container.scrollLeft += 60;
            if (container.scrollLeft == temp) {
                count++;
                if (count > 1) {
                    document.querySelector("#previous-prod").disabled = true;
                    document.querySelector("#next-prod").disabled = true;
                    var fallbackVar = setInterval(function () {
                        container.scrollLeft -= 200;
                        if (container.scrollLeft == 0) {
                            window.clearInterval(fallbackVar);
                        }
                    }, 50);

                    count = 0;
                }
                window.clearInterval(slideVar);
                document.querySelector("#previous-prod").disabled = false;
                document.querySelector("#next-prod").disabled = false;
            }
        }
        scrollCompleted += 50;

        if (scrollCompleted >= 300) {
            window.clearInterval(slideVar);
        }
    }, 50);
}

document.querySelector("#previous-prod").addEventListener("click", () => {
    slide("left");
});

document.querySelector("#next-prod").addEventListener("click", () => {
    slide("right");
});


const handleOrderButton = (id) => {
    auth.onAuthStateChanged(user => {
        if (user) {
            database.ref("Products").get().then((snapshot) => {
                snapshot = snapshot.val();
                let keys = Object.keys(snapshot);
                let length = keys.length;
                for (let i = 0; i < length; i++) {
                    if (snapshot[keys[i]].id == id) {
                        database.ref("Users/" + user.uid).get().then((data) => {
                            data = data.val();
                            if (!data.chartProducts.includes(keys[i])) {

                                database.ref("Users/" + user.uid).update({
                                    chartProducts: `${data.chartProducts}${keys[i]}`,
                                });
                            } else {

                                database.ref("Users/" + user.uid).update({
                                    chartProducts: `${data.chartProducts}`,
                                });
                            }
                        });

                    }
                }
            });
        }
    });
    window.location.reload(true);
}