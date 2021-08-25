const auth = firebase.auth();

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const googleConnect = document.querySelector("#google-connect");
const googleConnectState = document.querySelector("#google-connection-state");

const facebookConnect = document.querySelector("#facebook-connect");
const facebookConnectState = document.querySelector("#facebook-connection-state");

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

        database.ref("Users/" + user.uid).on("value", (snapshot) => {
            snapshot = snapshot.val();
            if (snapshot !== null) {

                if (snapshot.authMethods.includes("google")) {
                    googleConnect.innerText = "Disconnect";
                    googleConnectState.innerHTML = `&#10004; Your account is connected to Google.`;
                } else {
                    googleConnect.innerText = "Connect";
                    googleConnectState.innerText = "Your account is not connected to Google.";
                }

                if (snapshot.authMethods.includes("facebook")) {
                    facebookConnect.innerText = "Disconnect";
                    facebookConnectState.innerHTML = `&#10004; Your account is connected to Facebook.`;
                } else {
                    facebookConnect.innerText = "Connect";
                    facebookConnectState.innerText = "Your account is not connected to Facebook.";
                }

                if (!snapshot.authMethods.includes("email")) {
                    document.querySelector("#account-password").innerHTML = `
                  
                           <input type="password" name="password" id="acc-password" placeholder="Add a password to your ClaigsRist account" class="edit-email">
                           <button  id="save-password" class="save-info">Save</button>
                     
                    `;
                    document.querySelector("#save-password").addEventListener("click", () => {
                        handleSavePassword();

                    });

                    document.querySelector("#google-connect").disabled = true;
                    document.querySelector("#facebook-connect").disabled = true;

                } else {
                    document.querySelector("#google-connect").disabled = false;
                    document.querySelector("#facebook-connect").disabled = false;
                    document.querySelector("#account-password").innerHTML = `
        
        
        
                            <p class="temp" style="display: grid;">Edit your password.</p>
        
                            <a href="#" class="editanchor" style="display: grid;"
                                onClick="handleEditButton('account-password')"><img class="editicon" src="edit-form.png"
                                    alt="edit"></a>
        
                            <input style="display: none;" id="acc-password" type="password" class="edit-email"
                                name="edit-password" required>
        
                            <button onClick="saveButtonAppearance('account-password')" id="save-password" style="display: none;"
                                class="save-info">Save</button>
        
                            <a href="#" style="display: none;" class="cancel-button"
                                onClick="handleCancelButton('account-password')">cancel</a>
                     
        
        
        
                    `;
                    let passwordInput = document.querySelector("#acc-password");
                    passwordInput.value = user.password;
                }
                let emailInput = document.querySelector("#acc-email");

                let bioInput = document.querySelector("#acc-bio");
                let picInput = document.querySelector("#user-pic");



                emailInput.value = user.email;

                bioInput.value = snapshot.bio;
                picInput.src = snapshot.picture;

                let footer = document.querySelector("#footer");

                if (snapshot.moderator == true) {
                    footer.innerHTML = `<a href="../index.html" class="underline">&larr; Go back to Admin Panel</a>

                <p>Oussama Dhraief <span>© </span>2021</p>
            <div>
            <a href="About.html" target="_blank" class="underline">About Us</a>
            <a href="https://www.facebook.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://cdn.icon-icons.com/icons2/901/PNG/512/facebook_icon-icons.com_69263.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721672-instagram_108066.png"
                    alt="instagram"></a>
        </div>`;

                }
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
            moderator: false,
            authMethods: "email",
            chartProducts: "",
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
                    src="https://cdn.icon-icons.com/icons2/901/PNG/512/facebook_icon-icons.com_69263.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721672-instagram_108066.png"
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
            if (snapshot.moderator == true) {
                footer.innerHTML = `<a href="../index.html" class="underline">&larr; Go back to Admin Panel</a>

                <p>Oussama Dhraief <span>© </span>2021</p>
        <div>
            <a href="About.html" target="_blank" class="underline">About Us</a>
            <a href="https://www.facebook.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://cdn.icon-icons.com/icons2/901/PNG/512/facebook_icon-icons.com_69263.png"
                    alt="facebook"></a>
            <a href="https://www.instagram.com/oussema.dhraief/" target="_blank" class="nomarg"><img class="icon"
                    src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721672-instagram_108066.png"
                    alt="instagram"></a>
        </div>`;

            }

        });



        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
})




