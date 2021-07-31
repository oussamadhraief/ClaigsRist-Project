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
                database.ref("Users/"+ user.uid).on("value", (snapshot) => {

                    let bioInput = document.querySelector("#acc-bio");


                    snapshot = snapshot.val();


                    bioInput.value = snapshot.bio;

                });
            }
        }
    });

}