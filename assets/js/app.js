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
    // Extraer el nombre de archivo de la ruta para conservar la distinción de idioma (ej. CV_Manuel_Henriquez_I.pdf)
    const nombreArchivo = ruta.substring(ruta.lastIndexOf('/') + 1);
    link.download = nombreArchivo || 'CV_Manuel_Henriquez.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ── Formulario de contacto ──
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const enviarFormulario = (form) => {
    const nombre  = form.querySelector('[name="nombre"]').value.trim();
    const correo  = form.querySelector('[name="correo"]').value.trim();
    const asunto  = form.querySelector('[name="asunto"]').value.trim();
    const mensaje = form.querySelector('[name="mensaje"]').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

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

    // Feedback visual de carga
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando... <i class="fa fa-spinner fa-spin"></i>';

    const formData = {
        nombre,
        correo,
        asunto,
        mensaje,
        _captcha: form.querySelector('[name="_captcha"]').value,
        _autoresponse: form.querySelector('[name="_autoresponse"]').value
    };

    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success === "false" || data.success === false) {
            throw new Error(data.message || 'Error en el envío');
        }
        
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Te respondo pronto por correo o WhatsApp.',
            icon: 'success',
            confirmButtonColor: '#1A3A5C',
            confirmButtonText: 'Perfecto'
        });
        form.reset();
    })
    .catch(error => {
        console.error('Error al enviar formulario:', error);
        Swal.fire({
            title: 'Error de envío',
            text: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.',
            icon: 'error',
            confirmButtonColor: '#1A3A5C',
            confirmButtonText: 'Entendido'
        });
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
    });
};

// Escuchar evento submit en el formulario
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(contactForm);
    });
}

// ── Delegación de eventos global ──
document.addEventListener('click', (e) => {

    // Descargar CV
    const cvBtn = e.target.closest('[data-url]');
    if (cvBtn) {
        e.preventDefault();
        descargarCV(cvBtn.dataset.url);
        return;
    }

    // Cards de portafolio con URL
    const portfolioCard = e.target.closest('[data-portfolio-url]');
    if (portfolioCard) {
        window.open(portfolioCard.dataset.portfolioUrl, '_blank');
        return;
    }
});
