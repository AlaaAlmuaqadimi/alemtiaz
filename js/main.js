// ===============================
// Smooth Scroll
// ===============================
document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("data-scroll"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// ===============================
// Scroll To Top
// ===============================
const scrollBtn = document.querySelector(".scroll-top");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 350);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===============================
// Hero Stats Counter
// ===============================
const statElements = document.querySelectorAll(".stat-number[data-count]");
let statsStarted = false;

function animateStats() {
  if (statsStarted || !statElements.length) return;

  const hero = document.querySelector("#hero");
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    statsStarted = true;

    statElements.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      let current = 0;

      const steps = 70;
      let i = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        i++;
        current += increment;

        el.textContent =
          target % 1 === 0 ? Math.round(current) : current.toFixed(1);

        if (i >= steps) {
          el.textContent = String(target);
          clearInterval(timer);
        }
      }, 20);
    });
  }
}

window.addEventListener("scroll", animateStats);
window.addEventListener("load", animateStats);

// ===============================
// Hero Parallax (Fix)
// ===============================
const heroShowcase = document.querySelector(".hero-showcase");
const heroImg = document.querySelector(".hero-phone-img");

if (heroShowcase && heroImg) {
  heroShowcase.addEventListener("mousemove", (e) => {
    const rect = heroShowcase.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const translateX = -x * 18;
    const translateY = -y * 18;

    heroImg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(1.06)`;
  });

  heroShowcase.addEventListener("mouseleave", () => {
    heroImg.style.transform = "translate3d(0,0,0) scale(1)";
  });
}

// ===============================
// Reveal Animations (ONE observer only)
// ===============================
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -12% 0px",
  }
);

reveals.forEach((el) => io.observe(el));

// ===============================
// Modal
// ===============================
const modal = document.getElementById("messageModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalIcon = document.getElementById("modalIcon");
const modalClose = document.getElementById("modalClose");

function openModal(type, title, message) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalIcon.classList.toggle("error", type !== "success");
  modal.classList.add("visible");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("visible");
  modal.setAttribute("aria-hidden", "true");
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// ===============================
// Contact Form Fetch
// ===============================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const actionUrl = contactForm.getAttribute("action") || "send_email.php";

    fetch(actionUrl, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          openModal(
            "success",
            "تم إرسال رسالتك ✨",
            data.message || "شكرًا لتواصلك، سنرد عليك قريبًا."
          );
          contactForm.reset();
        } else {
          openModal(
            "error",
            "خطأ أثناء الإرسال",
            data.message || "تعذر إرسال الرسالة، يرجى المحاولة مرة أخرى."
          );
        }
      })
      .catch(() => {
        openModal("error", "مشكلة في الاتصال", "تعذر الاتصال بالخادم حاليًا، حاول مجددًا لاحقًا.");
      });
  });
}

// ===============================
// Mobile Nav Toggle
// ===============================
const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainMenu.classList.contains("is-open")) {
        mainMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}
