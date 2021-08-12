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
  
  let ref = database.ref("Products");

  const auth = firebase.auth();

 document.querySelector("#chart").style.marginTop = (document.querySelector("#nav").offsetHeight +10).toString() +"px";

  const displayProducts = () => {
    
auth.onAuthStateChanged(user => {
    database.ref("Products").on("value",(snapshot) => {
        snapshot = snapshot.val();
        database.ref("Users/"+ user.uid).on("value",(data) => {
            data = data.val();
            globalThis.orderedProducts = data.chartProducts;
        });
        let keys = Object.keys(snapshot);
        for(let i =0; i< keys.length; i++){
            if ( orderedProducts.includes(keys[i])){

            }
        }
    });
});
    
  }