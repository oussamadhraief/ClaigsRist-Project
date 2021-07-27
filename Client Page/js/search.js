const mqmm = window.matchMedia("(max-width: 4000px)");

if (mqmm.matches) {
    const inp = document.querySelector(".searchTerm");
    const searchIcon = document.querySelector("#search-icon");

    searchIcon.style.height = inp.style.height;
    
        
      
}