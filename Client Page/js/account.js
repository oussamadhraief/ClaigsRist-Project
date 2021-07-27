const imgInput = document.querySelector("#profilepic");

imgInput.addEventListener("change", function (e) {
    const reader = new FileReader();
    const img = document.querySelector("#user-pic");
    reader.onload = function () {
        img.src = reader.result;
    }
    reader.readAsDataURL(imgInput.files[0]);
}, false);


function handleEditButton(id){
    let element = document.querySelector("#"+id+"");
    
    for(let i =0; i < element.children.length; i++){
        console.log(element.children[i].style.width);
        if(element.children[i].style.display == "none" ){
            element.children[i].style.display = "grid";
            
        }else {
            element.children[i].style.display = "none";
            
        }
    }
}

function handleSaveButton(id){
    let element = document.querySelector("#"+id+"");
    
    for(let i =0; i < element.children.length; i++){
        console.log(element.children[i].style.width);
        if(element.children[i].style.display == "none" ){
            element.children[i].style.display = "grid";
            
        }else {
            element.children[i].style.display = "none";
            
        }
    }
}