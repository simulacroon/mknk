/* ===== BACKGROUND REACTION ===== */

document.addEventListener("mousemove", e => {

  const x = e.clientX / window.innerWidth;

  document.body.style.background =
    `linear-gradient(
      ${120 + x*20}deg,
      #ffffff,
      #f5f5f5,
      #ffffff
    )`;
});


/* ===== TYPEWRITER EFFECT ===== */

const text =
"© MKNK — nuestro sistema operativo dice basta. nuestro aparato reproductor no es una radio a pilas, nuestra bateria es recargable al inahlar o cerrar a merced de nuestros párpados, nuestros ojos. somos todo y no somos nada, somos tortas, somos homo, somos travas, somos ladies, somos zorras, somos viejas, somos diosas, no queremos ser más parte de esta humanidad. no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.no queremos ser más parte de esta humanidad.0";

const element = document.getElementById("typeText");

let index = 0;

function typeWriter(){

  if(index < text.length){
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 5); // velocidad escritura
  }
}

typeWriter();