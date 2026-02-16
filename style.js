
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

const loadProductDetails = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    displayProductDetails(data);
}

const displayProductDetails = (product) => {
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = `
            <div class="col-span-2 flex items-center justify-center">
                <img src="${product.image}" alt="">
            </div>
            <div class="col-span-4 ml-20">
                <h2 class="text-5xl font-bold mb-5">Product Details</h2>
                <h2 class="text-2xl font-bold">${product.title}</h2>
                <p class="">Price: <span class="font-bold text-primary">$${product.price}</span></p>
                <div class="flex items-center justify-between py-4">
                <span
                    class="bg-primary-content text-primary rounded-full px-2 py-1 text-xs"
                    >${product.category}</span
                >
                <span class="text-xs">
                    <i class="fa-solid fa-star text-warning text-xs"></i> ${product.rating.rate} (${product.rating.count})
                </span>
            </div>
            <h2 class="text-xl font-semibold mb-2">Product Description</h2>
            <p class="text-gray-500">${product.description}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary mt-10">
                <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            
            </div>
        `
    document.getElementById('product_modal').showModal();
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
            <div onclick = "loadProductDetails(${product.id})" class="btn btn-outline flex items-center gap-2">
              <i class="fa-regular fa-eye"></i> Details
            </div>
            <div onclick = "addToCart(${product.id})" class="btn btn-primary flex items-center gap-2">
              <i class="fa-solid fa-cart-shopping"></i> Add
            </div>
        </div>
        `
        manageSpinner(false);
        productContainer.appendChild(div);
    })
}

// Cart Functionality
const CART_KEY = "swiftcart_cart";
let cart = [];
const loadCart = () => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}

const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

const addToCart = async (productId) => {
  const id = Number(productId);
  const existing = cart.find((x) => x.id === id);
  if (existing) {
    existing.qty += 1;
    saveCart();
      renderCartUI();
      updateCartCountUI();
    return;
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  cart.push({
    id: product.id,
    title: product.title,
    price: Number(product.price) || 0,
    image: product.image,
    qty: 1,
  });
    
  console.log(cart);

  saveCart();
  renderCartUI();
  updateCartCountUI();
}

const changeQty = (productId, delta) => {
  const id = Number(productId);
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter((x) => x.id !== id);
  }

  saveCart();
    renderCartUI();
    updateCartCountUI();
}

const getCartCount = () => {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

const getCartTotal = () => {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

const removeFromCart = (productId) => {
  const id = Number(productId);
  cart = cart.filter((x) => x.id !== id);
    saveCart();
    renderCartUI();
}

const clearCart = () => {
  cart = [];
  saveCart();
  renderCartUI();
}

const updateCartCountUI = () => {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = getCartCount();
}

const renderCartUI = () => {
  const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = `
    <!-- sidebar header-->
    <h2 class="text-xl font-bold mb-4">Shopping Cart</h2>

    <li class="hidden md:block mb-2">
      <div class="grid grid-cols-4 gap-3 font-semibold opacity-70">
        <p>Image</p>
        <p>Title</p>
        <p class="text-right">Price</p>
        <p class="text-right">Action</p>
      </div>
    </li>

    ${
      cart.length === 0
        ? `<li><p class="opacity-70 py-6 text-center">Cart is empty.</p></li>`
        : cart
            .map(
              (item) => `
              <li class="py-2">
                

                <!-- sidebar desktop card-->
                <div class="hidden md:grid grid-cols-4 gap-3 items-center border-b border-base-300 pb-3">
                  <img src="${item.image}" class="w-14 h-14 object-cover rounded-lg" alt="" />
                  
                  <div>
                    <p class="text-sm font-medium line-clamp-1">${item.title}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <button class="btn btn-xs" onclick="changeQty(${item.id}, -1)">-</button>
                      <span class="text-sm font-medium">${item.qty}</span>
                      <button class="btn btn-xs" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                  </div>

                  <p class="text-right font-semibold">$${(item.price * item.qty).toFixed(2)}</p>

                  <div class="text-right">
                    <button onclick="removeFromCart(${item.id})" class="btn btn-error btn-xs text-white">
                      Remove
                    </button>
                  </div>
                </div>

              </li>
            `
            )
            .join("")
    }

    <!-- sidebar footer-->
    <li class="mt-4">
      <div class="border-t border-base-300 pt-4">
        <div class="flex justify-between items-center font-bold text-lg">
          <p>Total: </p>
          <p>$${getCartTotal().toFixed(2)}</p>
        </div>

        <div class=" grid grid-cols-2 gap-2">
          <button class="btn btn-outline btn-sm" onclick="clearCart()">Clear</button>
          <button class="btn btn-primary btn-sm">Checkout</button>
        </div>
      </div>
    </li>
  `;

  updateCartCountUI();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartUI();
});

cart = loadCart();
loadProducts();
loadCategories();
