const header = document.querySelector("#nav");
const sectionOne = document.querySelector("#products");

const sectionOneOptions = {
  rootMargin: "100px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
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