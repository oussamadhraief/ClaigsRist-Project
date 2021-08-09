const imgInput = document.querySelector("#profilepic");

imgInput.addEventListener("change", function (e) {
    const reader = new FileReader();
    let img = document.querySelector("#user-pic");
    let butt = document.querySelector("#save-picture");
    reader.onload = function () {
        img.src = reader.result;
        butt.classList.add("disabled");
        butt.setAttribute("href", "#");
    }
    reader.readAsDataURL(imgInput.files[0]);
}, false);


function handleRemoveButton() {
    let img = document.querySelector("#user-pic");

    img.src = "https://i2.wp.com/proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png";

    let butt = document.querySelector("#save-picture");
    butt.classList.add("disabled");
    butt.setAttribute("href", "#");
}

function handleSavePicture() {
    let img = document.querySelector("#user-pic");
    auth.onAuthStateChanged(user => {
        database.ref("Users/" + user.uid).update({
            picture: img.src
        });
    });
    let butt = document.querySelector("#save-picture");
    butt.classList.remove("disabled");
    butt.removeAttribute("href");
}


function handleEditButton(id) {
    let element = document.querySelector("#" + id + "");

    for (let i = 0; i < element.children.length; i++) {

        if (element.children[i].style.display == "none") {
            element.children[i].style.display = "grid";

        } else {
            element.children[i].style.display = "none";

        }
    }
}

function saveButtonAppearance(id) {
    let element = document.querySelector("#" + id + "");

    for (let i = 0; i < element.children.length; i++) {

        if (element.children[i].style.display == "none") {
            element.children[i].style.display = "grid";

        } else {
            element.children[i].style.display = "none";

        }
    }
}

function handleSaveEmail() {
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-email").value;
            user.updateEmail(inp);
        }
    });
}

function handleSavePassword() {
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-password").value;
            user.updatePassword(inp);
            console.log(user.password);
            console.log(user.uid);
            database.ref("Users/" + user.uid).once("value", (snapshot) => {
                console.log(snapshot.authMethods);
                if(!snapshot.authMethods.includes("email")){
                    console.log("doesnt include email");
                    console.log(user.password);
                database.ref("Users/"+ user.uid).update({authMethods: `${snapshot.authMethods} email`});
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
            <div id="PS">
            <img src="attention.png" alt="attention-icon" width="30px" height="30px">
            <p id="attention"> IMPORTANT : logging in with google / facebook only makes signing up and signing in easier and creates a ClaigsRist account that is completely detached 
            from your google/facebook account. 
            Changing your email or password or any other type of information (photo, bio ... ) below will only affect your ClaigsRist account
            and will not change your login information or any other type of information in your google/facebook account. </p>
            </div>
        </div>
                `;
                }
            });
        }
    });
}

function handleSaveBio() {
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-bio").value;
            database.ref("Users/" + user.uid).update({
                bio: inp
            });
        }
    });
}

document.querySelector("#save-email").addEventListener("click", () => {
    handleSaveEmail();
});

document.querySelector("#save-password").addEventListener("click", () => {
    handleSavePassword();
});

document.querySelector("#save-bio").addEventListener("click", () => {
    handleSaveBio();
});


function handleCancelButton(id) {
    let canceled = document.querySelector("#" + id);

    for (let i = 0; i < canceled.children.length; i++) {

        if (canceled.children[i].style.display == "none") {
            canceled.children[i].style.display = "grid";

        } else {
            canceled.children[i].style.display = "none";

        }
    }
    auth.onAuthStateChanged(user => {
        if (user) {
            if (id == "account-email") {
                let emailInput = document.querySelector("#acc-email");


                emailInput.value = user.email;
            } else if (id == "account-password") {
                let emailInput = document.querySelector("#acc-email");


                emailInput.value = user.password;
            } else {
                database.ref("Users/" + user.uid).on("value", (snapshot) => {

                    let bioInput = document.querySelector("#acc-bio");


                    snapshot = snapshot.val();


                    bioInput.value = snapshot.bio;

                });
            }
        }
    });

}