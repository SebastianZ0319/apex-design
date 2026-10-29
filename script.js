// ============ LOADER ============
// No espera a que bajen todas las imágenes: se quita apenas el HTML está listo
const hideLoader = () => {
    document.getElementById('loader').classList.add('hide');
    document.body.classList.remove('is-loading');
};
// 2.4s: el logo termina de entrar (0.3s + 1.6s) y alcanza a brillar un momento
document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 2400));
setTimeout(hideLoader, 4000); // respaldo por si algo tarda

// ============ HEADER AL HACER SCROLL ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ============ MENÚ MÓVIL ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
}));

// ============ LINK ACTIVO SEGÚN LA SECCIÓN ============
const links = document.querySelectorAll('.nav__link');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });
document.querySelectorAll('main > section').forEach(s => sectionObserver.observe(s));

// ============ APARICIÓN AL HACER SCROLL ============
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: .15 });
// .intro también se observa para que el fondo fluido de "Quiénes somos" aparezca al llegar
document.querySelectorAll('.reveal, .intro').forEach(el => revealObserver.observe(el));

// ============ BANNERS CORREDIZOS ============
// Repite los logos hasta que el grupo sea más ancho que la pantalla y luego lo duplica:
// al moverse -50% la copia queda justo donde empezó el original, así el bucle no salta.
const MARQUEE_SPEED = 45; // píxeles por segundo, igual en cualquier pantalla
const buildMarquee = marquee => {
    const track = marquee.querySelector('.marquee__track');
    const group = track.querySelector('.marquee__group');
    if (!group.originalItems) group.originalItems = [...group.children];

    group.replaceChildren(...group.originalItems);
    track.replaceChildren(group);
    // Tope de 20 vueltas por si un logo aún no ha cargado y mide 0
    for (let i = 0; i < 20 && group.getBoundingClientRect().width < marquee.offsetWidth; i++) {
        group.originalItems.forEach(item => {
            const copy = item.cloneNode(true);
            copy.setAttribute('aria-hidden', 'true');
            group.append(copy);
        });
    }
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.append(clone);
    track.style.animationDuration = group.getBoundingClientRect().width / MARQUEE_SPEED + 's';
};
const buildMarquees = () => document.querySelectorAll('.marquee').forEach(buildMarquee);
buildMarquees();
window.addEventListener('load', buildMarquees); // los logos con imagen miden 0 hasta que cargan
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) { lastWidth = window.innerWidth; buildMarquees(); }
});

// ============ AÑO DEL FOOTER ============
document.getElementById('year').textContent = new Date().getFullYear();
