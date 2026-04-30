// KILL CURSORS ON MOBILE
const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
if (isTouch) {
  document.querySelectorAll('body > div').forEach(el => {
    const s = el.style;
    if (s.position === 'fixed' && s.borderRadius === '50%' && s.pointerEvents === 'none' && parseInt(s.zIndex) > 9990) el.remove();
  });
  window.isTouchDevice = true;
}

const overlay = document.getElementById('page-transition');

// ENTRATA
if (typeof gsap !== 'undefined' && overlay) {
  gsap.fromTo(overlay, { opacity: 1, x: 0 }, { opacity: 0, x: '-100%', duration: 0.6, ease: 'power3.inOut', delay: 0.1 });
}

// USCITA — click su link interno
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
  link.addEventListener('click', function(e) {
    if (!overlay || typeof gsap === 'undefined') return;
    e.preventDefault();
    const target = this.href;
    gsap.fromTo(overlay,
      { opacity: 0, x: '100%' },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.inOut', onComplete: () => { window.location.href = target; } }
    );
  });
});

// TEXT REVEAL HERO
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  const lines = document.querySelectorAll('.reveal-inner');
  if (lines.length > 0) {
    gsap.from(lines, { y: '105%', duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.3 });
  }
});

// CUSTOM CURSOR (desktop only)
const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
if (!isTouchDevice) {
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  cursor.style.cssText = `width:36px;height:36px;border:1px solid #C9B98A;border-radius:50%;position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .3s ease,height .3s ease,border-color .3s ease,background .3s ease;mix-blend-mode:difference;`;
  cursorDot.style.cssText = `width:5px;height:5px;background:#C9B98A;border-radius:50%;position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:transform .1s ease;`;
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; });
  (function animateCursor() { curX += (mouseX - curX) * 0.12; curY += (mouseY - curY) * 0.12; cursor.style.left = curX + 'px'; cursor.style.top = curY + 'px'; requestAnimationFrame(animateCursor); })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '64px'; cursor.style.height = '64px'; cursor.style.background = 'rgba(201,185,138,0.15)'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '36px'; cursor.style.height = '36px'; cursor.style.background = 'transparent'; });
  });
}

// PARALLAX HERO
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => { heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`; });
}

// SCROLL REVEAL
if (typeof gsap !== 'undefined') {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => { gsap.set(el, { y: 60, opacity: 0 }); observer.observe(el); });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const isTouchDev = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

  // SERVICES HORIZONTAL SCROLL (desktop)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const servicesTrack = document.querySelector('.services-track');
    if (servicesTrack && window.innerWidth >= 768) {
      const totalWidth = servicesTrack.scrollWidth - window.innerWidth;
      gsap.to(servicesTrack, {
        x: -totalWidth, ease: 'none',
        scrollTrigger: {
          trigger: '.services-horizontal',
          start: 'top top',
          end: () => '+=' + totalWidth,
          scrub: 1, pin: true, anticipatePin: 1
        }
      });
    }
  }

  // TICKER
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack && typeof gsap !== 'undefined') {
    const clone = tickerTrack.cloneNode(true);
    tickerTrack.parentElement.appendChild(clone);
    gsap.to([tickerTrack, clone], { xPercent: -100, duration: 26, ease: 'none', repeat: -1 });
  }

  // REMOVE CURSORS ON TOUCH
  if (isTouchDev) {
    document.querySelectorAll('body > div').forEach(el => {
      const s = el.style;
      if (s.position === 'fixed' && s.borderRadius === '50%' && s.pointerEvents === 'none') el.remove();
    });
  }

  // PORTFOLIO HOVER
  if (typeof gsap !== 'undefined') {
    document.querySelectorAll('.portfolio-card').forEach(card => {
      const img = card.querySelector('img');
      const ov = card.querySelector('.portfolio-overlay');
      if (!img || !ov) return;
      card.addEventListener('mouseenter', () => { gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' }); gsap.to(ov, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }); });
      card.addEventListener('mouseleave', () => { gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' }); gsap.to(ov, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' }); });
    });
  }

  // MAGNETIC BUTTONS
  if (typeof gsap !== 'undefined') {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        gsap.to(this, { x: (e.clientX - rect.left - rect.width / 2) * 0.35, y: (e.clientY - rect.top - rect.height / 2) * 0.35, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function() { gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }); });
    });
  }

  // WHATSAPP BUTTON FISSO
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/393270294375?text=Salve%2C%20vorrei%20richiedere%20un%20preventivo';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Contattaci su WhatsApp');
  wa.style.cssText = 'position:fixed;bottom:24px;right:24px;width:52px;height:52px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:9990;box-shadow:0 4px 20px rgba(37,211,102,0.4);transition:transform .2s ease,box-shadow .2s ease;';
  wa.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  wa.addEventListener('mouseenter', () => { wa.style.transform = 'scale(1.1)'; wa.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)'; });
  wa.addEventListener('mouseleave', () => { wa.style.transform = 'scale(1)'; wa.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'; });
  document.body.appendChild(wa);
});
