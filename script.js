// Function for scroll-based animations
const sections = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    rootMargin: '0px',
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Typing animation for the hero text
const heroText = "Hello, I'm <span class='highlight'>Jeanne!</span>";
const heroElement = document.querySelector('.animated-text');
let charIndex = 0;

function typeWriter() {
  if (charIndex < heroText.length) {
    if (heroText.charAt(charIndex) === '<') {
      const tagEnd = heroText.indexOf('>', charIndex);
      heroElement.innerHTML += heroText.substring(charIndex, tagEnd + 1);
      charIndex = tagEnd + 1;
    } else {
      heroElement.innerHTML += heroText.charAt(charIndex);
      charIndex++;
    }
    setTimeout(typeWriter, 50); // Adjust speed here
  }
}

// Start the typing animation after the header animation
window.addEventListener('load', () => {
  setTimeout(() => {
    heroElement.innerHTML = '';
    typeWriter();
  }, 1000); // Delay start to sync with header animation
});