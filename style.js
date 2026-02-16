const loadProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  displayProducts(data);
};

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
            <div class="flex justify-between px-5 pb-2">
                <span
                    class="bg-primary-content text-primary px-2 py-1 text-xs "
                    >${product.category}</span
                >
                <span>
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
        productContainer.appendChild(div);
    })
}

loadProducts();