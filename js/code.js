// 1. Theme Logic (Chế độ Sáng/Tối)
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const body = document.body;

// Kiểm tra trạng thái đã lưu
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Xử lý sự kiện click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// 2. Mobile Menu Logic
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

// Đóng menu khi click vào link
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
        entry.target.classList.add("active"); // Kích hoạt animation khi lướt tới
      }
    });
  },
  { threshold: 0.1 }
); // Hiển thị 10% là chạy

// Quét tất cả các phần tử có class animate-scroll
document
  .querySelectorAll(".animate-scroll")
  .forEach((el) => observer.observe(el));

// 4. Force check on load (Chạy ngay lập tức cho phần Header và Home)
window.onload = function () {
  document.querySelectorAll(".animate-scroll").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("active");
    }
  });
};