const handleGoogleAuth = () => {
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */

            var user = result.user;


            database.ref("Users/" + user.uid).get().then((snapshot) => {
                snapshot = snapshot.val();
                if (snapshot == null) {
                    let tempObj = {
                        picture: user.photoURL,
                        bio: "",
                        moderator: false,
                        authMethods: "google",
                        chartProducts: "",
                    }

                    database.ref("Users/" + user.uid).set(tempObj);
                } else if (!snapshot.authMethods.includes("google")){
                    let anchorElement = document.createElement("a");
                    anchorElement.setAttribute("class", "modal-trigger");
                    anchorElement.style.display = "none";
                    anchorElement.setAttribute("data-target", "modal-confirm");
                    document.body.appendChild(anchorElement);
                    anchorElement.click();
                    document.querySelector("#first-h6").innerHTML = "A ClaigsRist account with this email already exists.";
                    document.querySelector("#second-h6").innerHTML = "Would you like to link it to your Google Account ? (if you press no, you will be logged out)";

                    const modalConfirm = document.querySelector("#modal-confirm");

                    database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                        snapshot = snapshot.val();

                        let tempObj1 = {
                            picture: snapshot.picture,
                            bio: snapshot.bio,
                            moderator: snapshot.moderator,
                            authMethods: `${snapshot.authMethods} google`,
                            chartProducts: snapshot.chartProducts,
                        }
                        database.ref("Users/" + result.user.uid).set(tempObj1);
                    });

                    document.getElementById('yes-option').onclick = function () {
                        M.Modal.getInstance(modalConfirm).close();
                    }

                    document.getElementById('no-option').onclick = function () {
                        auth.onAuthStateChanged(user => {

                            user.unlink("google.com").then(() => {
                                database.ref("Users/" + user.uid).once("value", (snapshot) => {
                                    snapshot = snapshot.val();
                                    database.ref("Users/" + user.uid).update({authMethods: snapshot.authMethods.replace("google", "")});
                                });

                            }).catch((error) => {

                            });
                        });
                        logout.click();
                        M.Modal.getInstance(modalConfirm).close();
                    }
                }

                if (!snapshot.authMethods.includes("email")) {

                    document.querySelector("#account-password").innerHTML = `
            
                   <input type="password" name="password" id="acc-password" placeholder="Add a password to your ClaigsRist account" class="edit-email">
                   <button  id="save-password" class="save-info">Save</button>
               
            `;
                    document.querySelector("#google-connect").disabled = true;
                } else {
                    document.querySelector("#google-connect").disabled = false;
                    document.querySelector("#account-password").innerHTML = `
           
                    <p class="temp" style="display: grid;">Edit your password.</p>

                    <a href="#" class="editanchor" style="display: grid;"
                        onClick="handleEditButton('account-password')"><img class="editicon" src="edit-form.png"
                            alt="edit"></a>

                    <input style="display: none;" id="acc-password" type="password" class="edit-email"
                        name="edit-password" required>

                    <button onClick="saveButtonAppearance('account-password')" id="save-password" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-password')">cancel</a>

            `;
                }
            });
            handleCloseModal("modal-login");
        }).catch((error) => {

        });
}


let googleProvider = new firebase.auth.GoogleAuthProvider();

document.querySelector("#google-sign-in").addEventListener("click", () => {
    handleGoogleAuth();
});

