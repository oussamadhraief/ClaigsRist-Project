const auth = firebase.auth();

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const googleConnect = document.querySelector("#google-connect");
const googleConnectState = document.querySelector("#google-connection-state");

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

                if (snapshot.authMethods.includes("google")){
                    googleConnect.innerText = "Disconnect";
                    googleConnectState.innerHTML = `&#10004; Your account is connected to Google.`;
                }else{
                    googleConnect.innerText = "Connect";
                    googleConnectState.innerText = "Your account is not connected to Google." ;
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
                    let passwordInput = document.querySelector("#acc-password");
                    passwordInput.value = user.password;
                }
                let emailInput = document.querySelector("#acc-email");

                let bioInput = document.querySelector("#acc-bio");
                let picInput = document.querySelector("#user-pic");



                emailInput.value = user.email;

                bioInput.value = snapshot.bio;
                picInput.src = snapshot.picture;

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

        });



        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
})




const handleGoogleAuth = () => {
    firebase.auth().useDeviceLanguage();
    firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */

            var user = result.user;


            database.ref("Users/" + user.uid).on("value", (snapshot) => {
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

            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

           
        });
}


let googleProvider = new firebase.auth.GoogleAuthProvider();

document.querySelector("#google-sign-in").addEventListener("click", () => {
    handleGoogleAuth();
});

