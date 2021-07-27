const mq1 = window.matchMedia("(max-width: 570px)");

if (mq1.matches) {
    const bannerMarg = document.querySelector("#banner");
    const navHeight = document.querySelector("#nav");
    let forstring = navHeight.offsetHeight.toString();

    bannerMarg.style.marginTop = forstring.concat("px");
}