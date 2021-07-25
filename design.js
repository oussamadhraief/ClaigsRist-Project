const mqmm1 = window.matchMedia("(max-width: 5700px)");

if (mqmm1.matches) {
    const leftMarg = document.querySelector("#left");
    const rightMarg = document.querySelector("#right");
    const navHeight = document.querySelector("#nav");

    let forstring = (navHeight.offsetHeight + 30).toString();

    leftMarg.style.marginTop = forstring.concat("px");
    rightMarg.style.marginTop = forstring.concat("px");
}