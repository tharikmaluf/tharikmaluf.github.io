// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// CTA button smooth scroll
document.querySelector(".cta-button").addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Header background on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".skill-card, .case-study-card, .timeline-item, .stat-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});

// Add loading animation to buttons
document.querySelectorAll(".cta-button, .submit-button").forEach(button => {
    button.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-2px)";
    });
    
    button.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
    });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image");
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes("+") ? "+" : "") + (element.textContent.includes("%") ? "%" : "");
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes("+") ? "+" : "") + (element.textContent.includes("%") ? "%" : "");
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll(".stat-item h3");
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseFloat(text);
                if (!isNaN(number)) {
                    item.textContent = "0" + (text.includes("+") ? "+" : "") + (text.includes("%") ? "%" : "");
                    animateCounter(item, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Add hover effects to timeline items
document.querySelectorAll(".timeline-content").forEach(item => {
    item.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-5px) scale(1.02)";
    });
    
    item.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    revealObserver.observe(section);
});

// Add CSS for revealed sections
const style = document.createElement("style");
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
