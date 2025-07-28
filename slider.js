document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  if (!slider) return;

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

  // Export globally so HTML can use onclick
  window.goToSlide = goToSlide;
  window.moveSlide = moveSlide;
});
