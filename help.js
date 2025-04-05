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
    const heroContent = document.querySelector('.help-hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Contact methods animation
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    method.style.opacity = '1';
                    method.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(method);
    });

    // FAQ Accordion with enhanced animations
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Set initial state
        const answer = question.nextElementSibling;
        answer.style.maxHeight = '0';
        answer.style.padding = '0 20px';
        answer.style.transition = 'all 0.3s ease-out';
        
        question.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Animate icon
            const icon = this.querySelector('i');
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            
            // Animate answer
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 20px 20px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 20px';
            }
            
            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    const otherAnswer = q.nextElementSibling;
                    const otherIcon = q.querySelector('i');
                    
                    otherIcon.style.transform = 'rotate(0)';
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0 20px';
                }
            });
        });
    });

    // Form Validation with visual feedback
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Reset error states
            [name, email, subject, message].forEach(field => {
                field.style.borderColor = '';
            });
            
            // Validate fields
            let isValid = true;
            
            if (!name.value.trim()) {
                name.style.borderColor = 'var(--primary)';
                isValid = false;
            }
            
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.style.borderColor = 'var(--primary)';
                isValid = false;
            }
            
            if (!subject.value) {
                subject.style.borderColor = 'var(--primary)';
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.style.borderColor = 'var(--primary)';
                isValid = false;
            }
            
            if (!isValid) {
                // Shake animation for error feedback
                this.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                `;
                contactForm.prepend(successMsg);
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Fade in success message
                setTimeout(() => {
                    successMsg.style.opacity = '1';
                    successMsg.style.transform = 'translateY(0)';
                }, 10);
                
                // Remove success message after delay
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    successMsg.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 300);
                }, 3000);
            }, 1500);
        });
    }

    // Search Functionality with animation
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            // Shake animation for empty search
            searchInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                searchInput.style.animation = '';
            }, 500);
            return;
        }
        
        // Show loading state
        const originalHtml = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;
        
        // Simulate search (replace with actual search implementation)
        setTimeout(() => {
            // Reset button
            searchBtn.innerHTML = originalHtml;
            searchBtn.disabled = false;
            
            // Show search results (in a real implementation, you would display actual results)
            const noResults = document.createElement('div');
            noResults.className = 'search-results';
            noResults.innerHTML = `
                <p>No results found for "<strong>${searchTerm}</strong>"</p>
                <p>Try different keywords or check our <a href="#">FAQ section</a></p>
            `;
            
            const searchBox = document.querySelector('.search-box');
            searchBox.insertAdjacentElement('afterend', noResults);
            
            // Fade in results
            setTimeout(() => {
                noResults.style.opacity = '1';
                noResults.style.transform = 'translateY(0)';
            }, 10);
            
            // Remove results after delay
            setTimeout(() => {
                noResults.style.opacity = '0';
                noResults.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    noResults.remove();
                }, 300);
            }, 3000);
        }, 1000);
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Sidebar animations
    const sidebarItems = document.querySelectorAll('.topic-list li, .quick-links li');
    sidebarItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.4s ease-out ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });

    // Help card animation
    const helpCard = document.querySelector('.help-card');
    if (helpCard) {
        helpCard.style.opacity = '0';
        helpCard.style.transform = 'scale(0.9)';
        helpCard.style.transition = 'all 0.6s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    helpCard.style.opacity = '1';
                    helpCard.style.transform = 'scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(helpCard);
    }
});

// Add these CSS animations to your help.css:
/*

*/