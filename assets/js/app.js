const experiencia = document.querySelector("#a-experiencia");
const contactForm = document.querySelectorAll('.contact .contact-form .form-control, .contact .contact-form .hidden input');

//------------------------ Función para descargar el CV ------------------------
const descargarCV = (ruta) => {
    const link = document.createElement("a");

    link.target = "_blank";
    link.href = ruta;
    link.download =
        ruta === "./assets/documents/CV_Manuel_Henriquez.pdf"
            ? "CV_Manuel_Henriquez.pdf"
            : "CV_Manuel_Henriquez_I.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const getDaysDiff = (
    firstDate = new Date(`${new Date().getFullYear()}/01/01`),
    secondDate = new Date()
) => {
    const firstDateInMs = firstDate.getTime();
    const secondDateInMs = secondDate.getTime();

    const differenceBtwDates = secondDateInMs - firstDateInMs;

    const aDayInMs = 24 * 60 * 60 * 1000;

    const daysDiff = Math.round(differenceBtwDates / aDayInMs);

    return daysDiff;
};

const getYearsDiff = (
    firtDate = new Date("2018/01/01"),
    secondDate = new Date()
) => {
    const yearDiff = secondDate.getFullYear() - firtDate.getFullYear();
    return yearDiff;
};

const getCurrentAge = (
    firstDate = new Date("1993/07/23"),
    secondDate = new Date()
) => {
    const equalsMonth = firstDate.getMonth() == secondDate.getMonth();

    const validateBirthday =
        firstDate.getDate() == secondDate.getDate() && equalsMonth;
    const validateDay =
        equalsMonth && firstDate.getDate() < secondDate.getDate();
    const validateMonth = firstDate.getMonth() < secondDate.getMonth();

    const diffAnios = getYearsDiff(firstDate, secondDate);

    const edad =
        validateBirthday || validateDay || validateMonth
            ? diffAnios
            : diffAnios - 1;

    document.querySelector("#edad").textContent = edad;
};

const hideSection = (showSection) => {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
        if (!section.classList.contains(showSection)) {
            section.classList.add("hidden");
        }
    });
};

const resetForm = () => {
    contactForm.forEach((input) => {
        if(input.type !== 'hidden') {
            input.value = '';
            input.setCustomValidity('');
        }
    });
};

const feedbackSubmitForm = (idioma) => {
    //------------------------ Construir un objeto para swal
    const objetoFeedback = {
        titulo: '',
        descripcion: '',
        icono: 'success'
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
    Swal.fire({
        title: objetoFeedback.titulo,
        text: objetoFeedback.descripcion,
        icon: objetoFeedback.icono,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
    });

    resetForm();
};

const fetchFormSubmit = async (url, parameters) => {
    try {
        const res = await fetch(url, parameters);
    } catch (error) {
        console.log(error);
    }
};

window.addEventListener("load", (e) => {
    experiencia.textContent = getYearsDiff();
    getCurrentAge();
    //hideSection("contact");
});

document.addEventListener("click", (e) => {
    const action = e.target.dataset;
    const keys = ['url', 'portfolioUrl', 'submit'];
    let key = '';

    if(Object.keys(action).length > 0) {
        for (const item of keys) {
            if (action[item] !== undefined) {
                key = item;
                break;
            }
        }
        switch(key) {
            case 'url':
                descargarCV(action[key]);
                break;
            case 'submit':
                const data = {};
        
                contactForm.forEach((input) => {
                    data[input.name] = input.value;

                    if(input.value === '') {
                        input.setCustomValidity("Este campo es obligatorio");
                        input.reportValidity();
                    }

                    if(input.name === 'correo') {
                        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if(!regex.test(input.value)) {
                            input.setCustomValidity("El correo electrónico no es válido");
                            input.reportValidity();
                        }
                    }
                });

                if(data.nombre != '' && data.correo != '' && data.mensaje != '' && data.asunto != '') {
                    const parameters = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    };
    
                    feedbackSubmitForm(action.idioma);
    
                    // Hacer el fetch luego de 1 segundo del feedback
                    setTimeout(() => {
                        fetchFormSubmit(action[key], parameters);
                    }, 1000);
                }
                else {

                }
                break;
            case 'portfolioUrl':
                if(action[key] !== 'N/A') {
                    window.open(action[key], "_blank");
                }
                else {
                    Swal.fire({
                        title: "Información",
                        text: "Este proyecto es privado y no tiene enlace disponible",
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar",
                    });
                }
                break;
        }
    }
});