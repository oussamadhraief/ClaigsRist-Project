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

                if (!snapshot.authMethods.includes("email")){
                    document.querySelector("#modal-account").innerHTML = `
                    <h4>My account</h4><br>
                    <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
                    <div id="account-form">
                        <div id="profile-pic">
                            <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
                                id="user-pic" alt="profile picture">
                            <div id="picture-edit">
                                <label for="profilepic">Edit your profile picture</label>
                                <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
                                <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
                                <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
                            </div>
                        </div>
        
        
        
                        <div id="account-email" class="input-field">
                            <p class="temp" style="display: grid;">Edit your email.</p>
        
                            <a href="#" class="editanchor" style="display: grid;"
                                onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
                                    alt="edit"></a>
        
                            <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
                                required>
        
                            <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
                                class="save-info">Save</button>
        
                            <a href="#" style="display: none;" class="cancel-button"
                                onClick="handleCancelButton('account-email')">cancel</a>
        
                        </div>
        
        
        
                        <div id="account-password" class="input-field">
                            <label for="acc-password" id="add-password-label">Add a password to your ClaigsRist account</label>
                           <input type="password" name="password" id="#acc-password" placeholder="Choose password" class="edit-email">
                           <button  id="save-password" class="save-info">Save</button>
                        </div>
        
        
        
                        <div id="account-bio" class="input-field">x
                            <p class="temp" style="display: grid;">Edit your bio.</p>
        
                            <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
                                    class="editicon" src="edit-form.png" alt="edit"></a>
        
                            <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>
        
                            <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
                                class="save-info">Save</button>
        
                            <a href="#" style="display: none;" class="cancel-button"
                                onClick="handleCancelButton('account-bio')">cancel</a>
                        </div>
                        <p> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
                        from your google/facebook account. 
                        Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
                        and will not change your login information or any other type of information in your google/facebook account. </p>
        
                    </div>
                    `;
                }else {
                    document.querySelector("#modal-account").innerHTML = `
                    <h4>My account</h4><br>
                    <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
                    <div id="account-form">
                        <div id="profile-pic">
                            <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
                                id="user-pic" alt="profile picture">
                            <div id="picture-edit">
                                <label for="profilepic">Edit your profile picture</label>
                                <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
                                <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
                                <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
                            </div>
                        </div>
        
        
        
                        <div id="account-email" class="input-field">
                            <p class="temp" style="display: grid;">Edit your email.</p>
        
                            <a href="#" class="editanchor" style="display: grid;"
                                onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
                                    alt="edit"></a>
        
                            <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
                                required>
        
                            <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
                                class="save-info">Save</button>
        
                            <a href="#" style="display: none;" class="cancel-button"
                                onClick="handleCancelButton('account-email')">cancel</a>
        
                        </div>
        
        
        
                        <div id="account-password" class="input-field">
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
                        </div>
        
        
        
                        <div id="account-bio" class="input-field">
                            <p class="temp" style="display: grid;">Edit your bio.</p>
        
                            <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
                                    class="editicon" src="edit-form.png" alt="edit"></a>
        
                            <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>
        
                            <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
                                class="save-info">Save</button>
        
                            <a href="#" style="display: none;" class="cancel-button"
                                onClick="handleCancelButton('account-bio')">cancel</a>
                        </div>
                        <p> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
                        from your google/facebook account. 
                        Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
                        and will not change your login information or any other type of information in your google/facebook account. </p>   
                    </div>
                    `;
                }

            let footer = document.querySelector("#footer");

            if (snapshot.moderator == true) {
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
            moderator: false,
            authMethods: "email",
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
            if (snapshot.moderator == true) {
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
      .signInWithPopup(facebookProvider)
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

console.log("gg");

document.querySelector("#google-sign-in").addEventListener("click", () => {
    firebase.auth().useDeviceLanguage();
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
     
      var user = result.user;
      console.log(user.uid);
       
      database.ref("Users/" + user.uid).once("value", (snapshot) => {
          console.log("this is inside the ref");
        if(!snapshot.authMethods.exists()){
            let tempObj = {
                picture: "https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png",
                bio: "",
                moderator: false,
                authMethods: "google",
            }
            console.log("this is when the user is new");
            ref("Users/" + user.uid).set(tempObj);
        }
        if (!snapshot.authMethods.includes("email")){
            document.querySelector("#modal-account").innerHTML = `
            <h4>My account</h4><br>
            <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
            <div id="account-form">
                <div id="profile-pic">
                    <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
                        id="user-pic" alt="profile picture">
                    <div id="picture-edit">
                        <label for="profilepic">Edit your profile picture</label>
                        <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
                        <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
                        <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
                    </div>
                </div>



                <div id="account-email" class="input-field">
                    <p class="temp" style="display: grid;">Edit your email.</p>

                    <a href="#" class="editanchor" style="display: grid;"
                        onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
                            alt="edit"></a>

                    <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
                        required>

                    <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-email')">cancel</a>

                </div>



                <div id="account-password" class="input-field">
                    <label for="acc-password" id="add-password-label">Add a password to your ClaigsRist account</label>
                   <input type="password" name="password" id="#acc-password" placeholder="Choose password" class="edit-email">
                   <button  id="save-password" class="save-info">Save</button>
                </div>



                <div id="account-bio" class="input-field">
                    <p class="temp" style="display: grid;">Edit your bio.</p>

                    <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
                            class="editicon" src="edit-form.png" alt="edit"></a>

                    <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>

                    <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-bio')">cancel</a>
                </div>
                <p> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
                from your google/facebook account. 
                Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
                and will not change your login information or any other type of information in your google/facebook account. </p>

            </div>
            `;
        }else {
            document.querySelector("#modal-account").innerHTML = `
            <h4>My account</h4><br>
            <a class="close-modal" onClick="handleCloseModal('modal-account')" href="#">x</a>
            <div id="account-form">
                <div id="profile-pic">
                    <img src="https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
                        id="user-pic" alt="profile picture">
                    <div id="picture-edit">
                        <label for="profilepic">Edit your profile picture</label>
                        <input type="file" id="profilepic" accept="image/png, image/gif, image/jpeg">
                        <a href="#" onClick="handleRemoveButton()" id="remove-picture">Remove picture</a>
                        <a id="save-picture" onClick="handleSavePicture()" disabled>Save</a>
                    </div>
                </div>



                <div id="account-email" class="input-field">
                    <p class="temp" style="display: grid;">Edit your email.</p>

                    <a href="#" class="editanchor" style="display: grid;"
                        onClick="handleEditButton('account-email')"><img class="editicon" src="edit-form.png"
                            alt="edit"></a>

                    <input style="display: none;" id="acc-email" type="text" class="edit-email" name="edit-email"
                        required>

                    <button onClick="saveButtonAppearance('account-email')" id="save-email" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-email')">cancel</a>

                </div>



                <div id="account-password" class="input-field">
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
                </div>



                <div id="account-bio" class="input-field">
                    <p class="temp" style="display: grid;">Edit your bio.</p>

                    <a href="#" class="editanchor" style="display: grid;" onClick="handleEditButton('account-bio')"><img
                            class="editicon" src="edit-form.png" alt="edit"></a>

                    <input style="display: none;" id="acc-bio" type="text" class="edit-email" name="edit-bio" required>

                    <button onClick="saveButtonAppearance('account-bio')" id="save-bio" style="display: none;"
                        class="save-info">Save</button>

                    <a href="#" style="display: none;" class="cancel-button"
                        onClick="handleCancelButton('account-bio')">cancel</a>
                </div>
                <p> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
                from your google/facebook account. 
                Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
                and will not change your login information or any other type of information in your google/facebook account. </p>

            </div>
            `;
        }
      });
     
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