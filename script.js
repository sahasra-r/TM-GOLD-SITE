document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slider = document.getElementById("slider");
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

  // Touch swipe logic
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  const cartItem = {
  name: "Red Kumkum",
  size: selectedSize,
  quantity: selectedQuantity
};
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push(cartItem);
localStorage.setItem("cart", JSON.stringify(cart));


  function changeQuantity(amount) {
  const input = document.getElementById("quantity");
  let current = parseInt(input.value) || 1;
  current += amount;
  if (current < 1) current = 1;
  input.value = current;
  updateWhatsAppLink();
}

cart.forEach(item => {
  const div = document.createElement("div");
  div.className = "cart-item";

  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}" style="max-width: 120px; border-radius: 8px; margin-bottom: 10px;" />
    <h3>${item.name}</h3>
    <p>Size: ${item.size}</p>
    <p>Quantity: ${item.quantity}</p>
  `;
  container.appendChild(div);
});


  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      moveSlide(1); // swipe left
    }
    if (touchEndX > touchStartX + 50) {
      moveSlide(-1); // swipe right
    }
  }

  // Make `goToSlide` global if needed in HTML onclick
  window.goToSlide = goToSlide;
  window.moveSlide = moveSlide;
});

cart.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "cart-item";
  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-img"/>
    <h3>${item.name}</h3>
    <p>Size: ${item.size}</p>
    <div class="quantity-controls">
      <button onclick="changeQuantity(${index}, -1)">−</button>
      <span>${item.quantity}</span>
      <button onclick="changeQuantity(${index}, 1)">+</button>
    </div>
    <button onclick="removeItem(${index})">Remove</button>
  `;
  cartContainer.appendChild(div);
});
