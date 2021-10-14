let coloresBotones = ["rojo", "azul", "verde", "amarillo"];
let secuenciaJuego = [];
let comenzo = false;
let nivel = 0;
let nivelSecuencia = 0;

function proximaSecuencia() {
  var numeroAleatorio = Math.floor(Math.random() * 4);
  var colorAleatorio = coloresBotones[numeroAleatorio];
  secuenciaJuego.push(colorAleatorio);
  nivel = nivel + 1;
  $("#tituloNivel").text("Nivel " + nivel);
}

function animacion(eleccion) {
  $("#" + eleccion)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("Sonidos/" + eleccion + ".mp3");
  audio.play();
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const reproduceCadena = async () => {
  for (i = 0; i < secuenciaJuego.length; i++) {
    await sleep(1000);
    var color = secuenciaJuego[i];
    animacion(color);
  }
};

$(document).ready(function () {
  $(document).keypress(function () {
    if (!comenzo) {
      $("#tituloNivel").text("Nivel " + nivel);
      proximaSecuencia();
      reproduceCadena();
      comenzo = true;
      $("#juegaDeNuevo").css("display", "none");
    }
  });

  $(".btn").click(function () {
    if (comenzo) {
      var colorElegido = $(this).attr("id");
      animacion(colorElegido);

      if (secuenciaJuego[nivelSecuencia] == colorElegido) {
        nivelSecuencia = nivelSecuencia + 1;
        if (nivelSecuencia == nivel) {
          proximaSecuencia();
          setTimeout(() => {
            reproduceCadena();
          }, 1000);
          nivelSecuencia = 0;
        }
      } else {
        $("#tituloNivel").text("PERDISTE... LLEGASTE AL NIVEL: " + nivel);
        $("#juegaDeNuevo").css("display", "block");
        secuenciaJuego = [];
        comenzo = false;
        nivel = 0;
        nivelSecuencia = 0;
      }
    }
  });
});
