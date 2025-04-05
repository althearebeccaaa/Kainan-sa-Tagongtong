document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    // ===== MOBILE MENU FUNCTIONALITY =====
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('show');
        this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && e.target !== mobileToggle) {
            nav.classList.remove('show');
            mobileToggle.classList.remove('active');
        }
    });

    // Hero section animation
    const heroContent = document.querySelector('.about-hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Story section animation
    const storySection = document.querySelector('.story-section');
    if (storySection) {
        storySection.style.opacity = '0';
        storySection.style.transition = 'all 0.8s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    storySection.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(storySection);
    }

    // Gallery animation
    const galleryImages = document.querySelectorAll('.grid-gallery img');
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(img);
    });

    // Values section animation
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });

    // CTA section animation
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.style.opacity = '0';
        ctaSection.style.transition = 'all 0.8s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaSection.style.opacity = '1';
                    
                    // Animate buttons with slight delay
                    const buttons = document.querySelectorAll('.cta-buttons .btn');
                    buttons.forEach((btn, i) => {
                        btn.style.opacity = '0';
                        btn.style.transform = 'translateY(20px)';
                        btn.style.transition = `all 0.5s ease-out ${i * 0.2 + 0.3}s`;
                        
                        setTimeout(() => {
                            btn.style.opacity = '1';
                            btn.style.transform = 'translateY(0)';
                        }, 300 + (i * 200));
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(ctaSection);
    }

    // Footer animation
    const footer = document.querySelector('.main-footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transition = 'all 0.8s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(footer);
    }

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});

// Add these CSS animations to your about.css:
/*

*/