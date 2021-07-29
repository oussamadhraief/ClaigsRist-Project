const mq = window.matchMedia("(max-width: 992px)");

if (mq.matches) {
    const mainNav = document.querySelector(".navright");
    const menuIcon = document.querySelector("#menu-icon");
    mainNav.style.display = "none";
    
    menuIcon.addEventListener("click", function () {
        if (mainNav.style.display == "none") {
            mainNav.style.display = "grid";
        } else {
            mainNav.style.display = "none";
        }

        
    });
}

mq.addEventListener("change", (e) => {
    if (e.matches == false) {
        const mainNav = document.querySelector(".navright");
        mainNav.style.display = "flex";

    } else {
        const mainNav = document.querySelector(".navright");
        mainNav.style.display = "none";
    }
});