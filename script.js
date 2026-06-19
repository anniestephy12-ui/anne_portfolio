document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Hardware Tracker Loop ---
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Make the cursor scale up into a ring on interactive hooks
    const interactiveTargets = document.querySelectorAll('.nav-links a, .btn, .project-card, .skill-category-card');
    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-up');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-up');
        });
    });

    // --- 2. Intersection Observer Engine (Scroll Animations) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Kill tracking once element is painted safely
            }
        });
    }, revealOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // --- 3. Immediate Initial Hero Sequence Paint ---
    const systemFades = document.querySelectorAll('.animate-fade');
    systemFades.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }, index * 150);
    });
});