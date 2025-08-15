// Testimonials functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Auto-rotate testimonials
function autoRotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Start auto-rotation
setInterval(autoRotateTestimonials, 5000);

// Scroll to top functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleScrollToTopButton);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery pagination functionality
const galleryDots = document.querySelectorAll('.gallery-pagination .pagination-dot');
const galleryTrack = document.getElementById('galleryTrack');

galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        galleryDots.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Pause animation temporarily
        galleryTrack.style.animationPlayState = 'paused';
        
        // Resume animation after a short delay
        setTimeout(() => {
            galleryTrack.style.animationPlayState = 'running';
        }, 2000);
    });
});

// Newsletter subscription
const newsletterInput = document.querySelector('.newsletter-input');

if (newsletterInput) {
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const email = this.value.trim();
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                this.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Product hover effects
const shopButtons = document.querySelectorAll('.shop-button');

shopButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Color swatch interactions
const colorSwatches = document.querySelectorAll('.swatch');

colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
        // Remove active class from siblings
        const siblings = this.parentNode.querySelectorAll('.swatch');
        siblings.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked swatch
        this.classList.add('active');
        
        // Add visual feedback
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Room category hover effects
const roomCards = document.querySelectorAll('.room-card');

roomCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.product-section, .about-card, .room-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu functionality (if needed)
function toggleMobileMenu() {
    const navLeft = document.querySelector('.nav-left');
    navLeft.classList.toggle('mobile-open');
}

// Add mobile menu styles dynamically
const mobileStyles = `
    @media (max-width: 768px) {
        .nav-left {
            position: fixed;
            top: 0;
            left: -100%;
            width: 250px;
            height: 100vh;
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 60px 20px 20px;
            transition: left 0.3s ease;
            z-index: 1000;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        .nav-left.mobile-open {
            left: 0;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;

// Add mobile styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial testimonial
    showTestimonial(0);
    
    // Initialize scroll button visibility
    toggleScrollToTopButton();
    
    console.log('Woodendot website initialized successfully!');
});