document.querySelector("#google-connect").addEventListener("click", () => {
    if (googleConnect.innerText == "Connect") {

        auth.currentUser.linkWithPopup(googleProvider).then((result) => {

            document.getElementById('first-p').innerHTML = `Would you like to import your photo and display name from your Google account to your ClaigsRist account?`;
            document.getElementById('second-p').innerHTML = `(if you press no, your ClaigsRist photo and display name will not change)`;

            document.getElementById('id_confrmdiv').style.display = "block";

            document.getElementById('id_truebtn').onclick = function () {

                database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val();
                    let photo = result.user.providerData.find((item) => {
                        return item.providerId.includes("google");
                    });

                    let tempObj1 = {
                        picture: photo.photoURL,
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: `${snapshot.authMethods} google`,
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + result.user.uid).set(tempObj1);
                });
                document.getElementById('id_confrmdiv').style.display = "none";
            };

            document.getElementById('id_falsebtn').onclick = function () {
                database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val();

                    let tempObj1 = {
                        picture: snapshot.picture,
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: `${snapshot.authMethods} google`,
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + result.user.uid).set(tempObj1);
                });

                document.getElementById('id_confrmdiv').style.display = "none";
            };

            googleConnect.innerText = "Disconnect";
            googleConnectState.innerHTML = "&#10004; Your account is connected to Google.";

        }).catch((error) => {
            console.log(error);
        });
    } else {
        auth.onAuthStateChanged(user => {



            user.unlink("google.com").then(() => {
                database.ref("Users/" + user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val();
                    let tempObj1 = {
                        picture: snapshot.picture,
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: snapshot.authMethods.replace("google", ""),
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + user.uid).set(tempObj1);
                });
                googleConnect.innerText = "Connect";
                googleConnectState.innerHTML = `Your account is not connected to Google.`;
            }).catch((error) => {

            });
        });

    }
});


///////////////////////////////////////////////////////

const handleFacebookAuth = () => {
    facebookProvider.addScope('email');
    firebase.auth().useDeviceLanguage();
    firebase.auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */

            var user = result.user;
            database.ref("Users/" + user.uid).on("value", (snapshot) => {
                snapshot = snapshot.val();
                if (snapshot == null) {
                    let tempObj = {
                        picture: user.photoURL + "/picture?height=500",
                        bio: "",
                        moderator: false,
                        authMethods: "facebook",
                        chartProducts: "",
                    }

                    database.ref("Users/" + user.uid).set(tempObj);

                }

                if (!snapshot.authMethods.includes("email")) {

                    document.querySelector("#account-password").innerHTML = `
            
                   <input type="password" name="password" id="acc-password" placeholder="Add a password to your ClaigsRist account" class="edit-email">
                   <button  id="save-password" class="save-info">Save</button>
               
            `;
                    document.querySelector("#facebook-connect").disabled = true;
                } else {
                    document.querySelector("#facebook-connect").disabled = false;
                    document.querySelector("#account-password").innerHTML = `
           
                    <p class="temp" style="display: grid;">Edit your password.</p>

                    <a href="#" class="editanchor" style="display: grid;"
                        onClick="handleEditButton('account-password')"><img class="editicon" src="edit-form.png"
                            alt="edit"></a>

                    <input style="display: none;" id="acc-password" type="password" class="edit-email"
                        name="edit-password" required>

                    <button onClick="saveButtonAppearance('account-password')" id="save-password" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-password')">cancel</a>

            `;
                }
            });
            handleCloseModal("modal-login");
        }).catch((err) => {

            if (err.code === 'auth/account-exists-with-different-credential') {
                handleCloseModal("modal-login");
                var pendingCred = err.credential;

                var email = err.email;

                auth.fetchSignInMethodsForEmail(email).then(methods => {

                    let methodElement = methods.find((item) => {
                        return item === 'password';
                    });

                    if (!(typeof methodElement === 'undefined')) {

                        let element = document.createElement("a");
                        element.style.display = "none";
                        element.setAttribute("class", "modal-trigger");
                        element.setAttribute("data-target", "modal-password");
                        document.body.appendChild(element);
                        document.querySelector("#modal-password div").innerHTML = `<input type="password" id="provided-password" placeholder="Enter your ClaigsRist account's password to link it to your Facebook account." required>`;
                        element.click();
                        document.querySelector("#link-accounts").onclick = () => {
                            let password = document.querySelector("#provided-password").value;

                            auth.signInWithEmailAndPassword(email, password).then(result => {

                                database.ref("Users/" + result.user.uid).get().then((snapshot) => {
                                    snapshot = snapshot.val();
                                    database.ref("Users/" + result.user.uid).update({
                                        authMethods: `${snapshot.authMethods} facebook`
                                    });
                                });
                                return result.user.linkWithCredential(pendingCred);
                            }).then(() => {
                                window.location.reload(true);
                            });
                        };

                    } else {

                        let tempProvider;

                        for (let i = 0; i < methods.length; i++) {
                            if (methods[i].includes("google")) {
                                tempProvider = new firebase.auth.GoogleAuthProvider();
                                break;
                            } else if (methods[i].includes("facebook")) {
                                tempProvider = new firebase.auth.FacebookAuthProvider();
                                break;
                            }
                        }




                        document.querySelector("#modal-password").innerHTML = ` 
                        <h6>There is an already existing account that's using this email. <br>
                        Please log in to your account to link your accounts.</h6>
                <div class="input-field">
                    
                </div>
                <button class="login-button z-depth-0" id="link-accounts">Continue</button>
                        `;

                        document.querySelector("#link-accounts").onclick = () => {

                            auth.signInWithPopup(tempProvider).then(result => {

                                database.ref("Users/" + result.user.uid).get().then((snapshot) => {
                                    snapshot = snapshot.val();
                                    database.ref("Users/" + result.user.uid).update({
                                        authMethods: `${snapshot.authMethods} facebook`
                                    });
                                });
                                result.user.linkWithCredential(pendingCred).then(usercred => {

                                    window.location.reload(true);
                                });
                            });
                        }
                    }
                });
            }
        });
}



