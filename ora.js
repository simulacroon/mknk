const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };

// frases del oráculo
const frases = [
    "algo se está formando...",
    "no mires directamente",
    "ya sabes la respuesta",
    "espera un poco más",
    "eso no es lo importante",
    "todo cambia ahora"
];

// seguir el mouse
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    dibujar();
});

// pincel pixelado
function dibujar() {

    let size = 10;

    // color random (simple y funcional)
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    ctx.fillRect(
        Math.floor(mouse.x / size) * size,
        Math.floor(mouse.y / size) * size,
        size,
        size
    );
}

// click → mensaje
window.addEventListener("click", (e) => {

    let mensaje = document.getElementById("mensaje");

    let texto = frases[Math.floor(Math.random() * frases.length)];

    mensaje.innerText = texto;

    mensaje.style.left = (e.clientX + 10) + "px";
    mensaje.style.top = (e.clientY + 10) + "px";

    mensaje.style.opacity = 1;

    setTimeout(() => {
        mensaje.style.opacity = 0;
    }, 2000);
});
