const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const sections = document.querySelectorAll("main section");
const navAnchors = document.querySelectorAll(".nav-links a");
const currentYear = document.getElementById("currentYear");
const typingText = document.getElementById("typingText");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectButtons = document.querySelectorAll(".project-btn");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalDesc = document.getElementById("modalDesc");
const counters = document.querySelectorAll(".counter");
const contactForm = document.getElementById("contactForm");
const thankYouPopup = document.getElementById("thankYouPopup");
const rippleButtons = document.querySelectorAll(".ripple-btn");

const setMenuExpanded = (expanded) => {
  menuBtn?.setAttribute("aria-expanded", expanded ? "true" : "false");
};

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    setMenuExpanded(navLinks.classList.contains("show"));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks?.classList.remove("show");
    setMenuExpanded(false);
  });
});

document.addEventListener("click", (event) => {
  if (!menuBtn || !navLinks || !navLinks.classList.contains("show")) {
    return;
  }
  const clickInsideMenu = navLinks.contains(event.target);
  const clickOnButton = menuBtn.contains(event.target);
  if (!clickInsideMenu && !clickOnButton) {
    navLinks.classList.remove("show");
    setMenuExpanded(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (navLinks?.classList.contains("show")) {
      navLinks.classList.remove("show");
      setMenuExpanded(false);
    }
    if (modal?.classList.contains("show")) {
      closeModal();
    }
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((anchor) => {
          anchor.classList.remove("active");
          const hash = anchor.getAttribute("href")?.replace("#", "");
          if (hash === entry.target.id) {
            anchor.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => sectionObserver.observe(section));

const typingPhrases = [
  "AI • IoT • IEEE • ECE • CSE • IT Projects with Full Documentation",
  "Mini Projects • Final Year Projects • Working Model + Source Code",
  "Report • PPT • Viva Support • End-to-End Project Guidance",
];

let typingIndex = 0;
let charIndex = 0;
let deleting = false;

const typeLoop = () => {
  if (!typingText) {
    return;
  }

  const current = typingPhrases[typingIndex];
  if (!deleting) {
    charIndex += 1;
    typingText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    typingText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 28 : 48);
};

if (typingText) {
  typeLoop();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filterValue = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filterValue === "all" || category === filterValue;
      card.classList.toggle("hide", !show);
    });
  });
});

const openModal = (title, tech, desc) => {
  if (!modal || !modalTitle || !modalTech || !modalDesc) {
    return;
  }
  modalTitle.textContent = title;
  modalTech.textContent = `Tech Stack: ${tech}`;
  modalDesc.textContent = desc;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!modal) {
    return;
  }
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
};

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.title, button.dataset.tech, button.dataset.desc);
  });
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target || 0);
  const duration = 1100;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = String(value);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  if (!thankYouPopup) {
    return;
  }
  thankYouPopup.classList.add("show");
  thankYouPopup.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    thankYouPopup.classList.remove("show");
    thankYouPopup.setAttribute("aria-hidden", "true");
  }, 2400);
});

rippleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