document.querySelector("#google-connect").addEventListener("click", () => {
    if(googleConnect.innerText == "Connect"){

    auth.currentUser.linkWithPopup(googleProvider).then((result) => {
        
        
        document.getElementById('id_confrmdiv').style.display="block";
        
        document.getElementById('id_truebtn').onclick = function(){
            
           database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
               snapshot = snapshot.val();
               
                let tempObj1 =  {
                    picture: result.user.providerData[0].photoURL,
                    bio: snapshot.bio,
                    moderator: snapshot.moderator,
                    authMethods: `${snapshot.authMethods} google`,
                    chartProducts: snapshot.chartProducts,
                }
                database.ref("Users/" + result.user.uid).set(tempObj1);
           });
           document.getElementById('id_confrmdiv').style.display="none";
        };
        
        document.getElementById('id_falsebtn').onclick = function(){
            database.ref("Users/" + result.user.uid).once("value", (snapshot) => {
                snapshot = snapshot.val();
                
                 let tempObj1 =  {
                     picture: snapshot.picture,
                     bio: snapshot.bio,
                     moderator: snapshot.moderator,
                     authMethods: `${snapshot.authMethods} google`,
                     chartProducts: snapshot.chartProducts,
                 }
                 database.ref("Users/" + result.user.uid).set(tempObj1);
            });

            document.getElementById('id_confrmdiv').style.display="none";
        };
        
            googleConnect.innerText = "Disconnect";
            googleConnectState.innerHTML = "&#10004; Your account is connected to Google.";
    
  }).catch((error) => {
    console.log(error);
  });
}else{
    auth.onAuthStateChanged(user => {
        
        user.unlink(user.providerData[0].providerId).then(() => {
            database.ref("Users/" + user.uid).once("value", (snapshot) => {
                snapshot = snapshot.val();
                 let tempObj1 =  {
                     picture: snapshot.picture,
                     bio: snapshot.bio,
                     moderator: snapshot.moderator,
                     authMethods: snapshot.authMethods.replace("google",""),
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

function handleCloseModal(id) {
    let modal = document.querySelector("#" + id + "");
    M.Modal.getInstance(modal).close();
}









//THIS IS FACEBOOK AUTHENTIFICATION AND IT IS FREAKING DISABLED


// let facebookProvider = new firebase.auth.FacebookAuthProvider();

// document.querySelector("#facebook-sign-in").addEventListener("click", () => {

//     handleFacebookAuth();

// });


// const handleFacebookAuth = () => {
//     facebookProvider.addScope('email');
//     firebase.auth().useDeviceLanguage();

//       firebase
//       .auth()
//       .signInWithPopup(facebookProvider)
//       .then((result) => {
//         let credential = result.credential;


//         let user = result.user;


//         database.ref("Users/" + user.uid).on("value", (snapshot) => {
//             snapshot = snapshot.val();
//           if(snapshot == null){
//               let tempObj = {
//                   picture: "https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png",
//                   bio: "",
//                   moderator: false,
//                   authMethods: "facebook",
//               }
//               
//               database.ref("Users/" + user.uid).set(tempObj);
//               
//           }
//           
//           if (!snapshot.authMethods.includes("email")){
//               document.querySelector("#modal-account").innerHTML = `
//               <h4>My account</h4><br>
//               <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
//               <div id="account-form">
//                   <div id="profile-pic">
//                       <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
//                           id="user-pic" alt="profile picture">
//                       <div id="picture-edit">
//                           <label for="profilepic">Edit your profile picture</label>
//                           <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
//                           <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
//                           <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
//                       </div>
//                   </div>



//                   <div id="account-email" class="input-field">
//                       <p class="temp" style="display: grid;">Edit your email.</p>

//                       <a href="#" class="editanchor" style="display: grid;"
//                           onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
//                               alt="edit"></a>

//                       <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
//                           required>

//                       <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
//                           class="save-info">Save</button>

//                       <a href="#" style="display: none;" class="cancel-button"
//                           onClick="handleCancelButton('account-email')">cancel</a>

//                   </div>



//                   <div id="account-password" class="input-field">
//                      <input type="password" name="password" id="acc-password" placeholder="Add a password to your ClaigsRist account" class="edit-email">
//                      <button  id="save-password" class="save-info">Save</button>
//                   </div>



//                   <div id="account-bio" class="input-field">
//                       <p class="temp" style="display: grid;">Edit your bio.</p>

//                       <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
//                               class="editicon" src="edit-form.png" alt="edit"></a>

//                       <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>

//                       <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
//                           class="save-info">Save</button>

//                       <a href="#" style="display: none;" class="cancel-button"
//                           onClick="handleCancelButton('account-bio')">cancel</a>
//                   </div>
//                   <div id="PS">
//                   <img src="attention.png" alt="attention-icon" width="30px" height="30px">
//                   <p id="attention"> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
//                   from your google/facebook account. 
//                   Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
//                   and will not change your login information or any other type of information in your google/facebook account. </p>
//                   </div>
//               </div>
//               `;
//           }else {
//               document.querySelector("#modal-account").innerHTML = `
//               <h4>My account</h4><br>
//               <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
//               <div id="account-form">
//                   <div id="profile-pic">
//                       <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
//                           id="user-pic" alt="profile picture">
//                       <div id="picture-edit">
//                           <label for="profilepic">Edit your profile picture</label>
//                           <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
//                           <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
//                           <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
//                       </div>
//                   </div>



//                   <div id="account-email" class="input-field">
//                       <p class="temp" style="display: grid;">Edit your email.</p>

//                       <a href="#" class="editanchor" style="display: grid;"
//                           onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
//                               alt="edit"></a>

//                       <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
//                           required>

//                       <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
//                           class="save-info">Save</button>

//                       <a href="#" style="display: none;" class="cancel-button"
//                           onClick="handleCancelButton('account-email')">cancel</a>

//                   </div>



//                   <div id="account-password" class="input-field">
//                       <p class="temp" style="display: grid;">Edit your password.</p>

//                       <a href="#" class="editanchor" style="display: grid;"
//                           onClick="handleEditButton('account-password')"><img class="editicon" src="edit-form.png"
//                               alt="edit"></a>

//                       <input style="display: none;" id="acc-password" type="password" class="edit-email"
//                           name="edit-password" required>

//                       <button onClick="saveButtonAppearance('account-password')" id="save-password" style="display: none;"
//                           class="save-info">Save</button>

//                       <a href="#" style="display: none;" class="cancel-button"
//                           onClick="handleCancelButton('account-password')">cancel</a>
//                   </div>



//                   <div id="account-bio" class="input-field">
//                       <p class="temp" style="display: grid;">Edit your bio.</p>

//                       <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
//                               class="editicon" src="edit-form.png" alt="edit"></a>

//                       <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>

//                       <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
//                           class="save-info">Save</button>

//                       <a href="#" style="display: none;" class="cancel-button"
//                           onClick="handleCancelButton('account-bio')">cancel</a>
//                   </div>
//                   <div id="PS">
//                   <img src="attention.png" alt="attention-icon" width="30px" height="30px">
//                   <p id="attention"> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
//                   from your google/facebook account. 
//                   Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
//                   and will not change your login information or any other type of information in your google/facebook account. </p>
//                   </div>

//               </div>
//               `;
//           }
//         });
//        handleCloseModal("modal-login");

//       })
//       .catch((error) => {

//         var errorCode = error.code;
//         var errorMessage = error.message;

//         var email = error.email;
//         
//         var credential = error.credential;


//       });
// }