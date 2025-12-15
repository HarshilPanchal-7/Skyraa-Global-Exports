/* =============================================
   SKYRAA GLOBAL EXPORT - MASTER BLASTER PREMIUM JS
   Ultra-smooth animations & premium interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =============================================
  // SMOOTH HEADER SCROLL EFFECT
  // =============================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  let ticking = false;

function handleScroll() {
  if (ticking) return;

  ticking = true;

  requestAnimationFrame(() => {
    const currentScroll = window.scrollY;

    header.classList.toggle('scrolled', currentScroll > 50);
    header.classList.toggle(
      'header-hidden',
      currentScroll > lastScroll && currentScroll > 300
    );

    lastScroll = currentScroll;
    ticking = false;
  });
}



  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =============================================
  // MOBILE MENU TOGGLE
  // =============================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // =============================================
  // PREMIUM SCROLL REVEAL
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
     if (entry.isIntersecting) {
  entry.target.classList.add('active');
  revealObserver.unobserve(entry.target); // 🔥 REQUIRED
}

    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // TRUST STATEMENTS CAROUSEL
  // =============================================
  const trustStatements = [
    "Building Trust Through Quality Since 2005",
    "Your Reliable Partner in Global Trade",
    "From Indian Farms to World Markets",
    "Excellence in Every Grain, Every Spice",
    "Committed to Sustainable & Ethical Sourcing"
  ];

  const trustElement = document.querySelector('.trust-statement');
  const trustDots = document.querySelectorAll('.trust-dot');
  let currentIndex = 0;

  function updateTrustStatement() {
    if (!trustElement) return;
    
    // Fade out
    trustElement.style.opacity = '0';
    trustElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % trustStatements.length;
      trustElement.textContent = trustStatements[currentIndex];
      
      // Update dots
      trustDots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
      
      // Fade in
      trustElement.style.opacity = '1';
      trustElement.style.transform = 'translateY(0)';
    }, 400);
  }

  if (trustElement) {
    trustElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    setInterval(updateTrustStatement, 5000);
  }

  // =============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // =============================================
  // ACTIVE NAV LINK
  // =============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes(currentPage) || (currentPage === '' && href.includes('index')))) {
      link.classList.add('active');
    }
  });

  // =============================================
  // PARALLAX EFFECT FOR HERO
  // =============================================
  const heroSection = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg img');

  if (heroSection && heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const parallax = scrolled * 0.3;
        heroBg.style.transform = `scale(1.05) translateY(${parallax}px)`;
      }
    }, { passive: true });
  }

  // =============================================
  // MAGNETIC BUTTON EFFECT
  // =============================================
  const magneticBtns = document.querySelectorAll('.btn:not(.no-magnetic)');

  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // =============================================
  // CARD TILT EFFECT
  // =============================================
  const tiltCards = document.querySelectorAll('.spice-card, .category-card, .product-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =============================================
  // STATS COUNTER ANIMATION
  // =============================================
  const stats = document.querySelectorAll('.hero-stat-value, .reach-stat-value');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (!isNaN(number) && number > 0) {
          animateValue(el, 0, number, 2000, suffix);
        }
        
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  function animateValue(el, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      el.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // =============================================
  // GOOGLE FORM CONTACT FORM
  // =============================================
  const contactForm = document.getElementById('contact-form');
  const iframe = document.getElementById('hidden_iframe');
  let submitted = false;

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const fd = new FormData(contactForm);

      // Required fields check
      if (
        !fd.get('entry.1996587135') || // Full Name
        !fd.get('entry.1442830161') || // Email
        !fd.get('entry.1297814115')    // Message
      ) {
        e.preventDefault();
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const email = fd.get('entry.1442830161');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Allow Google Form submission
      submitted = true;
      const btn = contactForm.querySelector('button');
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    });
  }

  // Success after Google Form loads
  if (iframe) {
    iframe.addEventListener('load', function () {
      if (!submitted) return;

      showNotification('Thank you! Your message has been sent.', 'success');
      contactForm.reset();

      const btn = contactForm.querySelector('button');
      btn.disabled = false;
      btn.textContent = 'Send Message';

      submitted = false;
    });
  }

  // =============================================
  // PREMIUM NOTIFICATION
  // =============================================
  function showNotification(msg, type) {
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = msg;

    const bgColor = type === 'success' 
      ? 'linear-gradient(135deg, hsl(152, 50%, 35%), hsl(152, 45%, 45%))' 
      : 'linear-gradient(135deg, hsl(0, 70%, 50%), hsl(0, 60%, 40%))';

    n.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: ${bgColor};
      color: #fff;
      padding: 1.25rem 2rem;
      border-radius: 12px;
      z-index: 9999;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
    `;

    document.body.appendChild(n);
    
    // Trigger animation
    requestAnimationFrame(() => {
      n.style.opacity = '1';
      n.style.transform = 'translateY(0) scale(1)';
    });

    // Auto dismiss
    setTimeout(() => {
      n.style.opacity = '0';
      n.style.transform = 'translateY(30px) scale(0.95)';
      setTimeout(() => n.remove(), 500);
    }, 5000);
  }

  // =============================================
  // CURSOR GLOW EFFECT (Optional - Premium touch)
  // =============================================
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, hsla(38, 85%, 55%, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: -9999; /* 🔥 IMPORTANT */
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  opacity: 0;
`;

  document.body.appendChild(cursor);

  let cursorTimeout;
 document.addEventListener('mousemove', (e) => {
  if (e.target.closest('input, textarea, select, form')) {
    cursor.style.opacity = '0';
    return;
  }

  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.opacity = '1';

  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    cursor.style.opacity = '0';
  }, 1000);
});


  // =============================================
  // PRELOADER (Optional)
  // =============================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  });

  // =============================================
  // LAZY LOAD IMAGES
  // =============================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // =============================================
  // KEYBOARD NAVIGATION
  // =============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  console.log('🚀 Skyraa Global Export - Master Blaster Premium Loaded!');
});
