//Actividad 1

//Obtengo una referencia al div que he creado para el tablero para colocarlo en el HTML
const oDivTablero = document.getElementById("tablero");
//Creo el tablero 3x3
const I_TAM_TABLERO = 3;

//Creación de nodos
const oTablero = document.createElement("table");
const oTableroBody = document.createElement("tbody");

//Bucle para crear las filas y columnas
for (let i = 0; i < I_TAM_TABLERO; i++) {
  const oFila = document.createElement("tr");

  for (let j = 0; j < I_TAM_TABLERO; j++) {
    const oColumna = document.createElement("td");
    oFila.appendChild(oColumna);
  }
  oTableroBody.appendChild(oFila);
}

oTablero.appendChild(oTableroBody);
oDivTablero.appendChild(oTablero);

const oCasillas = document.getElementsByTagName("td");

//Actividad 2

//Inicializo las variables
const iPuntuacion = document.createTextNode(0);
const iTiempoRestante = document.createTextNode(60);
//Y las añado a los elementos correspondientes por su ID
oPuntuacion = document.getElementById("score");
oPuntuacion.appendChild(iPuntuacion);
oTiempoRestante = document.getElementById("time-left");
oTiempoRestante.appendChild(iTiempoRestante);

//Actividad 3

function sumarPuntos() {
  for (i = 0; i < oCasillas.length; i++) {
    if (oCasillas[i].classList == "mole") {
      oCasillas[i].addEventListener("click", aumentarPuntuacion);
    }
  }
}

function aumentarPuntuacion() {
  var iNuevaPuntuacion = document.getElementById("score").innerHTML;
  iNuevaPuntuacion++;
  const oNuevaPuntuacion = document.createTextNode(iNuevaPuntuacion);
  oPuntuacion.replaceChild(oNuevaPuntuacion, oPuntuacion.childNodes[0]);
}

//Actividad 4

//Primero creamos al temporizador que llame a la funcion cambiarTopoCasilla cada medio segundo
const iTemporizador = setInterval(cambiarTopoCasilla, 500);

function cambiarTopoCasilla() {
  for (i = 0; i < oCasillas.length; i++) {
    if (oCasillas[i].classList == "mole") {
      oCasillas[i].classList.remove("mole");
      oCasillas[i].removeEventListener("click", aumentarPuntuacion);
    }
  }
  oCasillas[
    Math.floor(Math.random() * (oCasillas.length - 1 - 1)) + 1
  ].classList.add("mole");
  sumarPuntos();
}

cambiarTopoCasilla();

//Actividad 5

//Creo el temporizador para la cuenta atras
const iTempDecrem = setInterval(decrementarTiempo, 1000);
function decrementarTiempo() {
  var iNuevoTiempo = document.getElementById("time-left").innerHTML;
  iNuevoTiempo--;
  const oNuevoTiempo = document.createTextNode(iNuevoTiempo);
  oTiempoRestante.replaceChild(oNuevoTiempo, oTiempoRestante.childNodes[0]);

  if (iNuevoTiempo == 0) {
    //Informamos al usuario de que se ha acabado el tiempo y su puntuacion
    alert(
      `No queda tiempo. Su puntuación es: ${
        document.getElementById("score").innerHTML
      }`
    );
    //Parar el temporizador
    clearInterval(iTempDecrem);
  }
}
