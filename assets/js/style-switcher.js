const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

// Oculta los estilos del control scroll
window.addEventListener('scroll', () => {
    if(styleSwitcher.classList.toggle("open")) {
        styleSwitcher.classList.remove("open");
    }
});

// Abre y cierra la paleta de colores
styleSwitcherToggle.addEventListener("click", (e) => {
    styleSwitcher.classList.toggle("open");
});