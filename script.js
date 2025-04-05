document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    // Initialize map only once
    let map;

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

    // ===== STICKY HEADER =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // ===== MAP INITIALIZATION =====
    function initMap() {
        if (!map && document.getElementById('branch-map')) {
            map = L.map('branch-map').setView([14.11408403165516, 122.9808627070321], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Custom icon
            const customIcon = L.divIcon({
                className: 'map-marker',
                html: '<div style="background-color: #D32026; color: white; padding: 5px 10px; border-radius: 20px; font-weight: bold;">Camarines Norte Branch</div>',
                iconSize: [120, 40],
                iconAnchor: [60, 40]
            });

            // Add marker
            const marker = L.marker([14.11408403165516, 122.9808627070321], {
                icon: customIcon
            }).addTo(map);

            // Popup content
            marker.bindPopup(`
                <div style="font-family: Arial, sans-serif;">
                    <h3 style="color: #D32026; margin-bottom: 10px;">Sipocot Branch</h3>
                    <p><i class="fas fa-map-marker-alt"></i> Sitio Cabasod, Sipocot South Centro, Camarines Sur</p>
                    <p><i class="fas fa-phone"></i> 0919 681 4107</p>
                    <p><i class="fas fa-clock"></i> 10:00 AM - 9:00 PM (Daily)</p>
                </div>
            `);

            // Fix map display issues
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        }
    }

    // Initialize map on load
    initMap();

    // Fix map on resize
    window.addEventListener('resize', function() {
        if (map) map.invalidateSize();
    });

    // ===== PROMO TIMER =====
    function updatePromoTimer() {
        const now = new Date();
        const promoBanner = document.querySelector('.promo-banner');
        
        if (!promoBanner) return;
        
        // Check if it's weekend (Saturday or Sunday)
        if (now.getDay() === 0 || now.getDay() === 6) {
            // Check if between 11AM-3PM
            if (now.getHours() >= 11 && now.getHours() < 15) {
                const endTime = new Date();
                endTime.setHours(15, 0, 0, 0); // 3:00 PM
                
                const diff = endTime - now;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                
                promoBanner.innerHTML = `
                    <div class="container">
                        <div class="promo-content">
                            <h3>BUY 1 TAKE 1 CHICKEN INASAL - ACTIVE NOW!</h3>
                            <p>Hurry! Offer ends in ${hours}h ${minutes}m</p>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Initialize promo timer
    updatePromoTimer();
    setInterval(updatePromoTimer, 60000); // Update every minute

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fade');
            }
        });
    };

    // Initialize scroll animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Add animation class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    // ===== PULSE ANIMATION FOR CTAs =====
    setInterval(() => {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        ctaButtons.forEach(btn => {
            btn.classList.add('pulse');
            setTimeout(() => {
                btn.classList.remove('pulse');
            }, 1000);
        });
    }, 5000);
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('.menu-item, .branch-item, .map-section').forEach(item => {
        observer.observe(item);
    });
}