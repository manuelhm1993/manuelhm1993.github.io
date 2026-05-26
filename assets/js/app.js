/* ════════════════════════════════════════
   MHENRIQUEZ CA — app.js
   Portafolio personal mhenriquez.com
════════════════════════════════════════ */

// ── Año dinámico en footer ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Sidebar mobile ──
const sidebar  = document.getElementById('sidebar');
const toggler  = document.getElementById('navToggler');
const overlay  = document.getElementById('sidebarOverlay');

toggler.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

// ── Cerrar sidebar al hacer clic en un enlace de nav (mobile) ──
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
});

// ── Nav activo al hacer scroll (IntersectionObserver) ──
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Descargar CV ──
const descargarCV = (ruta) => {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = 'CV_Manuel_Henriquez.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ── Formulario de contacto ──
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const enviarFormulario = (btn) => {
    const form    = btn.closest('.contact-form');
    const nombre  = form.querySelector('[name="nombre"]').value.trim();
    const correo  = form.querySelector('[name="correo"]').value.trim();
    const asunto  = form.querySelector('[name="asunto"]').value.trim();
    const mensaje = form.querySelector('[name="mensaje"]').value.trim();

    if (!nombre || !correo || !asunto || !mensaje) {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Por favor llena todos los campos.',
            icon: 'warning',
            confirmButtonColor: '#1A3A5C',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    if (!validarEmail(correo)) {
        Swal.fire({
            title: 'Correo inválido',
            text: 'Ingresa un correo electrónico válido.',
            icon: 'warning',
            confirmButtonColor: '#1A3A5C',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Te respondo pronto por correo o WhatsApp.',
        icon: 'success',
        confirmButtonColor: '#1A3A5C',
        confirmButtonText: 'Perfecto'
    });

    setTimeout(() => {
        fetch(btn.dataset.submit, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, asunto, mensaje })
        }).catch(() => {});
    }, 1000);

    form.querySelectorAll('input:not([type="hidden"]), textarea').forEach(i => i.value = '');
};

// ── Delegación de eventos global ──
document.addEventListener('click', (e) => {

    // Descargar CV
    const cvBtn = e.target.closest('[data-url]');
    if (cvBtn) {
        descargarCV(cvBtn.dataset.url);
        return;
    }

    // Cards de portafolio con URL
    const portfolioCard = e.target.closest('[data-portfolio-url]');
    if (portfolioCard) {
        window.open(portfolioCard.dataset.portfolioUrl, '_blank');
        return;
    }

    // Botón enviar formulario
    const submitBtn = e.target.closest('[data-submit]');
    if (submitBtn) {
        enviarFormulario(submitBtn);
        return;
    }
});
