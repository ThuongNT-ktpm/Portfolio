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

// kiểm tra người vào

(function () {
  // --- cấu hình của bạn ---
  const namespace = "thuongnt-ktpm-portfolio";
  const key = "unique-visits"; // bạn có thể đổi nếu muốn đếm riêng từng trang
  const localFlagKey = "visited_thuongnt"; // tên flag trong localStorage
  const counterEl = document.getElementById("visitor-count");

  // hàm cập nhật text hiển thị
  function renderCount(value) {
    if (counterEl) {
      counterEl.textContent = value;
    } else {
      console.warn("Không tìm thấy #visitor-count để render");
    }
  }

  // gọi CountAPI để lấy current value (không tăng)
  function fetchCurrentCount() {
    fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
      .then((res) => {
        if (!res.ok) throw new Error("CountAPI get failed");
        return res.json();
      })
      .then((data) => {
        renderCount(data.value);
        console.log("Current unique visits:", data.value);
      })
      .catch((err) => {
        console.warn("Không thể load count:", err.message);
        renderCount("—");
      });
  }

  // lần đầu: tăng count + cập nhật UI
  function hitAndUpdate() {
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then((res) => {
        if (!res.ok) throw new Error("CountAPI hit failed");
        return res.json();
      })
      .then((data) => {
        // data.value sau khi đã +1
        renderCount(data.value);
        console.log("First time visit, unique visits now:", data.value);
      })
      .catch((err) => {
        console.warn("Không thể tăng count:", err.message);
      });
  }

  // logic chính
  try {
    if (!localStorage.getItem(localFlagKey)) {
      // Chưa từng vào bằng browser này -> +1
      hitAndUpdate();
      localStorage.setItem(localFlagKey, "true");
    } else {
      // Đã từng vào -> chỉ lấy số hiện tại, không +1
      console.log("Đã visit trước đó trong trình duyệt này");
      fetchCurrentCount();
    }
  } catch (e) {
    // Trường hợp trình duyệt chặn localStorage (Safari private mode kiểu cũ, v.v.)
    console.warn("localStorage bị chặn, fallback sang hit mỗi lần");
    hitAndUpdate();
  }
})();
