const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton instanceof HTMLButtonElement && navigation instanceof HTMLElement) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const cards = [...document.querySelectorAll(".card")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cards.length > 0 && !prefersReducedMotion && "IntersectionObserver" in window) {
  const cardGroups = new Map();

  cards.forEach((card) => {
    const group = card.closest(".card-grid") ?? card.parentElement;
    const groupIndex = cardGroups.get(group) ?? 0;
    cardGroups.set(group, groupIndex + 1);
    card.dataset.scrollReveal = groupIndex % 2 === 0 ? "left" : "right";
    card.dataset.scrollVisible = "false";
    card.style.setProperty("--card-reveal-delay", `${(groupIndex % 4) * 90}ms`);
  });

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.scrollVisible = "true";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  cards.forEach((card) => cardObserver.observe(card));
}
