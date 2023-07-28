//------------------------ Variables globales ------------------------
const nav = document.getElementById("nav");
const formularioContacto = document.querySelector('.contacto .fila .col form');

let menuVisible = false;

//------------------------ Definición de funciones ------------------------
//------------------------ - ------------------------
//------------------------ Función que ocula o muestra el menú ------------------------
function mostrarOcultarMenu() {
    if(menuVisible) {
        seleccionar();
    }
    else {
        nav.classList = "responsive";
        menuVisible = true;
    }
}

//------------------------ Oculta el menú una vez seleccionada una opción ------------------------
function seleccionar() {
    nav.classList = "";
    menuVisible = false;
}

//------------------------ Animación de las habilidades ------------------------
function efectoHabilidades() {
    const skills = document.getElementById("skills");
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    const clases_habilidades = [
        "html5cssjavascript",
        "phpjavamysql",
        "laravelgitwordpress",
        "azuresqlserver",
        "reactangularbootstrap",
        "scrum",
        "ingles",
        "creatividad",
        "responsabilidad",
        "projectmanagement"
    ];
    const cantidad_clases = clases_habilidades.length;

    if(distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");

        for (let i = 0; i < cantidad_clases; i++) {
            habilidades[i].classList.add(clases_habilidades[i]);
        }
    }
}

//------------------------ Función para descargar el CV ------------------------
function descargarCV(ruta) {
    const link = document.createElement('a');

    link.target = "_blank";
    link.href = ruta;
    link.download = (ruta === "/assets/documents/CV_Manuel_Henriquez.pdf") ? "CV_Manuel_Henriquez.pdf" : "CV_Manuel_Henriquez_I.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//------------------------ Dar un feedback al enviar el formulario ------------------------
function feedback() {
    swal("Excelente", "Tu mensaje fue enviado con éxito", "success");
}

//------------------------ Definición de eventos ------------------------
//------------------------ - ------------------------
//------------------------ Capturar el scrolling para aplicar la animación ------------------------
window.addEventListener('scroll', (e) => {
    efectoHabilidades();
});

//------------------------ Delegación de eventos para el click en el documento ------------------------
document.addEventListener('click', (e) => {
    const fuenteEvento = e.target;

    if(fuenteEvento.matches('.contenedor-header .nav-responsive') || fuenteEvento.matches('.contenedor-header .nav-responsive .i')) {
        mostrarOcultarMenu();
    }

    if(fuenteEvento.matches('#nav a')) {
        seleccionar();
    }

    if(fuenteEvento.matches('.sobremi .descargar-cv')) {
        descargarCV(fuenteEvento.dataset.urlCv);
    }
});

//------------------------ Feedback al enviar el formulario ------------------------
formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback();
    e.target.submit();
});
