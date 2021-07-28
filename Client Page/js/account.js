const imgInput = document.querySelector("#profilepic");

imgInput.addEventListener("change", function (e) {
    const reader = new FileReader();
    const img = document.querySelector("#user-pic");
    reader.onload = function () {
        auth.onAuthStateChanged(user => {
        database.ref("Users/" + user.uid).update({picture: reader.result});
        img.src = reader.result;
        });
    }
    reader.readAsDataURL(imgInput.files[0]);
}, false);


function handleEditButton(id){
    let element = document.querySelector("#"+id+"");
    
    for(let i =0; i < element.children.length; i++){
        
        if(element.children[i].style.display == "none" ){
            element.children[i].style.display = "grid";
            
        }else {
            element.children[i].style.display = "none";
            
        }
    }
}

function saveButtonAppearance(id){
    let element = document.querySelector("#"+id+"");
    
    for(let i =0; i < element.children.length; i++){
        
        if(element.children[i].style.display == "none" ){
            element.children[i].style.display = "grid";
            
        }else {
            element.children[i].style.display = "none";
            
        }
    }
}

function handleSaveEmail(){
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-email").value;
            user.updateEmail(inp);
        }
});
}

function handleSavePassword(){
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-password").value;
            user.updatePassword(inp);
        }
});
}

function handleSaveBio(){
    auth.onAuthStateChanged(user => {
        if (user) {
            let inp = document.querySelector("#acc-bio").value;
            database.ref("Users/"+ user.uid).update({bio: inp});
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