const homeBtn = document.getElementById("homeBtn");
const productsBtn = document.getElementById("productsBtn");
const home = document.getElementById("home-page");
const products = document.getElementById("products-page");

productsBtn.addEventListener("click", () => {
    productsBtn.classList.add("text-primary");
    homeBtn.classList.remove("text-primary");
});

homeBtn.addEventListener("click", () => {
    homeBtn.classList.add("text-primary");
    productsBtn.classList.remove("text-primary");
});