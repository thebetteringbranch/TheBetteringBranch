document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("mobile");
    navLinks.classList.toggle("show");
	hamburger.classList.toggle("open"); // Ensure it toggles into a cross (✖)
  });

  // Carousel Functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.remove("active");
      if (i === index) {
        item.classList.add("active");
      }
    });
  }

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }, 5000);
});

// Sparkle madness
function createSparklesFor(element) {
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Random position within the element
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    // Random delay offset so they're not synced
    sparkle.style.animationDelay = `${Math.random() * 2}s`;

    element.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
      sparkle.remove();
    }, 1500);
  }, 200); // New sparkle every 200ms
}

// Attach to all .top-winner cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.top-winner').forEach((card) => {
    createSparklesFor(card);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".home-m-item");
  let current = 0;
  const max = items.length;

  setInterval(() => {
    items[current].classList.remove("active");
    current = (current + 1) % max;
    items[current].classList.add("active");
  }, 3000); // change every 3 seconds
});

/ ── Person SVG builder ──
function personSVG(w, h, bodyCol, headCol, type='adult') {
  if (type === 'elder') {
    // slightly hunched, with cane
    return `<svg width="${w}" height="${h}" viewBox="0 0 18 30">
      <circle cx="9" cy="5.5" r="4.5" fill="${headCol}"/>
      <path d="M4 30 Q3 20 9 17 Q15 20 14 30Z" fill="${bodyCol}"/>
      <line x1="13" y1="20" x2="16" y2="30" stroke="${bodyCol}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`;
  } else if (type === 'child') {
    // smaller, rounder head
    return `<svg width="${w}" height="${h}" viewBox="0 0 16 26">
      <circle cx="8" cy="5" r="5" fill="${headCol}"/>
      <path d="M3 26 Q3 16 8 14 Q13 16 13 26Z" fill="${bodyCol}"/>
    </svg>`;
  } else {
    return `<svg width="${w}" height="${h}" viewBox="0 0 18 30">
      <circle cx="9" cy="6" r="5.5" fill="${headCol}"/>
      <path d="M2 30 Q2 18 9 16 Q16 18 16 30Z" fill="${bodyCol}"/>
    </svg>`;
  }
}

// ── CARD 1: Volunteer person grid ──
// 30 figures × 20 = 600
const volGrid = document.getElementById('people-grid');
const volColours = [
  {b:'#52b788',h:'#74c69d'},
  {b:'#40916c',h:'#52b788'},
  {b:'#2d6a4f',h:'#40916c'},
  {b:'#74c69d',h:'#95d5b2'},
  {b:'#95d5b2',h:'#b7e4c7'},
  {b:'#1b4332',h:'#2d6a4f'},
];
for (let i = 0; i < 30; i++) {
  const c = volColours[i % volColours.length];
  const div = document.createElement('div');
  div.className = 'person-fig';
  div.style.transitionDelay = (i * 38) + 'ms';
  div.innerHTML = personSVG(20, 30, c.b, c.h, 'adult');
  volGrid.appendChild(div);
}

// ── CARD 2: Floating people around signal ──
const signalWrap = document.getElementById('signal-wrap');
const signalPeople = [
  {top:'8px',  left:'10px', type:'adult', b:'#74c0fc', h:'#a5d8ff'},
  {top:'8px',  right:'14px',type:'child', b:'#4dabf7', h:'#74c0fc'},
  {bottom:'12px',left:'16px',type:'elder',b:'#a5d8ff', h:'#c5f6fa'},
  {bottom:'12px',right:'12px',type:'adult',b:'#74c0fc',h:'#a5d8ff'},
  {top:'46%',  left:'2px',  type:'child', b:'#4dabf7', h:'#74c0fc'},
  {top:'46%',  right:'2px', type:'elder', b:'#a5d8ff', h:'#c5f6fa'},
];
signalPeople.forEach((p, i) => {
  const d = document.createElement('div');
  d.className = 'fp-icon';
  Object.entries(p).forEach(([k,v]) => { if(!['type','b','h'].includes(k)) d.style[k]=v; });
  d.innerHTML = personSVG(18, 26, p.b, p.h, p.type);
  d.style.animationPlayState = 'paused';
  signalWrap.appendChild(d);
});

// ── CARD 4: Community crowd ──
// Mix of elderly, children, adults — 40 figures
const crowdRow = document.getElementById('crowd-row');
const crowdTypes  = ['elder','child','adult','adult','child','elder','adult','child'];
const crowdColours = [
  {b:'#52b788',h:'#74c69d'},
  {b:'#95d5b2',h:'#b7e4c7'},
  {b:'#f4a261',h:'#f9c784'},
  {b:'#74c69d',h:'#95d5b2'},
  {b:'#ffd43b',h:'#ffe066'},
  {b:'#f08c77',h:'#f4a79a'},
  {b:'#b7e4c7',h:'#d8f3dc'},
  {b:'#52b788',h:'#95d5b2'},
];
for (let i = 0; i < 40; i++) {
  const type = crowdTypes[i % crowdTypes.length];
  const c    = crowdColours[i % crowdColours.length];
  const sz   = type === 'child' ? {w:14,h:22} : {w:16,h:26};
  const div  = document.createElement('div');
  div.className = 'crowd-fig';
  div.style.transitionDelay = (i * 35) + 'ms';
  div.innerHTML = personSVG(sz.w, sz.h, c.b, c.h, type);
  crowdRow.appendChild(div);
}

// ── Intersection observer: trigger all animations ──
let fired = false;
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });

  if (!fired && entries.some(e => e.isIntersecting)) {
    fired = true;

    // Count up
    setTimeout(() => {
      document.querySelectorAll('.counting').forEach(el => {
        const target = +el.dataset.target;
        const dur = 1800;
        const t0 = performance.now();
        const step = now => {
          const p = Math.min((now - t0) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1-p,3)) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(step);
      });
    }, 200);

    // Volunteer icons pop in
    document.querySelectorAll('.person-fig').forEach((el,i) => {
      setTimeout(() => el.classList.add('shown'), 300 + i*38);
    });

    // Elephant fill — animate clip rect from bottom (y=188) up to midpoint (y=102)
    setTimeout(() => {
      const rect = document.getElementById('eClipRect');
      if (!rect) return;
      const topY = 102, bottomY = 188, totalH = bottomY - topY;
      const dur = 1800, t0 = performance.now();
      (function animRect(now) {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const h = e * totalH;
        rect.setAttribute('y', bottomY - h);
        rect.setAttribute('height', h);
        if (p < 1) requestAnimationFrame(animRect);
      }(performance.now()));
    }, 500);

    // Signal floating people appear
    setTimeout(() => {
      document.querySelectorAll('.fp-icon').forEach(el => {
        el.classList.add('show');
        el.style.animationPlayState = 'running';
        el.style.opacity = '.9';
      });
    }, 400);

    // Crowd pop in
    document.querySelectorAll('.crowd-fig').forEach((el,i) => {
      setTimeout(() => el.classList.add('shown'), 500 + i*35);
    });
  }
}, { threshold: 0.18 });

document.querySelectorAll('.stat-card').forEach(c => obs.observe(c));
