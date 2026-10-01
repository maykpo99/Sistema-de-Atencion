
let fila = [];

let siguienteNumero = 1;
let totalAnotadas = 0;
let totalAtendidas = 0;


const nombreInput = document.getElementById("nombre");
const btnAgregar = document.getElementById("btnAgregar");
const btnAtender = document.getElementById("btnAtender");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnVolver = document.getElementById("btnVolver");

const filaHTML = document.getElementById("fila");
const cantidadEnFila = document.getElementById("cantidadEnFila");
const mensaje = document.getElementById("mensaje");

const estadisticas = document.getElementById("estadisticas");
const totalAnotadasHTML = document.getElementById("totalAnotadas");
const totalAtendidasHTML = document.getElementById("totalAtendidas");
const porcentajeHTML = document.getElementById("porcentaje");


function agregarPersona() {
    const nombre = nombreInput.value.trim();

    if (nombre === "") {
        mensaje.textContent = "Debe ingresar un nombre.";
        mensaje.style.color = "#dc2626";
        nombreInput.focus();
        return;
    }

    const persona = {
        nombre: nombre,
        numero: siguienteNumero
    };

    fila.push(persona);
    siguienteNumero++;
    totalAnotadas++;

    nombreInput.value = "";
    mensaje.textContent = `${nombre} fue agregado con el número ${persona.numero}.`;
    mensaje.style.color = "#16a34a";

    mostrarFila();
    nombreInput.focus();
}

function mostrarFila() {
    filaHTML.innerHTML = "";

    if (fila.length === 0) {
        filaHTML.innerHTML = '<p class="vacio">No hay personas en la fila.</p>';
    } else {
        fila.forEach(function(persona) {
            const elemento = document.createElement("div");
            elemento.className = "persona";

            elemento.innerHTML = `
                <span class="numero">N° ${persona.numero}</span>
                <span class="nombre-persona">${escapeHTML(persona.nombre)}</span>
            `;

            filaHTML.appendChild(elemento);
        });
    }

    cantidadEnFila.textContent = fila.length;
    btnAtender.disabled = fila.length === 0;
}

function atenderSiguiente() {
    if (fila.length === 0) {
        mensaje.textContent = "No hay personas para atender.";
        mensaje.style.color = "#dc2626";
        return;
    }

    const personaAtendida = fila.shift();
    totalAtendidas++;

    mensaje.textContent =
        `Se atendió a ${personaAtendida.nombre}, número ${personaAtendida.numero}.`;
    mensaje.style.color = "#16a34a";

    mostrarFila();
}


function mostrarEstadisticas() {
    const porcentaje = totalAnotadas === 0
        ? 0
        : (totalAtendidas / totalAnotadas) * 100;

    totalAnotadasHTML.textContent = totalAnotadas;
    totalAtendidasHTML.textContent = totalAtendidas;
    porcentajeHTML.textContent = `${porcentaje.toFixed(2)}%`;

    document.querySelectorAll("main > .panel:not(.estadisticas)")
        .forEach(function(panel) {
            panel.style.display = "none";
        });

    estadisticas.style.display = "block";
}

function volverAlSistema() {
    document.querySelectorAll("main > .panel:not(.estadisticas)")
        .forEach(function(panel) {
            panel.style.display = "block";
        });

    estadisticas.style.display = "none";
    mostrarFila();
}

function escapeHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}


btnAgregar.addEventListener("click", agregarPersona);
btnAtender.addEventListener("click", atenderSiguiente);
btnLimpiar.addEventListener("click", mostrarEstadisticas);
btnVolver.addEventListener("click", volverAlSistema);

nombreInput.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        agregarPersona();
    }
});

mostrarFila();
