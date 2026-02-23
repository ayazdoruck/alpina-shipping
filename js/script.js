// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const nav = document.querySelector('.nav-menu');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose && nav) {
    menuClose.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close menu on link click
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Dynamic Scroll Transitions
const header = document.querySelector('.header');
const logo = document.querySelector('.logo');
const navMenu = document.querySelector('.nav-menu');
const isHome = window.location.pathname.includes('index.html') ||
    window.location.pathname.endsWith('/') ||
    window.location.pathname === '' ||
    (!window.location.pathname.includes('.html') && !window.location.pathname.includes('.asp'));

function updateTransitions() {
    const isMobile = window.innerWidth <= 1024;
    const scrollY = window.scrollY;

    if (isMobile) {
        if (header) {
            if (scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
        // Reset logo/nav styles for mobile
        if (logo) {
            logo.style = '';
        }
        if (navMenu && !navMenu.classList.contains('active')) {
            navMenu.style.transform = '';
        }
        return;
    }

    const heroHeight = window.innerHeight * 0.6;
    const progress = Math.min(scrollY / heroHeight, 1);

    if (!isHome) {
        if (header) header.classList.add('scrolled');
        if (logo) {
            logo.style.top = '35px';
            logo.style.left = '40px';
            logo.style.transform = 'translateY(-50%) scale(1)';
        }
        if (navMenu) navMenu.style.transform = 'translateX(400px)';
        return;
    }

    // Positions for Home Page Interpolation
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const startX = viewportWidth / 2;
    const startY = viewportHeight / 2;

    const finalCenterX = 100;
    const finalCenterY = 35;

    const currentX = startX + (progress * (finalCenterX - startX));
    const currentY = startY + (progress * (finalCenterY - startY));
    const scale = 2.5 - (progress * 1.5);

    if (progress >= 1) {
        if (header) header.classList.add('scrolled');
        if (logo) {
            logo.style.top = '35px';
            logo.style.left = '40px';
            logo.style.transform = 'translateY(-50%) scale(1)';
        }
    } else {
        if (header) header.classList.remove('scrolled');
        if (logo) {
            logo.style.top = `${currentY}px`;
            logo.style.left = `${currentX}px`;
            logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    }

    const navOffset = progress * 400;
    if (navMenu) navMenu.style.transform = `translateX(${navOffset}px)`;
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateTransitions);
});

window.addEventListener('resize', updateTransitions);

// Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-advance slider
let sliderInterval = setInterval(() => {
    if (slides.length) changeSlide(1);
}, 8000);

// Stop auto-slider on manual interaction
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => clearInterval(sliderInterval));
});

// Reveal animations on scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .section, .showcase-item, .team-card, .service-detail-block').forEach(el => {
    revealObserver.observe(el);
});

// Initial trigger
updateTransitions();
if (window.lucide) lucide.createIcons();
