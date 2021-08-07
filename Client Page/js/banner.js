const mq1 = window.matchMedia("(max-width: 570px)");
const banner = document.querySelector(".banner");
const header = document.querySelector("#nav");
const sectionOne = document.querySelector("#products");
const anchors = document.querySelectorAll("#nav a");
const searchTerm = document.querySelector(".searchTerm");
const webname = document.querySelector("#webname");
const searchBorder = document.querySelector(".search");
const searchIcon = document.querySelector("#search-icon");

let timeouts = [];

let anotherTimeouts = [];

let randomize = Math.floor((Math.random() * 2) + 1);

if (mq1.matches == false) {
    if (randomize == 1) {
        banner.innerHTML = `<video id="banner" width="100%" height="auto" loop muted autoplay>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/WEBM">
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
                        anchors.forEach(item => item.classList.add("nav-anchors-unscrolled"));
                        searchTerm.classList.add("nav-input-unscrolled");
                        webname.classList.remove("webname");
                        webname.classList.add("webname-unscrolled");
                        searchBorder.classList.add("search-unscrolled");
                        searchIcon.src = "search-unscrolled.png";
                    } else {
                        header.classList.add("nav-scrolled");
                        anchors.forEach(item => item.classList.remove("nav-anchors-unscrolled"));
                        searchTerm.classList.remove("nav-input-unscrolled");
                        webname.classList.add("webname");
                        webname.classList.remove("webname-unscrolled");
                        searchBorder.classList.remove("search-unscrolled");
                        searchIcon.src = "search.png";
                    }
                });
            },
            sectionOneOptions);

        sectionOneObserver.observe(sectionOne);

    } else {
        header.classList.add("nav-scrolled");
        header.style.border = "none";
        header.style.boxShadow = "1px 1px 5px black";
        banner.innerHTML = ` 
        <div id="slider">
            
            
			<img src="https://www.scoop.com.tn/modules/sphomeslider/images/c3e8e4b0ad02f2470a20317442c308b549d37633_Asus%20(1).jpg" class="animate__animated animate__fadeIn">
			<a href="#"  class="previous" onClick="nextIsSlider5()">&#8249;</a>
            <a href="#" class="next" onClick="nextIsSlider2()">&#8250;</a>
            <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
        
	</div>`;

        document.querySelector("#slider img").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
        globalThis.slidingPics = document.querySelector("#slider");
        slider2();

        function slider1() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
    
    
    
            
			<img src="https://www.scoop.com.tn/modules/sphomeslider/images/c3e8e4b0ad02f2470a20317442c308b549d37633_Asus%20(1).jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider5()">&#8249;</a>   
            <a href="#" class="next" onClick="nextIsSlider2()">&#8250;</a>
            <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>

        
	`;


                document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
                slider2();
            }, 3000));
        }



        function slider2() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
    
    
    
            
			<img src="https://www.scoop.com.tn/modules/sphomeslider/images/54868396aa7ca3b6f246c8e234291f6d49878f52_ps5.jpg" class="animate__animated animate__fadeIn">
            <a href="#" class="previous" onClick="nextIsSlider1()">&#8249;</a>	
    <a href="#" class="next" onClick="nextIsSlider3()">&#8250;</a>        
    <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
		
        
	`;

                document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";

                slider3();

            }, 3000));
        }

        function slider3() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="https://www.scoop.com.tn/modules/sphomeslider/images/6f86d90fe53f580927195abf48c386264cbe69f2_VivoBook-15-X571.jpg" class="animate__animated animate__fadeIn">
                
                <a href="#" class="next" onClick="nextIsSlider4()">&#8250;</a>        
                <a href="#" class="previous" onClick="nextIsSlider2()">&#8249;</a>
                <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
        `;

                document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";

                slider4();
            }, 3000));

        }

        function slider4() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="https://www.scoop.com.tn/modules/sphomeslider/images/26ae80b9cdad9996e1c8625abd021c70ef843804_ThinkPad-e15%20(1).jpg" class="animate__animated animate__fadeIn">
                
                <a href="#" class="previous" onClick="nextIsSlider3()">&#8249;</a>
                <a href="#" class="next" onClick="nextIsSlider5()">&#8250;</a>
                <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
       `;

                document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";

                slider5();
            }, 3000));

        }

        function slider5() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="https://www.scoop.com.tn/modules/sphomeslider/images/56e32bb5499750aaf76651ffe6c0bb6b571f5571_Nintendo-switch.jpg" class="animate__animated animate__fadeIn">
                
                <a href="#"  class="previous" onClick="nextIsSlider4()">&#8249;</a>
                <a href="#" class="next" onClick="nextIsSlider1()">&#8250;</a>
                <div id="skip-slides">
                <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
                <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
            </div>
        `;

                document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";

                slider1();
            }, 3000));

        }

    }
} else {
    header.classList.add("nav-scrolled");
    header.style.border = "none";
    header.style.boxShadow = "1px 1px 5px black";
    banner.remove();
    header.style.top = "0px";
    document.querySelector("#sort-menu-area").style.marginTop = (header.offsetHeight + 10).toString() + "px";
}




