/**
 * Obtén una referencia a los elementos en los que insertar
 * contenido:
 *  -El div "titulo".
 *  -El div "tiempo".
 *  -El div "tablero".
 *  -El div "mensajes".
 */
const oDivTitulo = document.getElementById("titulo");
const oDivTiempo = document.getElementById("tiempo");
const oDivTablero = document.getElementById("tablero");
const oDivMensajes = document.getElementById("mensajes");

//Obtengo el div para introducir el nombre si gano
const oDivGana = document.getElementById("formulario");

/**
 * Genera el título y el tablero inicial del juego.
 *  -El texto de título es "Ayuda al topo a salir del túnel.".
 *  -La tabla de una fila y quince columnas que actúa como tablero.
 */

//Crear texto titulo

const oNodoTextoTitulo = document.createTextNode(
  "Ayuda al topo a salir del túnel"
);
oDivTitulo.appendChild(oNodoTextoTitulo);

//Crear el tablero

const I_TAM_TABLERO = 15;
const oTable = document.createElement("table");
oDivTablero.appendChild(oTable);
const oTr = document.createElement("tr");
oTable.appendChild(oTr);
for (let i = 0; i < I_TAM_TABLERO; i++) {
  const oTd = document.createElement("td");
  oTr.appendChild(oTd);
}

/**
 * Añade las imágenes iniciales del topo, la salida y las rocas. Las
 * rocas se deben colocar de forma aleatoria en las casillas intermedias.
 * Obtén una referencia al conjunto de todas las casillas.
 */

const oCasillas = document.getElementsByTagName("td");
oCasillas[0].classList.add("topo");
oCasillas[oCasillas.length - 1].classList.add("salida");

oCasillas[
  Math.floor(Math.random() * (oCasillas.length - 1 - 1)) + 1
].classList.add("roca");
oCasillas[
  Math.floor(Math.random() * (oCasillas.length - 1 - 1)) + 1
].classList.add("roca");

/**
 * Añade manejadores de los eventos clic y doble clic a todas las casillas
 * del tablero que llamen a las funciones "avanzar" y "picarRoca"
 * respectivamente.
 */

/*oCasillas.forEach(oCasilla => {oCasilla.addEventListener("click", avanzar)});

 /* Esto es lo mismo
 for (let i=0; i<oCasillas.length; i++){
     const oCasilla = oCasillas[i];
     oCasilla.addEventListener("click", avanzar);
 }*/

oCasillas[0].addEventListener("click", avanzar);
const oCasillasRoca = document.querySelectorAll(".roca");
oCasillasRoca.forEach((oCasillaRoca) => {
  oCasillaRoca.addEventListener("dblclick", picarRoca);
});

/**
 * Añade el texto del tiempo restante "Quedan X segundos restantes.".
 * Declara una variable que almacene los segundos restantes.
 */
//Declaro los segundos totales para poder ver cuando ha tardado cada jugador en completar el juego

let iSegundosTotales = 15;
let iSegundosRestantes = 15;
const oNodoTextoTiempo = document.createTextNode(
  `Quedan ${iSegundosRestantes} segundos restantes.`
);
oDivTiempo.appendChild(oNodoTextoTiempo);

/**
 * Implementa un temporizador que llame a la función "actualizarSegundos"
 * cada segundo.
 */

const iIDIntervalo = setInterval(actualizarSegundos, 1000);

/**
 * Implementa la función "actualizarSegundos" que se llamará cada segundo
 * para actualizar el tiempo restante. Si el tiempo se acaba, se debe
 * informar al usuario que ha perdido.
 */

function actualizarSegundos() {
  iSegundosRestantes--;
  const oNuevoNodoTextoTiempo = document.createTextNode(
    `Quedan ${iSegundosRestantes} segundos restantes`
  );
  oDivTiempo.replaceChild(oNuevoNodoTextoTiempo, oDivTiempo.childNodes[0]);
  // oDivTiempo.textContent = `Quedan ${iSegundosRestantes} segundos restantes`;
  if (iSegundosRestantes == 0) {
    //Informar al usuario
    oDivMensajes.textContent = `Lo siento, has perdido.`;
    //Parar el temporizador
    clearInterval(iIDIntervalo);
    //Quitar los manejadores de eventos del topo y las rocas
    const oTdTopo = document.getElementsByClassName("topo")[0];
    oTdTopo.removeEventListener("click", avanzar);
    const oTdsRoca = document.getElementsByClassName(".roca");
    oTdsRoca.forEach((oTdRoca) => {
      oTdRoca.removeEventListener("dblclick", picarRoca);
    });
  }
}

