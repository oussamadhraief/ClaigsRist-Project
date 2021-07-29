const mq1 = window.matchMedia("(max-width: 570px)");

if (mq1.matches) {
    const bannerMarg = document.querySelector("#banner");
    let navHeight = document.querySelector("#nav");

    console.log(navHeight.offsetHeight);

    bannerMarg.style.marginTop = navHeight.offsetHeight.toString() + "px";
    console.log(bannerMarg.style.marginTop);
}