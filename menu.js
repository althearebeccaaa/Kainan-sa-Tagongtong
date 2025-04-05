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

    // Sticky Header with smooth transition
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.transform = 'translateY(0)';
            header.classList.add('sticky');
        } else {
            header.style.transform = 'translateY(0)';
            header.classList.remove('sticky');
        }
    });

    // Menu Filter with animation
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuGrid = document.querySelector('.menu-grid');

    function filterMenu(category) {
        // First fade out all items
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        // After fade out, filter and fade in matching items
        setTimeout(() => {
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300);
    }

    // Initialize with Unli Rice category
    filterMenu('unli-rice');

    // Category button interactions
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button with pulse effect
            this.classList.add('active');
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Filter menu items
            const category = this.dataset.category;
            filterMenu(category);
        });
    });

    // Add to Cart with enhanced animation
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.item-price').textContent;
            
            // Animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    
                    // Change button state
                    this.textContent = 'Added!';
                    this.style.backgroundColor = '#4CAF50';
                    
                    // Show floating notification
                    const notification = document.createElement('div');
                    notification.className = 'cart-notification';
                    notification.textContent = `Added ${itemName} to cart`;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = '1';
                        notification.style.transform = 'translateY(0)';
                        
                        setTimeout(() => {
                            notification.style.opacity = '0';
                            notification.style.transform = 'translateY(-20px)';
                            setTimeout(() => {
                                document.body.removeChild(notification);
                            }, 300);
                        }, 2000);
                    }, 10);
                    
                    // Reset button after delay
                    setTimeout(() => {
                        this.textContent = 'Add to Order';
                        this.style.backgroundColor = 'var(--primary)';
                    }, 2000);
                }, 100);
            }, 100);
        });
    });

    // Scroll animations for menu items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each menu item
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Pulse animation for category buttons every 5 seconds
    setInterval(() => {
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn) {
            activeBtn.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                activeBtn.style.animation = '';
            }, 1000);
        }
    }, 5000);
});

