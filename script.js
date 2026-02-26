document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("mobile");
    navLinks.classList.toggle("show");
	hamburger.classList.toggle("open"); // Ensure it toggles into a cross (✖)
  });

  // Carousel Functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.remove("active");
      if (i === index) {
        item.classList.add("active");
      }
    });
  }

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }, 5000);
});

// Sparkle madness
function createSparklesFor(element) {
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Random position within the element
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    // Random delay offset so they're not synced
    sparkle.style.animationDelay = `${Math.random() * 2}s`;

    element.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
      sparkle.remove();
    }, 1500);
  }, 200); // New sparkle every 200ms
}

// Attach to all .top-winner cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.top-winner').forEach((card) => {
    createSparklesFor(card);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".home-m-item");
  let current = 0;
  const max = items.length;

  setInterval(() => {
    items[current].classList.remove("active");
    current = (current + 1) % max;
    items[current].classList.add("active");
  }, 3000); // change every 3 seconds
});
