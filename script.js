// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Stats counter animation function
function animateStat(statElement) {
    if (statElement.classList.contains('counted')) return;
    
    statElement.classList.add('counted');
    const target = parseInt(statElement.getAttribute('data-target'));
    
    if (isNaN(target) || target === 0) return;
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const showPlus = target >= 10;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            statElement.textContent = target + (showPlus ? '+' : '');
            clearInterval(timer);
        } else {
            statElement.textContent = Math.floor(current);
        }
    }, 16);
}

// Stats counter initialization
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        // Retry after a short delay if elements aren't found yet
        setTimeout(initStatsCounter, 100);
        return;
    }

    const statsSection = document.querySelector('.stats');
    
    // Check if stats section is visible on page load
    const checkVisibility = () => {
        if (!statsSection) return false;
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight && rect.bottom > 0;
    };

    // Always set up IntersectionObserver as backup
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                // Stop observing once animated
                statsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Start observing all stats
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
        
        // Also check immediately if already visible
        if (checkVisibility()) {
            // Use requestAnimationFrame to ensure DOM is fully rendered
            requestAnimationFrame(() => {
                if (checkVisibility() && !stat.classList.contains('counted')) {
                    animateStat(stat);
                }
            });
        }
    });
}

// Observe service cards and contact items
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    [...serviceCards, ...contactItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Initialize stats counter
    initStatsCounter();
});

// Also try initializing on window load as a fallback
window.addEventListener('load', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('counted')) {
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateStat(stat);
                }
            }
        }
    });
});

