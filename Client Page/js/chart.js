const orderButton = document.querySelectorAll(".addtochart");
const searchOrderButton = document.querySelectorAll(".addtochart1");

const handleOrderButton = (id) =>  {
    auth.onAuthStateChanged(user => {
        database.ref("Users/"+ user.uid).on("value", (snapshot) => {
            snapshot = snapshot.val();
            database.ref("Products").on("value", (data) => {
                data = data.val();
                let keys= Object.keys(data);
                for(let i = 0; i < keys.length; i++){
                    if(data[keys[i]].id == id){
                        globalThis.orderedProduct = keys[i];
                    }
                }
            });
            if(snapshot.chartProducts.exists()){
                let tempChartObj = {
                    picture: snapshot.picture,
                    bio: snapshot.bio,
                    moderator: snapshot.moderator,
                    authMethods: snapshot.authMethods,
                    chartProducts: `${snapshot.chartProducts}${orderedProduct}`,
                }
            }
        });
    });
}