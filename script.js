// ============ LOADER ============
// No espera a que bajen todas las imágenes: se quita apenas el HTML está listo
const hideLoader = () => {
    document.getElementById('loader').classList.add('hide');
    document.body.classList.remove('is-loading');
};
document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 1200));
setTimeout(hideLoader, 3000); // respaldo por si algo tarda

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
// .intro también se observa para encender la luz de "Quiénes somos"
document.querySelectorAll('.reveal, .intro').forEach(el => revealObserver.observe(el));

// ============ AÑO DEL FOOTER ============
document.getElementById('year').textContent = new Date().getFullYear();
