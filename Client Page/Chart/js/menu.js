const mq = window.matchMedia("(max-width: 992px)");

const mainNav = document.querySelector(".navright");
const menuIcon = document.querySelector("#menu-icon");
const search = document.querySelector(".search");

if (mq.matches) {

    mainNav.style.display = "none";

    menuIcon.addEventListener("click", function () {
        if (mainNav.style.display == "none") {
            mainNav.classList.add("animate__animated", "animate__slideInRight");
            search.style.width = "90%";
            search.style.margin = "10px";
            search.style.marginTop = "0px";
            mainNav.style.display = "grid";
            menuIcon.src = "close-icon.png";
            menuIcon.style.borderRadius = "50%";
            // document.querySelector("#top-anchor-navright").setAttribute("style",`margin-top: ${document.querySelector("#nav").offsetHeight -3}px !important`);
            mainNav.style.marginTop = document.querySelector("#nav").offsetHeight-5 +"px";
            document.querySelector("#top-anchor-navright").classList.add("menu-icon-clicked");
            

        } else {
            mainNav.classList.remove("animate__animated", "animate__slideInRight");
            mainNav.style.display = "none";
            search.style.marginTop = "10px";
            menuIcon.src = "menu-icon.png";
            document.querySelector("#top-anchor-navright").classList.remove("menu-icon-clicked");
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