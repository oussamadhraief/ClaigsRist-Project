function slide(direction){
    var container = document.querySelector("#featured-products ul");
    let scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 10;
        } else {
            let temp = container.scrollLeft;
            container.scrollLeft += 10;
            if (container.scrollLeft == temp){
                document.querySelector("#previous-prod").disabled = true;
                document.querySelector("#next-prod").disabled = true;
                var fallbackVar = setInterval(function(){
                container.scrollLeft -= 30;
                if(container.scrollLeft == 0){
                    window.clearInterval(fallbackVar);
                }
            }, 50);
            document.querySelector("#previous-prod").disabled = false;
                document.querySelector("#next-prod").disabled = false;
            }
        }
        scrollCompleted += 10;
        console.log(container.scrollLeft);
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 50);
}

document.querySelector("#previous-prod").addEventListener("click", () => {
    slide("left");
}); 

document.querySelector("#next-prod").addEventListener("click", () => {
    slide("right");
}); 
