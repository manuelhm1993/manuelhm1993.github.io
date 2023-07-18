//------------------------ Variables globales ------------------------
let menuVisible = false;
let nav = document.getElementById("nav");

//------------------------ Definición de funciones ------------------------
//------------------------ - ------------------------
//------------------------ Función que ocula o muestra el menú ------------------------
function mostrarOcultarMenu() {
    if(menuVisible) {
        nav.classList = "";
        menuVisible = false;
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
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    var clases_habilidades = [
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
    var cantidad_clases = clases_habilidades.length;

    if(distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");

        for (let i = 0; i < cantidad_clases; i++) {
            habilidades[i].classList.add(clases_habilidades[i]);
        }
    }
}

//------------------------ Función para descargar el CV ------------------------
function descargarCV(ruta) {
    var link = document.createElement('a');

    link.target = "_blank";
    //link.href = "/assets/documents/CV_Manuel_Henriquez.pdf";
    link.href = ruta;
    link.download = "CV_Manuel_Henriquez.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//------------------------ Definición de eventos ------------------------
//------------------------ - ------------------------
//------------------------ Capturar el scrolling para aplicar la animación ------------------------
window.onscroll = function() {
    efectoHabilidades();
};

function feedback() {
    swal("Excelente", "Tu mensaje fue enviado con éxito", "success");
}