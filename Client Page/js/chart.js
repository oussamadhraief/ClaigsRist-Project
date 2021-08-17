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
                                
                                database.ref("Users/" + user.uid).update({chartProducts: `${data.chartProducts}${keys[i]}`,});
                            } else {
                               
                                database.ref("Users/" + user.uid).update({chartProducts: `${data.chartProducts}`,});
                            }
                        });

                    }
                }
            });

        } else {
            document.querySelector("#login-anchor").click();
        }

    });
}