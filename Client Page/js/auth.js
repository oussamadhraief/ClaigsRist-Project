const auth = firebase.auth();

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
    } else {
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
    }
}

//Listen for auth status changes

auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
        console.log(user);
        console.log(user.providerId);
        console.log(user.email);
        console.log(user.password);
        database.ref("Users/" + user.uid).on("value", (snapshot) => {
            let emailInput = document.querySelector("#acc-email");
            let passwordInput = document.querySelector("#acc-password");
            let bioInput = document.querySelector("#acc-bio");
            let picInput = document.querySelector("#user-pic");

            snapshot = snapshot.val();

            emailInput.value = user.email;
            passwordInput.value = user.password;
            bioInput.value = snapshot.bio;
            picInput.src = snapshot.picture;

            let footer = document.querySelector("#footer");

            if (snapshot.moderator) {
                footer.innerHTML = `<a href="../index.html" class="underline">&larr; Go back to Admin Panel</a>

                <p>Oussama Dhraief <span>© </span>2021</p>
            <div>
            <a href="About.html" target="_blank" class="underline">About Us</a>
            <a href="https://www.facebook.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/facebook-2-icon-256.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/instagram-2-icon-256.png"
                    alt="instagram"></a>
        </div>`;

            }
        });
    } else {
        setupUI();
    }
});

//Sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return database.ref("Users/" + cred.user.uid).set({
            picture: "https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png",
            bio: "",
        });
    }).then(() => {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});


//Logout

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
    let footer = document.querySelector("#footer");
    footer.innerHTML = `

    <p>Oussama Dhraief <span>© </span>2021</p>
            <div>
            <a href="About.html" target="_blank" class="underline">About Us</a>
            <a href="https://www.facebook.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/facebook-2-icon-256.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/instagram-2-icon-256.png"
                    alt="instagram"></a>
        </div>`;
});

//Log in

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        database.ref("Users/" + cred.user.uid).on("value", (snapshot) => {
            let emailInput = document.querySelector("#acc-email");
            let passwordInput = document.querySelector("#acc-password");
            let bioInput = document.querySelector("#acc-bio");
            let picInput = document.querySelector("#user-pic");

            snapshot = snapshot.val();

            emailInput.value = email;
            passwordInput.value = password;
            bioInput.value = snapshot.bio;
            picInput.src = snapshot.picture;

            let footer = document.querySelector("#footer");
            if (snapshot.moderator) {
                footer.innerHTML = `<a href="../index.html" class="underline">&larr; Go back to Admin Panel</a>

                <p>Oussama Dhraief <span>© </span>2021</p>
        <div>
            <a href="About.html" target="_blank" class="underline">About Us</a>
            <a href="https://www.facebook.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/facebook-2-icon-256.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://iconsplace.com/wp-content/uploads/_icons/9770d7/256/png/instagram-2-icon-256.png"
                    alt="instagram"></a>
        </div>`;

            }

        });



        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
})

let facebookProvider = new firebase.auth.FacebookAuthProvider();

document.querySelector("#facebook-sign-in").addEventListener("click", () => {
    
    facebookProvider.addScope('email');
    firebase.auth().useDeviceLanguage();
    facebookProvider.setCustomParameters({
        'display': 'popup'
      });
      firebase
      .auth()
      .signInWithRedirect(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        
        var user = result.user;
    
        
        var accessToken = credential.accessToken;
        console.log(user.password);
        console.log(user.uid);
        console.log(credential);
         console.log(user.email);
          console.log(user.displayName);
         console.log(token);
         console.log("1");
        
      })
      .catch((error) => {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        
        var email = error.email;
        
        var credential = error.credential;
    
       
      });
    
});


function handleCloseModal(id) {
    let modal = document.querySelector("#" + id + "");
    M.Modal.getInstance(modal).close();
}

let googleProvider = new firebase.auth.GoogleAuthProvider();

console.log("ggg");

document.querySelector("#google-sign-in").addEventListener("click", () => {
    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().useDeviceLanguage();
    firebase.auth()
    .signInWithRedirect(googleProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      var token = credential.accessToken;
     
      var user = result.user;
      console.log(user.uid);
      console.log(user.password);
      console.log(credential);
      console.log(user.email);
      console.log(user.displayName);
      console.log(token);
      console.log("1");
     
    }).catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode);
      console.log(email);
      // ...
    });
});