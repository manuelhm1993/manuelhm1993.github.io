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
function feedback(idioma) {
    //------------------------ Construir un objeto para swal
    const objetoFeedback = {
        titulo: '',
        descripcion: '',
        icono: 'success',
        boton: false
    };

    //------------------------ Dar un mensaje en el idioma correspondiente
    if(idioma === 'espaniol') {
        objetoFeedback.titulo = "Excelente";
        objetoFeedback.descripcion = "Tu mensaje fue enviado con éxito";
    }
    else if(idioma === 'ingles') {
        objetoFeedback.titulo = "Excellent";
        objetoFeedback.descripcion = "Your message was sent successfully";
    }

    //------------------------ Crear el mensaje de alerta personalizado
    swal(objetoFeedback.titulo, objetoFeedback.descripcion, {
        icon: objetoFeedback.icono,
        button: objetoFeedback.boton
    });
}

//------------------------ Definición de eventos ------------------------
//------------------------ - ------------------------
//------------------------ Capturar el scrolling para aplicar la animación ------------------------
window.addEventListener('scroll', (e) => {
    efectoHabilidades();
});

//------------------------ Feedback al enviar el formulario ------------------------
formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback(e.target.dataset.idioma);

    //------------------------ Enviar el formulario 2 segundos después del feedback
    setTimeout(() => {
        e.target.submit();
    }, 1000);
});

//------------------------ Delegación de eventos para el click en el documento ------------------------
document.addEventListener('click', (e) => {
    const fuenteEvento = e.target;

    //------------------------ Despliega el menú en versión responsive
    if(fuenteEvento.matches('.contenedor-header .nav-responsive') 
    || fuenteEvento.matches('.contenedor-header .nav-responsive .i')) {
        mostrarOcultarMenu();
    }

    //------------------------ Oculta el menú responsive al seleccionar una opción
    if(fuenteEvento.matches('#nav a')) {
        seleccionar();
    }

    //------------------------ Descarga el CV en la versión correspondiente
    if(fuenteEvento.matches('.sobremi .descargar-cv')) {
        descargarCV(fuenteEvento.dataset.urlCv);
    }

    //------------------------ Abre una nueva ventana a la página del proyecto seleccionado
    if(fuenteEvento.matches('.portafolio .proyecto .overlay') 
    || fuenteEvento.matches('.portafolio .proyecto .overlay h3') 
    || fuenteEvento.matches('.portafolio .proyecto .overlay p')) {
        const url = fuenteEvento.dataset.urlProyecto;

        if(url !== undefined && url !== '' && url !== null) {
            window.open(url, '_blank');
        }
    }
});
