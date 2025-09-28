// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}
// Respect reduced motion (no animations here yet, but this is where we gate them)
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
// if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { /* no-op */}

//Order Summary
// Sample order data
const orderItems = [
  { name: "Product A", price: 12.99, quantity: 1 },
  { name: "Product B", price: 5.5, quantity: 2 },
  { name: "Product C", price: 20.0, quantity: 1 },
];

function renderOrderSummary() {
  const itemList = document.getElementById("cart-items");
  const orderTotalSpan = document.getElementById("order-total");
  let total = 0;

}

/*======== NAVBAR========= */
const hamburger = document.querySelector(".zp-hamburger");
const navLinks = document.querySelector(".zp-nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});


