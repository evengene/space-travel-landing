function openNav() {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.add("visible");
  mobileMenu.classList.remove("hidden");
}

function closeNav() {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.remove("visible");
  mobileMenu.classList.add("hidden");
}