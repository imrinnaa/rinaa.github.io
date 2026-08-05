// =====================================================
// DOKUMENTASI: JavaScript Portfolio Interactive
// Fitur: Scroll animations, typing effect, form handling
// Mudah dipahami untuk beginner!
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  // ===== 1. FADE-UP ANIMATION UNTUK ELEMEN =====
  // Membuat elemen muncul dengan animasi fade up saat page load
  const fadeElements = document.querySelectorAll('.fade-up');

  if (fadeElements.length > 0) {
    // Tunggu 300ms kemudian trigger animasi
    setTimeout(() => {
      fadeElements.forEach((el, index) => {
        el.style.animation = `fadeUp 0.6s ease-out forwards`;
        el.style.animationDelay = `${index * 0.1}s`;
      });
    }, 100);
  }

  // ===== 2. SCROLL PROGRESS BAR =====
  // Progress bar yang menunjukkan seberapa jauh user scroll
  const progressBar = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ===== 3. STICKY NAVBAR & ACTIVE NAV LINK =====
  // Navbar berubah warna saat di-scroll
  const navbar = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function updateNavbar() {
    if (!navbar) return;

    const scrollTop = window.scrollY;

    // Navbar sticky effect
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link based on scroll position
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update nav link active state
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // Run on page load

  // Auto close mobile menu saat link diklik
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, {
          toggle: true,
        });
        bsCollapse.hide();
      }
    });
  });

  // ===== 4. TYPING TEXT EFFECT =====
  // Efek ketik untuk hero section
  const typingText = document.getElementById('typing-text');
  const words = ['Web Developer 💻', 'UI/UX Enthusiast 🎨', 'Problem Solver 🔧', 'Tech Lover 🚀'];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);

    typingText.textContent = currentText;

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    // Jika kata selesai diketik
    if (!isDeleting && charIndex === currentWord.length) {
      // Tunggu 2 detik sebelum mulai menghapus
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }

    // Jika kata selesai dihapus
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Pindah ke kata berikutnya
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 400);
      return;
    }

    // Kecepatan ketik
    const typeSpeed = isDeleting ? 50 : 80;
    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  if (typingText) {
    typeEffect();
  }

  // ===== 5. MOUSE GLOW EFFECT =====
  // Efek cahaya yang mengikuti mouse (hanya di desktop)
  const mouseGlow = document.getElementById('mouse-glow');
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  if (mouseGlow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true },
    );

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      mouseGlow.style.left = glowX + 'px';
      mouseGlow.style.top = glowY + 'px';

      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  // ===== 6. 3D TILT EFFECT UNTUK CARDS =====
  // Kartu bergerak ketika hover (hanya di desktop)
  if (window.matchMedia('(hover: hover)').matches) {
    const tiltCards = document.querySelectorAll('.project-card, .about-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // ===== 7. BACK TO TOP BUTTON =====
  // Tombol scroll ke atas yang muncul saat scroll
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 400) {
        backToTopBtn?.classList.add('show');
      } else {
        backToTopBtn?.classList.remove('show');
      }
    },
    { passive: true },
  );

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ===== 8. CONTACT FORM HANDLING =====
  // Handle form submission dan validasi
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('successAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Ambil nilai form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simple validation
      if (!name || !email || !message) {
        alert('Mohon lengkapi semua field!');
        return;
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
      }

      // Tampilkan success message
      if (successAlert) {
        successAlert.classList.remove('d-none');

        // Scroll ke alert
        successAlert.scrollIntoView({ behavior: 'smooth' });

        // Sembunyikan alert setelah 5 detik
        setTimeout(() => {
          successAlert.classList.add('d-none');
        }, 5000);
      }

      // Reset form
      contactForm.reset();

      // TIPS: Di sini Anda bisa menambahkan:
      // - Send ke backend/API
      // - Save ke Google Sheets (seperti di referensi)
      // - Send email notification
      console.log('Form submitted:', { name, email, message });
    });
  }

  // ===== 9. SMOOTH SCROLL LINKS =====
  // Smooth scroll saat klik link anchor
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip jika href hanya "#"
      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // ===== 10. PRELOAD ANIMATIONS =====
  // Trigger fade-up animations immediately jika user sudah scroll
  function triggerVisibleAnimations() {
    const elements = document.querySelectorAll('.fade-up');

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  triggerVisibleAnimations();
});

// =====================================================
// TIPS UNTUK DEVELOPMENT LEBIH LANJUT:
// =====================================================
// 1. Untuk form submission ke Google Sheets:
//    - Gunakan Google Apps Script
//    - Buat web endpoint untuk menerima POST request
//    - Copy scriptURL dari Apps Script deployment
//
// 2. Untuk menambah lebih banyak effects:
//    - Gunakan Intersection Observer API untuk animations
//    - Tambah AOS library (Animate On Scroll)
//    - Custom gsap animations
//
// 3. Performance optimization:
//    - Lazy load images
//    - Minify CSS & JS
//    - Use CDN untuk fonts dan libraries
//
// 4. Accessibility:
//    - Tambah alt text untuk images
//    - Ensure color contrast ratio
//    - Test dengan screen readers
// =====================================================