/**
 * Implementa la función "avanzar" que se lanza cuando se hace clic en una
 * casilla y hace avanzar al topo una casilla en el tablero.
 * Ten en cuenta que:
 *  -Si la casilla no es en la que está el topo, la función no tendrá ningún
 *   efecto.
 *  -Si la celda siguiente es una roca, el topo no avanzará y se informará al
 *   usuario para que pique la roca
 *  -Si la celda siguiente es la salida, el topo desaparecerá del tablero, se
 *   informará que ha ganado la partida, se parará el contador de tiempo y se
 *   eliminarán los manejadores de eventos.
 */

function avanzar(event) {
  const oCasillaTopo = event.target;
  const oCasillaSiguiente = oCasillaTopo.nextElementSibling;
  if (oCasillaSiguiente.className == "") {
    oCasillaTopo.classList.remove("topo");
    oCasillaTopo.removeEventListener("click", avanzar);
    oCasillaSiguiente.classList.add("topo");
    oCasillaSiguiente.addEventListener("click", avanzar);
  } else if (oCasillaSiguiente.classList.contains("roca")) {
    oDivMensajes.textContent = `Pica la roca para avanzar`;
  } else if (oCasillaSiguiente.classList.contains("salida")) {
    oCasillaTopo.classList.remove("topo");
    oCasillaTopo.removeEventListener("click", avanzar);
    oDivMensajes.textContent = `Enhorabuena. Has ganado`;
    clearInterval(iIDIntervalo);
    //Una vez ganado el juego aparece el campo para introducir el nombre
    oDivGana.classList.remove("oculto");
  }
}

//Recojo el botón para guardar el nombre
const oBoton = document.getElementById("guardar");
const oNombre = document.getElementById("nombre");

oBoton.addEventListener("click", () => {
  if (!oNombre.value == "") {
    oNombre.classList.remove("error");
    guardarPartida(oNombre.value, iSegundosTotales - iSegundosRestantes);
  } else {
    oNombre.classList.add("error");
  }
});

//Funcion para guardar el resultado

function guardarPartida(sNombre, sSegundos) {
  var oPartida = { sNombre, sSegundos };
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }

  var oPartidas = JSON.parse(localStorage.getItem("data"));
  oPartidas.push(oPartida);

  localStorage.setItem("data", JSON.stringify(oPartidas));

  //Ordenamos el array de partidas
  const oPartidasOrdenado = oPartidas.sort(function (a, b) {
    if (a.sSegundos > b.sSegundos) {
      return 1;
    }
    if (a.sSegundos < b.sSegundos) {
      return -1;
    }
    return 0;
  });

  mostrarRanking(oPartidasOrdenado);
}

function mostrarRanking(oPartidasOrdenado) {
  oDivGana.classList.add("oculto");
  const oDivRanking = document.getElementById("ranking");
  const oTabla = document.createElement("table");
  const oH1 = document.createElement("oH1");
  oH1.innerHTML = "<b>Ranking Nombre Segundos</b>";
  oDivRanking.appendChild(oH1);
  oDivRanking.appendChild(oTabla);

  for (let i = 1; i < oPartidasOrdenado.length; i++) {
    const oTr = document.createElement("tr");
    oTabla.appendChild(oTr);
    const oTdPuesto = document.createElement("td");
    oTdPuesto.innerHTML = "#" + i;
    oTr.appendChild(oTdPuesto);
    const oTdNombre = document.createElement("td");
    oTdNombre.innerHTML = oPartidasOrdenado[i].sNombre;
    oTr.appendChild(oTdNombre);
    const oTdSegundos = document.createElement("td");
    oTdSegundos.innerHTML = oPartidasOrdenado[i].sSegundos;
    oTr.appendChild(oTdSegundos);
  }
}

/**
 * Implementa la función "picarRoca" que se lanza cuando se hace doble clic
 * en una casilla, su tarea es quitar la roca del tablero.
 * Ten en cuenta que:
 *  -Si el topo está en la casilla anterior, la roca desaparecerá.
 *  -Si el topo no está en la celda anterior, se informará al usuario para que
 *  avance hasta la roca.
 */

function picarRoca(event) {
  const oCasillaRoca = event.target;
  const oCasillaAnterior = oCasillaRoca.previousElementSibling;
  if (oCasillaAnterior.classList.contains("topo")) {
    oCasillaRoca.classList.remove("roca");
    oCasillaRoca.removeEventListener("dblclick", picarRoca);
  } else {
    oDivMensajes.textContent = `Avanza con el topo para picar la roca`;
  }
}
