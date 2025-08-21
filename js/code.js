// ========== Toggle theme ==========
(() => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") root.classList.add("light");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = root.classList.toggle("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }
})();

// ========== Mobile menu ==========
(() => {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  const closeMenu = () => menu.classList.remove("open");
  const toggleMenu = () => menu.classList.toggle("open");

  btn.addEventListener("click", toggleMenu);

  // Đóng khi chọn mục
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));

  // Đóng khi bấm ngoài
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Đóng bằng phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// ========== Scroll spy ==========
(() => {
  const nav = document.querySelector(".Laptop");
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')].filter(
    (a) => a.getAttribute("href") !== "#home"
  );

  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    nav.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
    const active = nav.querySelector(`a[href='${id}']`);
    if (active) active.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive("#" + entry.target.id);
      }),
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
})();
function haha() {
  alert(" Đã gửi thành công");
}
