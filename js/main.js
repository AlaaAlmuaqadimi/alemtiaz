  // سكرول ناعم
  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("data-scroll"));
      if (!target) return;
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });

  // زر رجوع للأعلى
  const scrollBtn = document.querySelector(".scroll-top");
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 350);
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // عداد الأرقام في الهيرو
  const statElements = document.querySelectorAll(".stat-number[data-count]");
  let statsStarted = false;
  function animateStats() {
    if (statsStarted) return;
    const hero = document.querySelector("#hero");
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsStarted = true;
      statElements.forEach(el => {
        const target = parseFloat(el.dataset.count);
        let current = 0;
        const steps = 70;
        let i = 0;
        const increment = target / steps;
        const timer = setInterval(() => {
          i++;
          current += increment;
          el.textContent = target % 1 === 0 ? Math.round(current) : current.toFixed(1);
          if (i >= steps) {
            el.textContent = target;
            clearInterval(timer);
          }
        }, 20);
      });
    }
  }
  window.addEventListener("scroll", animateStats);
  window.addEventListener("load", animateStats);

  // بارالاكس بسيط للهواتف
  const heroShowcase = document.querySelector(".hero-showcase");
  const phoneLayers = document.querySelectorAll(".phone-layer");
  if (heroShowcase && phoneLayers.length) {
    heroShowcase.addEventListener("mousemove", (e) => {
      const rect = heroShowcase.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || "0.05");
        const translateX = -x * 40 * depth;
        const translateY = -y * 40 * depth;
        layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    });
    heroShowcase.addEventListener("mouseleave", () => {
      phoneLayers.forEach(layer => {
        layer.style.transform = "translate3d(0,0,0)";
      });
    });
  }
  // Reveal Animations (نسخة محسّنة – تظهر بدري)
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // خلاص ظهر، ما نحتاج نراقبه
        }
      });
    },
    {
      threshold: 0.08,              // 8% من العنصر تكفي ليبدأ الأنيميشن
      rootMargin: "0px 0px -25% 0px" // يبدأ وهو أعلى من أسفل الشاشة
    }
  );

  revealElements.forEach((el) => observer.observe(el));


  // مودال الرسالة
  const modal = document.getElementById("messageModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalIcon = document.getElementById("modalIcon");
  const modalClose = document.getElementById("modalClose");

  function openModal(type, title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.classList.toggle("error", type !== "success");
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  }
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // إرسال الفورم بـ Fetch (يتوقع send_email.php يرجع JSON)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute("action") || "send_email.php";

      fetch(actionUrl, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          openModal("success", "تم إرسال رسالتك ✨", data.message || "شكرًا لتواصلك، سنرد عليك قريبًا.");
          contactForm.reset();
        } else {
          openModal("error", "خطأ أثناء الإرسال", data.message || "تعذر إرسال الرسالة، يرجى المحاولة مرة أخرى.");
        }
      })
      .catch(() => {
        openModal("error", "مشكلة في الاتصال", "تعذر الاتصال بالخادم حاليًا، حاول مجددًا لاحقًا.");
      });
    });
  } 
