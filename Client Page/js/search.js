let i = 0;
let placeholder = "";
const txt = "What are you looking for?";
const txt1 = "ClaigsRist"
const speed = 120;

function type() {
    placeholder += txt.charAt(i);
    document.querySelector("#webname").innerHTML += txt1.charAt(i);
    document.querySelector(".searchTerm").setAttribute("placeholder", placeholder);
    i++;
    setTimeout(type, speed);
}

type();