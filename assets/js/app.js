//------------------------ Variables globales ------------------------
const nav = document.getElementById("nav");
const formularioContacto = document.querySelector('.contacto .fila .col form');

let menuVisible = false;

//------------------------ Definición de funciones ------------------------
//------------------------ - ------------------------
//------------------------ Función que ocula o muestra el menú ------------------------
const mostrarOcultarMenu = () => {
    if(menuVisible) {
        seleccionar();
    }
    else {
        nav.classList = "responsive";
        menuVisible = true;
    }
};

//------------------------ Oculta el menú una vez seleccionada una opción ------------------------
const seleccionar = () => {
    nav.classList = "";
    menuVisible = false;
};

//------------------------ Animación de las habilidades ------------------------
const efectoHabilidades = () => {
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
};

//------------------------ Función para descargar el CV ------------------------
const descargarCV = (ruta) => {
    const link = document.createElement('a');

    link.target = "_blank";
    link.href = ruta;
    link.download = (ruta === "/assets/documents/CV_Manuel_Henriquez.pdf") ? "CV_Manuel_Henriquez.pdf" : "CV_Manuel_Henriquez_I.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

//------------------------ Dar un feedback al enviar el formulario ------------------------
const feedbackSubmitForm = (idioma) => {
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
};

const feedbackProyectosPrivados = (url) => {
    //------------------------ Construir un objeto para swal
    const objetoFeedback = {
        titulo: '',
        descripcion: '',
        icono: 'warning'
    };

    //------------------------ Dar un mensaje en el idioma correspondiente
    if(url === 'sin-url-e') {
        objetoFeedback.titulo = "Sin url";
        objetoFeedback.descripcion = "Este es un proyecto desktop privado y solo se puede mostrar su imagen";
    }
    else if(url === 'sin-url-i') {
        objetoFeedback.titulo = "No url";
        objetoFeedback.descripcion = "This is a private desktop project and only its image can be displayed";
    }

    //------------------------ Crear el mensaje de alerta personalizado
    swal(objetoFeedback.titulo, objetoFeedback.descripcion, objetoFeedback.icono);
};

const feedbackIntereses = (idioma) => {
    //------------------------ Construir un objeto para swal
    const objetoFeedback = {
        titulo: '',
        descripcion: '',
        icono: 'info'
    };

    //------------------------ Dar un mensaje en el idioma correspondiente
    if(idioma === 'espaniol') {
        objetoFeedback.titulo = "Intereses personales & profesionales";
        objetoFeedback.descripcion = "En esta sección se muestra con íconos un listado de mis intereses personales y profesionales";
    }
    else if(idioma === 'ingles') {
        objetoFeedback.titulo = "Personal and professional interests";
        objetoFeedback.descripcion = "This section shows a list of my personal and professional interests with icons";
    }

    //------------------------ Crear el mensaje de alerta personalizado
    swal(objetoFeedback.titulo, objetoFeedback.descripcion, objetoFeedback.icono);
};

//------------------------ Definición de eventos ------------------------
//------------------------ - ------------------------
//------------------------ Capturar el scrolling para aplicar la animación ------------------------
window.addEventListener('scroll', (e) => {
    efectoHabilidades();
});

//------------------------ Feedback al enviar el formulario ------------------------
formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    feedbackSubmitForm(e.target.dataset.idioma);

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
            (url === 'sin-url-e' || url === 'sin-url-i') ? feedbackProyectosPrivados(url) : window.open(url, '_blank');
        }
    }

    if(fuenteEvento.matches('.sobremi .contenedor-intereses')
    || fuenteEvento.matches('.sobremi .contenedor-intereses .intereses')
    || fuenteEvento.matches('.sobremi .contenedor-intereses .intereses .i')
    || fuenteEvento.matches('.sobremi .contenedor-intereses .intereses span')) {
        feedbackIntereses(fuenteEvento.dataset.idioma);
    }
});
