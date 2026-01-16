// 1. Theme Logic (Chế độ Sáng/Tối)
document.addEventListener("DOMContentLoaded", function () {
  // 1. Khai báo danh sách các file CSS giao diện
  const themes = [
    "css/styles.css",
    "css/style-wibu.css",
    "css/pixel.css",
    "css/cute.css",
  ];

  // 2. Lấy các phần tử cần thiết
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeLink = document.getElementById("theme-link");
  const icon = themeToggleBtn.querySelector("i");

  let currentThemeIndex = localStorage.getItem("savedThemeIndex")
    ? parseInt(localStorage.getItem("savedThemeIndex"))
    : 0;

  function applyTheme(index) {
    themeLink.href = themes[index];

    if (index === 0) {
      // Mặc định
      icon.className = "fas fa-moon";
    } else if (index === 1) {
      // Wibu
      icon.className = "fas fa-robot";
    } else if (index === 2) {
      // Retro
      icon.className = "fas fa-newspaper";
    } else if (index === 3) {
      // Cute
      icon.className = "fas fa-heart";
    }

    localStorage.setItem("savedThemeIndex", index);
  }

  applyTheme(currentThemeIndex);

  themeToggleBtn.addEventListener("click", function () {
    currentThemeIndex++;

    if (currentThemeIndex >= themes.length) {
      currentThemeIndex = 0;
    }

    applyTheme(currentThemeIndex);
  });

  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  if (menuIcon) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("fa-times"); // Đổi icon thành dấu X
      navbar.classList.toggle("active");
    };
  }

  window.onscroll = () => {
    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      navbar.classList.remove("active");
    }
  };
});

// 2. Mobile Menu Logic
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

document.querySelectorAll(".navbar a").forEach((n) =>
  n.addEventListener("click", () => {
    menuIcon.classList.remove("fa-times");
    navbar.classList.remove("active");
  })
);

// 3. ANIMATION LOGIC (Intersection Observer)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

// Quét tất cả các phần tử có class animate-scroll
document
  .querySelectorAll(".animate-scroll")
  .forEach((el) => observer.observe(el));

window.onload = function () {
  document.querySelectorAll(".animate-scroll").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("active");
    }
  });
};