function nextIsSlider1() {

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts.length = 0;
    for (let i = 0; i < anotherTimeouts.length; i++) {
        clearTimeout(anotherTimeouts[i]);
    }
    anotherTimeouts.length = 0;
    slidingPics.innerHTML = ` 
    
    
    
            
			<img src="https://www.scoop.com.tn/modules/sphomeslider/images/c3e8e4b0ad02f2470a20317442c308b549d37633_Asus%20(1).jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider5()">&#8249;</a>   
    <a href="#" class="next" onClick="nextIsSlider2()">&#8250;</a>
    <div id="skip-slides">
    <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
</div>
	`;


    document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
    anotherTimeouts.push(setTimeout(() => {
        slider2();
    }, 3000));
}

function nextIsSlider2() {

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts.length = 0;
    for (let i = 0; i < anotherTimeouts.length; i++) {
        clearTimeout(anotherTimeouts[i]);
    }
    anotherTimeouts.length = 0;
    slidingPics.innerHTML = ` 
   
    
    
            
    <img src="https://www.scoop.com.tn/modules/sphomeslider/images/54868396aa7ca3b6f246c8e234291f6d49878f52_ps5.jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider1()">&#8249;</a>   
    <a href="#" class="next" onClick="nextIsSlider3()">&#8250;</a>
    <div id="skip-slides">
    <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
</div>
	`;


    document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
    anotherTimeouts.push(setTimeout(() => {
        slider3();
    }, 3000));
}

function nextIsSlider3() {

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts.length = 0;
    for (let i = 0; i < anotherTimeouts.length; i++) {
        clearTimeout(anotherTimeouts[i]);
    }
    anotherTimeouts.length = 0;
    slidingPics.innerHTML = ` 
    
    
    
            
    <img src="https://www.scoop.com.tn/modules/sphomeslider/images/6f86d90fe53f580927195abf48c386264cbe69f2_VivoBook-15-X571.jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider2()">&#8249;</a>   
    <a href="#" class="next" onClick="nextIsSlider4()">&#8250;</a>
    <div id="skip-slides">
    <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
</div>
	`;


    document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
    anotherTimeouts.push(setTimeout(() => {
        slider4();
    }, 3000));
}

function nextIsSlider4() {

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts.length = 0;
    for (let i = 0; i < anotherTimeouts.length; i++) {
        clearTimeout(anotherTimeouts[i]);
    }
    anotherTimeouts.length = 0;
    slidingPics.innerHTML = ` 
    
    
    
            
    <img src="https://www.scoop.com.tn/modules/sphomeslider/images/26ae80b9cdad9996e1c8625abd021c70ef843804_ThinkPad-e15%20(1).jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider3()">&#8249;</a>   
    <a href="#" class="next" onClick="nextIsSlider5()">&#8250;</a>
    <div id="skip-slides">
    <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
</div>
	`;


    document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
    anotherTimeouts.push(setTimeout(() => {
        slider5();
    }, 3000));
}

function nextIsSlider5() {

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts.length = 0;
    for (let i = 0; i < anotherTimeouts.length; i++) {
        clearTimeout(anotherTimeouts[i]);
    }
    anotherTimeouts.length = 0;
    slidingPics.innerHTML = ` 
            
    <img src="https://www.scoop.com.tn/modules/sphomeslider/images/56e32bb5499750aaf76651ffe6c0bb6b571f5571_Nintendo-switch.jpg" class="animate__animated animate__fadeIn">
			
            <a href="#"  class="previous" onClick="nextIsSlider4()">&#8249;</a>   
    <a href="#" class="next" onClick="nextIsSlider1()">&#8250;</a>
    <div id="skip-slides">
    <a href="#" class="skippers" onClick="nextIsSlider1()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider2()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider3()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider4()">&#160;</a>
    <a href="#" class="skippers" onClick="nextIsSlider5()">&#160;</a>
</div>
	`;

    document.querySelector("#slider img").style.marginTop = header.offsetHeight.toString() + "px";
    anotherTimeouts.push(setTimeout(() => {
        slider1();
    }, 3000));
}