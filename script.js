// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize active section tracking
    initActiveSectionTracking();
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update menu icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'lucide lucide-x';
            } else {
                icon.className = 'lucide lucide-menu';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'lucide lucide-menu';
            });
        });
    }
}

// Theme Toggle
function initThemeToggle() {
    if (themeToggle) {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'lucide lucide-sun';
    } else {
        icon.className = 'lucide lucide-moon';
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active Section Tracking
function initActiveSectionTracking() {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const { offsetTop, offsetHeight } = section;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    // Remove active class from all links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Get error elements
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const formSuccess = document.getElementById('form-success');
            
            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            formSuccess.textContent = '';
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                formSuccess.textContent = 'Thank you! I\'ll get back to you soon.';
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formSuccess.textContent = '';
                }, 5000);
            }
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add animation classes to elements when they come into view
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.card, .skill-card, .project-card, .exp-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimations();
});

// Add hover effects for skill cards
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.className = 'lucide lucide-menu';
        }
    }
    
    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && document.activeElement.type === 'submit') {
        document.activeElement.click();
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    // Add touch-specific styles or behaviors here
    document.body.classList.add('touch-device');
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Add console log for debugging (remove in production)
console.log('Portfolio website loaded successfully!'); 