let facebookProvider = new firebase.auth.FacebookAuthProvider();

document.querySelector("#facebook-sign-in").addEventListener("click", () => {
    handleFacebookAuth();
});

document.querySelector("#facebook-connect").addEventListener("click", () => {
    if (facebookConnect.innerText == "Connect") {

        auth.currentUser.linkWithPopup(facebookProvider).then((result) => {

            document.getElementById('id_confrmdiv').style.display = "block";

            document.getElementById('id_truebtn').onclick = function () {

                database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val();
                    let photo = result.user.providerData.find((item) => {
                        return item.providerId.includes("facebook");
                    });

                    let tempObj1 = {
                        picture: photo.photoURL + "/picture?height=500",
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: `${snapshot.authMethods} facebook`,
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + result.user.uid).set(tempObj1);
                });
                document.getElementById('id_confrmdiv').style.display = "none";
            };

            document.getElementById('id_falsebtn').onclick = function () {
                database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val();

                    let tempObj1 = {
                        picture: snapshot.picture,
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: `${snapshot.authMethods} facebook`,
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + result.user.uid).set(tempObj1);
                });

                document.getElementById('id_confrmdiv').style.display = "none";
            };

            facebookConnect.innerText = "Disconnect";
            facebookConnectState.innerHTML = "&#10004; Your account is connected to Facebook.";

        }).catch((error) => {
            console.log(error);
        });
    } else {
        auth.onAuthStateChanged(user => {


            user.unlink("facebook.com").then(() => {
                database.ref("Users/" + user.uid).once("value", (snapshot) => {
                    snapshot = snapshot.val()
                    let tempObj1 = {
                        picture: snapshot.picture,
                        bio: snapshot.bio,
                        moderator: snapshot.moderator,
                        authMethods: snapshot.authMethods.replace("facebook", ""),
                        chartProducts: snapshot.chartProducts,
                    }
                    database.ref("Users/" + user.uid).set(tempObj1)
                })
                facebookConnect.innerText = "Connect";
                facebookConnectState.innerHTML = `Your account is not connected to Facebook.`;
            }).catch((error) => {

            });
        });

    }
})

///////////////////////////////////////////////////////

function handleCloseModal(id) {
    let modal = document.querySelector("#" + id + "");
    M.Modal.getInstance(modal).close();
}