const products = [
  { id: 1, name: "Smartphone", price: 13999, image: "https://cdn.thewirecutter.com/wp-content/media/2024/09/iphone-2048px-6990-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp", description: "Latest smartphone with advanced features." },
  { id: 2, name: "Laptop", price: 49999, image: "https://i.pcmag.com/imagery/roundups/02naaOkVLe7DIiejFUyDPJp-64..v1734989633.jpg", description: "High performance laptop for work and play." },
  { id: 3, name: "Wireless Earbuds", price: 1999, image: "https://www.gonoise.com/cdn/shop/files/4_83ab5e13-fbce-4071-9630-470b86721e85.webp?v=1720440893", description: "Noise-cancelling wireless earbuds." },
  { id: 4, name: "Fitness Band", price: 999, image: "https://www.vitsupp.in/wp-content/uploads/2016/02/Garmin-Vivosmart-Blue-Fitness-Band-1.jpg", description: "Track your fitness and notifications." },
  { id: 5, name: "Portable Charger", price: 1299, image: "https://cdn.thewirecutter.com/wp-content/media/2023/06/portablelaptopchargers-2048px-0278-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp", description: "Charge your devices on the go." }
];

let cart = [];

// Render products for the Products page
function renderProducts() {
  const productsDiv = document.createElement('section');
  productsDiv.className = 'products';
  productsDiv.id = 'products';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description || ''}</p>
      <p><b>₹${product.price}</b></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(card);
  });
  return productsDiv;
}

// Add to cart using the new cart array structure
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
}

// Update cart count in the header
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

// Show cart modal with new cart structure
function showCart() {
  const modal = document.getElementById('cart-modal');
  const itemsUl = document.getElementById('cart-items');
  itemsUl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.qty * item.price;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.qty} - ₹${item.qty * item.price}
      <button onclick="removeFromCart(${item.id})" style="background:#eee;color:#ff6600;border:none;border-radius:3px;padding:2px 8px;cursor:pointer;">Remove</button>
    `;
    itemsUl.appendChild(li);
  });
  document.getElementById('cart-total').textContent = total;
  modal.style.display = 'block';
}

// Remove from cart using the new cart structure
function removeFromCart(id) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) {
    if (cart[idx].qty > 1) {
      cart[idx].qty--;
    } else {
      cart.splice(idx, 1);
    }
    updateCartCount();
    showCart();
  }
}

// --- SPA Navigation Logic ---

function loadPage(page) {
  const main = document.getElementById('main-content');
  main.innerHTML = '';
  if (page === 'home') {
    main.innerHTML = `
      <section class="home">
        <h1>Welcome to <span style="color:#38ffb3;text-shadow:0 2px 12px #1e90ff77;">Shopping Kart</span></h1>
        <p>Your one-stop shop for the latest <b style="color:#1e90ff;">electronics</b> and <b style="color:#38ffb3;">gadgets</b>.<br>
        <span style="color:#38ffb3;">Enjoy exclusive deals and fast delivery!</span></p>
        <img src="https://static.vecteezy.com/system/resources/previews/034/962/559/non_2x/banner-with-3d-empty-shopping-cart-color-advertising-of-shops-and-services-vector.jpg" alt="Banner" style="width:100%;max-width:600px;border-radius:22px;margin:1.5rem 0;box-shadow:0 8px 32px rgba(30,144,255,0.12);border:2px solid #38ffb3;background:rgba(35,41,70,0.4);">
      </section>
    `;
  } else if (page === 'products') {
    main.appendChild(renderProducts());
  } else if (page === 'about') {
    main.innerHTML = `
      <section class="about">
        <h1>About Shopping Kart</h1>
        <p>Shopping Kart is an innovative e-commerce platform inspired by the best in the industry. We offer a wide range of products at unbeatable prices, with a focus on customer satisfaction and fast delivery.</p>
        <ul>
          <li><b style="color:#38ffb3;">Name:</b> Yash Mishra</li>
          <li><b style="color:#38ffb3;">Roll no.:</b> 27409</li>
          <li><b style="color:#38ffb3;">Location:</b> India</li>
          <li><b style="color:#38ffb3;">Contact:</b> support@shoppingkart.com</li>
        </ul>
      </section>
    `;
  } else if (page === 'contact') {
    main.innerHTML = `
      <section class="contact">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? Reach out to us!</p>
        <ul>
          <li><b style="color:#6c8bbd;">Email:</b> support@shoppingkart.com</li>
          <li><b style="color:#6c8bbd;">Phone:</b> +91-1234567890</li>
          <li><b style="color:#6c8bbd;">Address:</b> India</li>
        </ul>
      </section>
    `;
  }
  // Highlight active nav link
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

// Navigation event listeners
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    loadPage(this.dataset.page);
  });
});

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  loadPage('home');
  updateCartCount();
  document.getElementById('year').textContent = new Date().getFullYear();
});

document.getElementById('cart-btn').onclick = showCart;
document.getElementById('close-cart').onclick = () => {
  document.getElementById('cart-modal').style.display = 'none';
};
window.onclick = function(event) {
  if (event.target == document.getElementById('cart-modal')) {
    document.getElementById('cart-modal').style.display = 'none';
  }
};

// Expose addToCart globally for inline onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
