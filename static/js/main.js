/**
 * NetConnect Solutions - Main JavaScript File
 * Updated: Navbar always visible, shadow on scroll, flash messages, animations
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('NetConnect Solutions website loaded successfully');

    // --- Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll animations ---
    function checkScroll() {
        const elements = document.querySelectorAll('.service-card, .contact-info, .value-icon, .service-area-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // --- Update copyright year ---
    const yearElement = document.querySelector('#currentYear') || document.querySelector('#year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // --- Navbar shadow on scroll (always visible) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.style.boxShadow = scrollTop > 10 ? '0 4px 12px rgba(0,0,0,0.08)' : 'none';
        navbar.style.transform = 'translateY(0)'; // always visible
    });

    // --- Active nav link highlighting ---
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active', 'text-white', 'bg-primary');
            link.classList.add('text-dark');

            const linkPath = link.getAttribute('href');
            if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
                link.classList.add('active', 'text-white');
                link.classList.remove('text-dark');
            }
        });
    }
    setActiveNavLink();

    // --- Flash messages handling ---
    function showFlashMessages() {
        const flashContainer = document.createElement('div');
        flashContainer.className = 'flash-messages';
        document.body.appendChild(flashContainer);

        const flashMessages = document.querySelectorAll('.alert-flash');
        flashMessages.forEach(message => {
            flashContainer.appendChild(message);

            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => message.remove(), 300);
            }, 5000);
        });
    }
    showFlashMessages();

    // --- Card hover effects ---
    document.querySelectorAll('.card, .service-card, .contact-info').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    // --- Parallax effect for hero section ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
});
