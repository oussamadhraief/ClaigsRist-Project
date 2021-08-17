function slide(direction){
    var container = document.querySelector("#featured-products ul");
    let scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 10;
        } else {
            container.scrollLeft += 10;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 50);
}

document.querySelector("#previous-prod").addEventListener("click", () => {
    slide("left");
    console.log("1");
}); 

document.querySelector("#next-prod").addEventListener("click", () => {
    slide("right");
    console.log("2");
}); 
