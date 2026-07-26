/* environment: macOS | zsh | Node.js frontend demo site | pragmatic blue/white/black theme */

/* --- Product Data --- */
const products = [
  {
    id: 1,
    title: "WSRYYCC Portable Steam Cleaner",
    desc: "16 accessories, 15s heat-up, 6-level adjustable, handheld for home, tile, grout, grease, car detailing",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviews: 2425,
    image: "https://m.media-amazon.com/images/I/710EPs-7hML._AC_SL1500_.jpg",
    link: "https://amzn.to/4x4iXnZ"
  },
  {
    id: 2,
    title: "Motorola Moto G Play LTE",
    desc: "Unlocked, 64GB, 50MP Camera, Sapphire Blue, Android 13, 4GB RAM",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.3,
    reviews: 1867,
    image: "https://m.media-amazon.com/images/I/61xk4XNRktL._AC_SL1500_.jpg",
    link: "https://amzn.to/44QR07e"
  },
  {
    id: 3,
    title: "S25Ultra Smartphone",
    desc: "6.6 HD+ Display, 4GB RAM, 32GB ROM/256GB SD, 4G Dual SIM, Face ID, WiFi, Bluetooth, GPS",
    price: 76.99,
    rating: 3.7,
    reviews: 145,
    image: "https://m.media-amazon.com/images/I/61SQ5G+Ma5L._AC_SL1500_.jpg",
    link: "https://amzn.to/44Mvcd5"
  },
  {
    id: 4,
    title: "Lenovo IdeaPad Slim 3i",
    desc: "15.6 FHD Laptop, 8GB RAM, 128GB SSD, Intel N150, Windows 11, Microsoft Office 365",
    price: 389.00,
    rating: 5.0,
    reviews: 4,
    image: "https://m.media-amazon.com/images/I/71gtXjA7GDL._AC_SL1500_.jpg",
    link: "https://amzn.to/4yIvsaE"
  },
  {
    id: 5,
    title: "Redragon K521 Gaming Keyboard",
    desc: "104-key mechanical RGB, USB-A, anti-ghosting, multimedia keys, compatible PC/Mac/PS/Xbox",
    price: 15.99,
    rating: 4.4,
    reviews: 9208,
    image: "https://m.media-amazon.com/images/I/71kp4T3JSIL._AC_SX679_.jpg",
    link: "https://amzn.to/4fpoW12"
  },
  {
    id: 6,
    title: "Unisex Running Shoes",
    desc: "Slip-on, lightweight, breathable, non-slip, casual athletic workout sneakers",
    price: 19.99,
    rating: 4.2,
    reviews: 338,
    image: "https://m.media-amazon.com/images/I/718pW-XIQeL._AC_SY695_.jpg",
    link: "https://amzn.to/3TgV0eR"
  },
  {
    id: 7,
    title: "WELLST Handheld Game Console",
    desc: "220 preloaded retro games, 3.0 LCD screen, rechargeable battery, portable gaming for kids",
    price: 37.99,
    originalPrice: 39.99,
    rating: 4.2,
    reviews: 1975,
    image: "https://m.media-amazon.com/images/I/71ULfEFQV9L._AC_SX679_.jpg",
    link: "https://amzn.to/3RfS15P"
  },
  {
    id: 8,
    title: "Lenovo IdeaCentre AIO Desktop",
    desc: "24 FHD IPS Display, 8GB RAM, 512GB SSD, Intel N100, Windows 11, Wi-Fi 6, Bluetooth 5.2",
    price: 449.99,
    rating: 4.5,
    reviews: 186,
    image: "https://m.media-amazon.com/images/I/71jzvekd3QL._AC_SL1500_.jpg",
    link: "https://amzn.to/4vRZvdh"
  },
  {
    id: 9,
    title: "Wireless Bluetooth Earbuds",
    desc: "True wireless earbuds, 40hr battery, ANC, IPX5 waterproof, touch control, USB-C charging",
    price: 29.99,
    rating: 4.0,
    reviews: 5420,
    image: "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_SL1500_.jpg",
    link: "https://amzn.to/4amznEarbuds"
  }
];

/* --- State --- */
const cart = [];
const wishlist = new Set();

/* --- Render Products --- */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3 ? 1 : 0;
  const empty = 5 - full - half;
  return "&#9733;".repeat(full) + (half ? "&#9734;" : "") + "&#9734;".repeat(empty);
}

function createCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  card.innerHTML = `
    <div class="card-image">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.title}</h3>
      <p class="card-desc">${product.desc}</p>
      <div class="card-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${hasDiscount ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
        ${hasDiscount ? `<span style="font-size:0.75rem;color:var(--red);font-weight:600;">-${discountPct}%</span>` : ""}
      </div>
      <div class="card-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span class="rating-value">${product.rating}</span>
        <span class="review-count">(${product.reviews.toLocaleString()})</span>
      </div>
      <div class="card-buttons">
        <button class="btn btn-cart" data-id="${product.id}" aria-label="Add ${product.title} to cart">Add to Cart</button>
        <button class="btn btn-wishlist" data-id="${product.id}" aria-label="Add ${product.title} to wishlist">
          <span class="wish-heart">&#9825;</span> Wishlist
        </button>
        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-purchase" aria-label="Purchase ${product.title}">Purchase</a>
      </div>
    </div>
  `;

  return card;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  products.forEach(function (product) {
    grid.appendChild(createCard(product));
  });
  attachCardEvents();
}

/* --- Card Events --- */
function attachCardEvents() {
  var cartButtons = document.querySelectorAll(".btn-cart");
  cartButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"));
      addToCart(id);
    });
  });

  var wishlistButtons = document.querySelectorAll(".btn-wishlist");
  wishlistButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"));
      toggleWishlist(id, btn);
    });
  });
}

/* --- Cart --- */
function addToCart(id) {
  var product = products.find(function (p) { return p.id === id; });
  if (!product) return;

  var existing = cart.find(function (item) { return item.id === id; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
  }

  updateCartCount();
  showToast("Added to cart: " + product.title);
}

function updateCartCount() {
  var total = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  document.getElementById("cartCount").textContent = total;
}

function updateWishlistCount() {
  document.getElementById("wishlistCount").textContent = wishlist.size;
}

/* --- Wishlist --- */
function toggleWishlist(id, btn) {
  var heart = btn.querySelector(".wish-heart");
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.classList.remove("active");
    heart.innerHTML = "&#9825;";
    showToast("Removed from wishlist");
  } else {
    wishlist.add(id);
    btn.classList.add("active");
    heart.innerHTML = "&#9829;";
    showToast("Added to wishlist");
  }
  updateWishlistCount();
}

/* --- Toast --- */
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(function () {
    toast.classList.remove("visible");
  }, 2500);
}

/* --- Init --- */
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  attachHeaderEvents();
});

function attachHeaderEvents() {
  var wishlistToggle = document.getElementById("wishlistToggle");
  if (wishlistToggle) {
    wishlistToggle.addEventListener("click", function () {
      showToast(wishlist.size + " item(s) in wishlist");
    });
  }
}