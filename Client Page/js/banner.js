const mq1 = window.matchMedia("(max-width: 570px)");
const banner = document.querySelector(".banner");
const header = document.querySelector("#nav");
const sectionOne = document.querySelector("#products");

let timeouts = [];

let anotherTimeouts = [];

let randomize = Math.floor((Math.random() * 2) + 1);

if (mq1.matches == false) {
    const closeExploreOptionsButton = document.getElementById('close-explore-options');
    const exploreOptions = document.getElementById('explore-options');
    const exploreOptionsContent = document.getElementById('options');
    let exploreOptionsState = true;

    closeExploreOptionsButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (exploreOptionsState) {
            closeExploreOptionsButton.classList.add("mirror-image");
            exploreOptions.classList.add("explore-options-closed");
            exploreOptionsContent.style.display = "none";
            exploreOptionsState = false;
        } else {
            closeExploreOptionsButton.classList.remove("mirror-image");
            exploreOptions.classList.remove("explore-options-closed");
            exploreOptionsContent.style.display = "block";
            exploreOptionsState = true;
        }
    });

    (function() {
 
        var parent = document.querySelector(".price-slider");
        if(!parent) return;
       
        var
          rangeS = parent.querySelectorAll("input[type=range]"),
          numberS = parent.querySelectorAll("input[type=number]");
       
        rangeS.forEach(function(el) {
          el.onchange = function() {
            var slide1 = parseFloat(rangeS[0].value),
                  slide2 = parseFloat(rangeS[1].value);
       
            if (slide1 > slide2) {
              [slide1, slide2] = [slide2, slide1];
            }
       
            numberS[0].value = slide1;
            numberS[1].value = slide2;
            handleSortMenu();
            handlePageButton("page-1", 1);
          }
        });
       
        numberS.forEach(function(el) {
          el.onchange = function() {
              var number1 = parseFloat(numberS[0].value),
              number2 = parseFloat(numberS[1].value);
              
            if (number1 > number2) {
              var tmp = number1;
              numberS[0].value = number2;
              numberS[1].value = tmp;
            }
       
            rangeS[0].value = number1;
            rangeS[1].value = number2;
            handleSortMenu();
            handlePageButton("page-1", 1);
          }
        });
       
        numberS[0].addEventListener("change",() => {
            if(numberS[0].value == ""){
              numberS[0].value = 0;
              rangeS[0].value = parseFloat(0);
            }
          })

          numberS[1].addEventListener("change",() => {
            if(numberS[1].value == ""){
              numberS[1].value = 20000;
              rangeS[1].value = parseFloat(20000);
            }
          })

      })();

      
      
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
                    } else {
                        header.classList.add("nav-scrolled");
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
            
            
			<img src="banner.jpg" class="animate__animated animate__fadeIn">
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
        document.querySelector("#slider img").addEventListener("load", () => {
            document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
            document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
            document.querySelector("#slider").style.padding = "0px";
            document.querySelector("#slider img").style.marginTop = "3px";
            header.style.top = "0px";
        });

        window.addEventListener("resize", () => {

            document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
            document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
            document.querySelector("#slider").style.padding = "0px";
            document.querySelector("#slider img").style.marginTop = "3px";
            header.style.top = "0px";

        });

        globalThis.slidingPics = document.querySelector("#slider");
        slider2();

        function slider1() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
    
    
    
            
			<img src="banner.jpg" class="animate__animated animate__fadeIn">
			
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


                document.querySelector("#slider img").addEventListener("load", () => {
                    document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.padding = "0px";
                    document.querySelector("#slider img").style.marginTop = "3px";
                    header.style.top = "0px";
                });


                slider2();
            }, 6000));
        }



        function slider2() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
    
    
    
            
			<img src="banner.jpg" class="animate__animated animate__fadeIn">
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
                document.querySelector("#slider img").addEventListener("load", () => {
                    document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.padding = "0px";
                    document.querySelector("#slider img").style.marginTop = "3px";
                    header.style.top = "0px";
                });


                slider3();

            }, 6000));
        }

        function slider3() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="banner.jpg" class="animate__animated animate__fadeIn">
                
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

                document.querySelector("#slider img").addEventListener("load", () => {
                    document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.padding = "0px";
                    document.querySelector("#slider img").style.marginTop = "3px";
                    header.style.top = "0px";
                });
                slider4();
            }, 6000));

        }

        function slider4() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="banner.jpg" class="animate__animated animate__fadeIn">
                
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

                document.querySelector("#slider img").addEventListener("load", () => {
                    document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.padding = "0px";
                    document.querySelector("#slider img").style.marginTop = "3px";
                    header.style.top = "0px";
                });

                slider5();
            }, 6000));

        }

        function slider5() {

            timeouts.push(setTimeout(() => {
                slidingPics.innerHTML = ` 
        
        
        
                
                <img src="banner.jpg" class="animate__animated animate__fadeIn">
                
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

                document.querySelector("#slider img").addEventListener("load", () => {
                    document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
                    document.querySelector("#slider").style.padding = "0px";
                    document.querySelector("#slider img").style.marginTop = "3px";
                    header.style.top = "0px";
                });

                slider1();
            }, 6000));

        }

    }

    document.querySelector("#container").style.marginTop = "0px";
} else {
    header.classList.add("nav-scrolled");
    header.style.border = "none";
    header.style.boxShadow = "1px 1px 5px black";
    banner.remove();
    header.style.top = "0px";
    document.querySelector("#container").style.marginTop = (header.offsetHeight + 10).toString() + "px";
    document.querySelector("#explore-options").remove();
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
    
    
    
            
			<img src="banner.jpg" class="animate__animated animate__fadeIn">
			
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


    document.querySelector("#slider img").addEventListener("load", () => {
        document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
        document.querySelector("#slider").style.padding = "0px";
        document.querySelector("#slider img").style.marginTop = "3px";
        header.style.top = "0px";
    });
    anotherTimeouts.push(setTimeout(() => {
        slider2();
    }, 6000));
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
   
    
    
            
    <img src="banner.jpg" class="animate__animated animate__fadeIn">
			
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


    document.querySelector("#slider img").addEventListener("load", () => {
        document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
        document.querySelector("#slider").style.padding = "0px";
        document.querySelector("#slider img").style.marginTop = "3px";
        header.style.top = "0px";
    });
    anotherTimeouts.push(setTimeout(() => {
        slider3();
    }, 6000));
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
    
    
    
            
    <img src="banner.jpg" class="animate__animated animate__fadeIn">
			
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


    document.querySelector("#slider img").addEventListener("load", () => {
        document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
        document.querySelector("#slider").style.padding = "0px";
        document.querySelector("#slider img").style.marginTop = "3px";
        header.style.top = "0px";
    });
    anotherTimeouts.push(setTimeout(() => {
        slider4();
    }, 6000));
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
    
    
    
            
    <img src="banner.jpg
banner.jpg
banner.jpg" class="animate__animated animate__fadeIn">
			
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


    document.querySelector("#slider img").addEventListener("load", () => {
        document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
        document.querySelector("#slider").style.padding = "0px";
        document.querySelector("#slider img").style.marginTop = "3px";
        header.style.top = "0px";
    });
    anotherTimeouts.push(setTimeout(() => {
        slider5();
    }, 6000));
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
            
    <img src="banner.jpg" class="animate__animated animate__fadeIn">
			
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

    document.querySelector("#slider img").addEventListener("load", () => {
        document.querySelector("#slider").style.height = document.querySelector("#slider img").offsetHeight.toString() + "px";
        document.querySelector("#slider").style.marginTop = header.offsetHeight.toString() + "px";
        document.querySelector("#slider").style.padding = "0px";
        document.querySelector("#slider img").style.marginTop = "3px";
        header.style.top = "0px";
    });
    anotherTimeouts.push(setTimeout(() => {
        slider1();
    }, 6000));
}