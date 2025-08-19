// Scroll-triggered fade-in animations
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.animation = "fadeInUp 1s ease forwards";
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader, index) => {
    fader.style.animationDelay = `${index * 0.2}s`; // stagger effect
    appearOnScroll.observe(fader);
  });

  // Typewriter effect for tagline
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = "";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // Button ripple effect
  document.querySelectorAll(".btn, .btn-outline").forEach(button => {
    button.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      circle.classList.add("ripple");
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // Parallax effect for hero background
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    let offset = window.scrollY;
    if (hero) {
      hero.style.backgroundPositionY = offset * 0.4 + "px";
    }
  });

  // Skills pop-in animation
  const skillsList = document.querySelectorAll(".skills li");
  const skillsSection = document.querySelector("#about");

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      skillsList.forEach((skill, i) => {
        skill.style.opacity = "0";
        setTimeout(() => {
          skill.style.opacity = "1";
          skill.style.transform = "scale(1)";
        }, i * 150);
      });
      observer.unobserve(skillsSection);
    });
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);

  // Profile picture pop-in + floating effect
const profilePic = document.querySelector(".profile-pic");
const aboutSection = document.querySelector("#about");

const profileObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    // Run pop-in first
    profilePic.style.animation = "popIn 0.8s ease forwards";
    
    // Start floating after pop-in finishes
    setTimeout(() => {
      profilePic.style.opacity = "1";
      profilePic.classList.add("float");
    }, 800);

    observer.unobserve(aboutSection);
  });
}, { threshold: 0.4 });

profileObserver.observe(aboutSection);
});
