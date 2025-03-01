let mascota = {
    tipo: "",
    nombre: "",
    hambre: 100,
    higiene: 100,
};

function elegirMascota(tipo) {
    let nombre = prompt("Elige un nombre para tu mascota:");
    if (!nombre) return;

    mascota.tipo = tipo;
    mascota.nombre = nombre;
    
    document.getElementById("seleccionMascota").style.display = "none";
    document.getElementById("juego").style.display = "block";
    
    document.getElementById("nombreMascota").textContent = "Nombre: " + nombre;
    document.getElementById("imagenMascota").src = tipo + ".png"; // Usa imágenes como "gato.png"
    
    guardarProgreso();
}

function alimentar() {
    mascota.hambre = Math.min(100, mascota.hambre + 20);
    actualizarEstado();
}

function bañar() {
    mascota.higiene = 100;
    actualizarEstado();
}

function irAlBaño() {
    mascota.hambre -= 10;
    mascota.higiene -= 15;
    actualizarEstado();
}

function actualizarEstado() {
    document.getElementById("hambre").textContent = mascota.hambre;
    document.getElementById("higiene").textContent = mascota.higiene;
    guardarProgreso();
}

function guardarProgreso() {
    localStorage.setItem("mascota", JSON.stringify(mascota));
}

function cargarProgreso() {
    let datos = localStorage.getItem("mascota");
    if (datos) {
        mascota = JSON.parse(datos);
        document.getElementById("seleccionMascota").style.display = "none";
        document.getElementById("juego").style.display = "block";
        document.getElementById("nombreMascota").textContent = "Nombre: " + mascota.nombre;
        document.getElementById("imagenMascota").src = mascota.tipo + ".png";
        actualizarEstado();
    }
}

function compartirJuego() {
    let link = window.location.href + "?juego=" + btoa(JSON.stringify(mascota));
    prompt("Comparte este enlace con tu amigo:", link);
}

function cargarJuegoDesdeEnlace() {
    let params = new URLSearchParams(window.location.search);
    if (params.has("juego")) {
        let datos = atob(params.get("juego"));
        mascota = JSON.parse(datos);
        document.getElementById("seleccionMascota").style.display = "none";
        document.getElementById("juego").style.display = "block";
        document.getElementById("nombreMascota").textContent = "Nombre: " + mascota.nombre;
        document.getElementById("imagenMascota").src = mascota.tipo + ".png";
        actualizarEstado();
    }
}

window.onload = function () {
    cargarProgreso();
    cargarJuegoDesdeEnlace();
};
