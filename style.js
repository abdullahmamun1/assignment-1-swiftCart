const removeActive = () => {
    const categoryButtons = document.querySelectorAll('.cat-btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('product-container').classList.add('hidden');
    } else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('product-container').classList.remove('hidden');
    }
}

const loadProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  displayProducts(data);
};

const loadCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    displayCategories(data);
}

const loadProductsByCategory = async (category) => {
    removeActive();
    manageSpinner(true);
    if(category === "All") {
        loadProducts();
        const clickBtn = document.getElementById(`cat-btn-All`);
        clickBtn.classList.add('active');
        return;
    }
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    displayProducts(data);
    const clickBtn = document.getElementById(`cat-btn-${category}`);
    clickBtn.classList.add('active');
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = `<button id = "cat-btn-All" onclick = 'loadProductsByCategory("All")' class='btn btn-outline rounded-3xl py-2 px-4 cat-btn active'>All</button>`;
    categories.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button id = "cat-btn-${category}" onclick = "loadProductsByCategory('${category.replace("'", "\\'")}')" class="btn btn-outline rounded-3xl py-2 px-4 cat-btn">${category}</button>
        `
        categoryContainer.appendChild(div);
    })
}

const displayProducts = (products) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("rounded-lg", "shadow-sm", "space-y-2", "flex", "flex-col", "justify-between");
        div.innerHTML = `
        <div>
            <div class="aspect-[11/12] w-full overflow-hidden bg-gray-50 mb-4 rounded-t-lg">
                <img
                    src=${product.image}
                    class="h-full w-full object-cover"
                    alt=""
                />
            </div>
            <div class="flex items-center justify-between px-5 pb-2">
                <span
                    class="bg-primary-content text-primary rounded-full px-2 py-1 text-xs"
                    >${product.category}</span
                >
                <span class="text-xs">
                    <i class="fa-solid fa-star text-warning text-xs"></i> ${product.rating.rate} (${product.rating.count})
                </span>
            </div>
        </div>
        <div class="px-5">
            <h3 class="font-semibold text-md">${product.title}</h3>
            <h3 class="font-bold text-md text-primary">$${product.price}</h3>
        </div>
        <div class="grid grid-cols-2 gap-2 px-2 mb-4">
            <div class="btn btn-outline flex items-center gap-2">
              <i class="fa-regular fa-eye"></i> Details
            </div>
            <div class="btn btn-primary flex items-center gap-2">
              <i class="fa-solid fa-cart-shopping"></i> Add
            </div>
        </div>
        `
        manageSpinner(false);
        productContainer.appendChild(div);
    })
}

loadProducts();
loadCategories();
