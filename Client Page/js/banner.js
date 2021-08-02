const mq1 = window.matchMedia("(max-width: 570px)");
const banner = document.querySelector(".banner");
const header = document.querySelector("#nav");

let randomize = Math.floor((Math.random() * 2) + 1);

if (mq1.matches == false) {
    if (randomize == 1) {
        banner.innerHTML = `<video id="banner" width="100%" height="auto" loop muted autoplay>
    <source src="video.webm" type="video/WEBM">
    <source src="video.mp4" type="video/mp4">
    </video>`;


        const sectionOneOptions = {
            rootMargin: "100px 0px 0px 0px"
        };

        const sectionOneObserver = new IntersectionObserver(function (
                entries,
                sectionOneObserver
            ) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        header.classList.remove("nav-scrolled");
                    } else {
                        header.classList.add("nav-scrolled");
                    }
                });
            },
            sectionOneOptions);

        sectionOneObserver.observe(sectionOne);


    } else {

        banner.innerHTML = ` 
    <div id="slider">
    
		<figure id="figure">
            
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg" class="animate__animated animate__fadeIn">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
            
		</figure>
        
	</div>`;

        let navHeight = document.querySelector("#nav");

        header.classList.add("nav-scrolled");
        header.style.border = "none";
        header.style.boxShadow = "1px 1px 5px black";

        document.querySelector("figure").style.marginTop = navHeight.offsetHeight.toString() + "px";

    }
} else {
    banner.innerHTML = ` 
    <div id="slider">
    
		<figure id="figure" class="animation1">
            
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg" class="animate__animated animate__fadeIn">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
			<img src="https://www.ubp.com/files/live/sites/ubp/files/image/banner_newsroom/200124_Vignette_Web_Detail.jpg">
            
		</figure>
	</div>`;

        let navHeight = document.querySelector("#nav");


        header.classList.add("nav-scrolled");
        header.style.border = "none";
        header.style.boxShadow = "1px 1px 5px black";
        header.classList.add("nav-scrolled");
        document.querySelector("figure").style.marginTop = navHeight.offsetHeight.toString() + "px";
}