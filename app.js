```javascript
console.log("CookieLab iniciado");

// ========================================
// FUNCIONES PARA TRABAJAR CON COOKIES
// ========================================

function guardarCookie(nombre, valor, segundos) {
    document.cookie =
        nombre + "=" + encodeURIComponent(valor) + "; max-age=" + segundos + "; path=/";
}

function leerCookie(nombre) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const partes = cookie.split("=");

        if (partes[0] === nombre) {
            return decodeURIComponent(partes.slice(1).join("="));
        }
    }

    return null;
}

function borrarCookie(nombre) {
    document.cookie = nombre + "=; max-age=0; path=/";
}

// ========================================
// ELEMENTOS HTML
// ========================================

const saludo = document.getElementById("saludo");
const contador = document.getElementById("contador");
const ultimaVisita = document.getElementById("ultimaVisita");

const tema = document.getElementById("tema");
const idioma = document.getElementById("idioma");

const cambiarNombre = document.getElementById("cambiarNombre");
const olvidarme = document.getElementById("olvidarme");


// ========================================
// CONFIGURACIÓN
// ========================================

const TREINTA_DIAS = 30 * 24 * 60 * 60;


// ========================================
// FASE 2: RECORDAR USUARIO
// ========================================

let usuario = leerCookie("usuario");

if (!usuario) {

    usuario = prompt("¿Cuál es tu nombre?");

    if (usuario === null || usuario.trim() === "") {
        usuario = "Usuario";
    }

    usuario = usuario.trim();

    guardarCookie("usuario", usuario, TREINTA_DIAS);

    alert("¡Bienvenido/a, " + usuario + "!");
}


// ========================================
// FASE 3: PREFERENCIAS
// ========================================

let temaGuardado = leerCookie("tema");
let idiomaGuardado = leerCookie("idioma");

if (!temaGuardado) {
    temaGuardado = "claro";
}

if (!idiomaGuardado) {
    idiomaGuardado = "es";
}

tema.value = temaGuardado;
idioma.value = idiomaGuardado;


// Aplicar tema
function aplicarTema() {
    if (tema.value === "oscuro") {
        document.body.classList.add("oscuro");
    } else {
        document.body.classList.remove("oscuro");
    }
}

aplicarTema();


// Mostrar saludo según idioma
function mostrarSaludo() {

    if (idioma.value === "en") {
        saludo.textContent = "Hello again, " + usuario;
    } else {
        saludo.textContent = "Hola de nuevo, " + usuario;
    }
}

mostrarSaludo();


// Guardar tema
tema.addEventListener("change", function () {
    guardarCookie("tema", tema.value, TREINTA_DIAS);
    aplicarTema();
});


// Guardar idioma
idioma.addEventListener("change", function () {
    guardarCookie("idioma", idioma.value, TREINTA_DIAS);
    mostrarSaludo();
});


// ========================================
// FASE 4: CONTADOR DE VISITAS
// ========================================

let visitas = leerCookie("visitas");

if (!visitas) {
    visitas = 1;
} else {
    visitas = Number(visitas) + 1;
}

guardarCookie("visitas", visitas, TREINTA_DIAS);

contador.textContent =
    "Has visitado esta página " + visitas + " veces";


// ========================================
// NOTA FINAL: ÚLTIMA VISITA
// ========================================

let ultima = leerCookie("ultimaVisita");

if (ultima) {
    const fechaAnterior = new Date(ultima);

    ultimaVisita.textContent =
        "Tu última visita fue el " + fechaAnterior.toLocaleString();
}

const ahora = new Date();

guardarCookie(
    "ultimaVisita",
    ahora.toISOString(),
    TREINTA_DIAS
);


// ========================================
// FASE 5: CAMBIAR NOMBRE
// ========================================

cambiarNombre.addEventListener("click", function () {

    const nuevoNombre = prompt("Introduce tu nuevo nombre:");

    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {

        usuario = nuevoNombre.trim();

        guardarCookie("usuario", usuario, TREINTA_DIAS);

        mostrarSaludo();

        alert("Nombre cambiado correctamente.");
    }
});


// ========================================
// FASE 5: OLVIDAR TODOS LOS DATOS
// ========================================

olvidarme.addEventListener("click", function () {

    const confirmar = confirm(
        "¿Seguro que quieres borrar todos tus datos?"
    );

    if (confirmar) {

        borrarCookie("usuario");
        borrarCookie("tema");
        borrarCookie("idioma");
        borrarCookie("visitas");
        borrarCookie("ultimaVisita");

        alert("Todos tus datos han sido borrados.");

        location.reload();
    }
});
```
