document.addEventListener("DOMContentLoaded", function () {
  // === Product Slider ===
  const slider = document.getElementById("slider");
  if (slider) {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    function moveSlide(direction) {
      currentSlide += direction;
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function goToSlide(index) {
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) moveSlide(1);
      if (touchEndX > touchStartX + 50) moveSlide(-1);
    });

    window.goToSlide = goToSlide;
    window.moveSlide = moveSlide;
  }

  // === Cart Display Logic ===
  const container = document.querySelector(".cart-container");
  if (container) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img" />
        <h3>${item.name}</h3>
        <label>Size: 
          <select onchange="updateSize(${index}, this.value)">
            <option value="40g" ${item.size === "40g" ? "selected" : ""}>40g</option>
            <option value="100g" ${item.size === "100g" ? "selected" : ""}>100g</option>
            <option value="200g" ${item.size === "200g" ? "selected" : ""}>200g</option>
            <option value="250g" ${item.size === "250g" ? "selected" : ""}>250g</option>
            <option value="500g" ${item.size === "500g" ? "selected" : ""}>500g</option>
            <option value="1000g" ${item.size === "1000g" ? "selected" : ""}>1000g</option>
          </select>
        </label>
        <div class="quantity-controls">
          <button onclick="changeCartQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeCartQuantity(${index}, 1)">+</button>
        </div>
        <button onclick="removeItem(${index})">Remove</button>
      `;
      container.appendChild(div);
    });
  }
});

// === Cart Functions (Global Scope) ===
function changeCartQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = Math.max(1, parseInt(cart[index].quantity) + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function updateSize(index, newSize) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].size = newSize;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
