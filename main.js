// 1. Initialize Lenis (The "Heavy" Scroll Effect)
const lenis = new Lenis({
    duration: 1.2, // Higher = "heavier" scroll (default is 1.0)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease curve
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

// 2. Connect Lenis to the Animation Frame
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. Initialize AOS (Animations)
// We keep your existing settings
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-out-cubic',
});

// 4. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    // We use window.scrollY which works fine with Lenis
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// 5. Product Page Filtering Logic (Kept intact)
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-dark', 'text-white', 'border-brand-dark');
        btn.classList.add('text-slate-600', 'border-slate-200');
        
        if(btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent.includes('All'))) {
            btn.classList.remove('text-slate-600', 'border-slate-200');
            btn.classList.add('bg-brand-dark', 'text-white', 'border-brand-dark');
        }
    });

    const items = document.querySelectorAll('.product-card');
    items.forEach(item => {
        const itemCat = item.dataset.category;
        if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => item.style.opacity = '1', 50);
        } else {
            item.style.display = 'none';
        }
    });
}