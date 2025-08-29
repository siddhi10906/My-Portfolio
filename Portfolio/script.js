// Mobile menu functionality
function toggleMenu() {
    const navMobile = document.querySelector('.nav-mobile');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMobile.classList.toggle('show');
    menuToggle.classList.toggle('active');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const navMobile = document.querySelector('.nav-mobile');
    const menuToggle = document.querySelector('.menu-toggle');
    navMobile.classList.remove('show');
    menuToggle.classList.remove('active');
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    // Simulate form submission
    showToast(`Thanks ${name}, I'll get back to you soon!`);
    
    // Reset form
    e.target.reset();
});

// Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Header scroll effect
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
    } else {
        header.style.background = 'rgba(15, 20, 25, 0.8)';
    }
}

// Intersection Observer for animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.card, .project-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Smooth reveal animations
function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .project-card, .hero-buttons');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
    
    // Hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });
    
    // Hover effects for skill badges
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.background = '#3b82f6';
            badge.style.color = 'white';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.background = 'var(--bg-secondary)';
            badge.style.color = 'var(--text-primary)';
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelector('.nav-mobile').classList.remove('show');
        document.querySelector('.menu-toggle').classList.remove('active');
    }
});

// Prevent right-click on images
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
    handleScroll();
    revealOnScroll();
    ticking = false;
}
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}
window.addEventListener('scroll', requestTick);
window.addEventListener('load', revealOnScroll);
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent actual form submission for demo

  // Show notification
  const notification = document.getElementById("formNotification");
  notification.style.display = "block";

  // Hide again after 3 seconds
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);

  // Reset form fields
  this.reset();
});
