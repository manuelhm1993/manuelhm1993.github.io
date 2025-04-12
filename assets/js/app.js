const experiencia = document.querySelector("#a-experiencia");

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

window.addEventListener("load", (e) => {
    experiencia.textContent = getYearsDiff();
    getCurrentAge();
    hideSection("portfolio");
});

document.addEventListener("click", (e) => {
    const path = e.target.dataset.url;
    const url = e.target.dataset.portfolioUrl;

    if (path !== undefined) descargarCV(path);

    if (url !== undefined && url !== "N/A") window.open(url, "_blank");
    else if (url === "N/A") {
        Swal.fire({
            title: "Información",
            text: "Este proyecto es privado y no tiene enlace disponible",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
    }
});
