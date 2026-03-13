// Scroll-triggered reveal for technique cards
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.technique').forEach(function(el) {
    observer.observe(el);
  });

  // Phase switcher for handbook techniques (if embedded)
  if (typeof showPhase === 'function') {
    return;
  }
  window.showPhase = function(techniqueId, phaseNum) {
    const container = document.getElementById(techniqueId + '-phases');
    if (!container) return;
    const svgs = container.querySelectorAll('svg');
    svgs.forEach(function(svg, i) {
      svg.style.display = (i === phaseNum - 1) ? 'block' : 'none';
    });
    const card = document.getElementById(techniqueId);
    if (card) {
      const btns = card.querySelectorAll('.phase-btn');
      btns.forEach(function(btn, i) {
        btn.classList.toggle('active', i === phaseNum - 1);
      });
    }
  };

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
