const mq = window.matchMedia("(max-width: 992px)");

if (mq.matches) {
    const mainNav = document.querySelector(".navright");
    const menuIcon = document.querySelector("#menu-icon");
    const search = document.querySelector(".search");
    mainNav.style.display = "none";

    menuIcon.addEventListener("click", function () {
        if (mainNav.style.display == "none") {
            mainNav.classList.add("animate__animated", "animate__fadeInDown");
            search.style.width = "90%";
            search.style.margin = "10px";
            search.style.marginTop = "0px";
            mainNav.style.display = "grid";
            menuIcon.src = "https://iconsplace.com/wp-content/uploads/_icons/ebebd7/256/png/close-window-icon-256.png";
            menuIcon.style.borderRadius = "50%";

        } else {
            mainNav.classList.remove("animate__animated", "animate__fadeInDown");
            mainNav.style.display = "none";
            search.style.marginTop = "10px";
            menuIcon.src = "Menu.png";

        }


    });
}

mq.addEventListener("change", (e) => {
    if (e.matches == false) {
        const mainNav = document.querySelector(".navright");
        mainNav.style.display = "flex";
        search.style.marginTop = "10%";

    } else {
        const mainNav = document.querySelector(".navright");
        mainNav.style.display = "none";
    }
});