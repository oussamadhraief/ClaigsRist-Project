const mq= window.matchMedia("(max-width: 992px)");

if (mq.matches){
    const mainNav = document.querySelector(".navright");
    const menuIcon = document.querySelector("#menu-icon");

    menuIcon.addEventListener("click", function(){
        if(mainNav.style.display != "grid"){
            mainNav.style.display = "grid";
        }else {
            mainNav.style.display ="None";
        }
    });
}