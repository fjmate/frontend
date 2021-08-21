/**
 * URLs para obtener los episodios y personajes a través de la
 * API https://rickandmortyapi.com/
 */
const sURLEpisodio = `https://rickandmortyapi.com/api/episode/`;
const sURLPersonaje = `https://rickandmortyapi.com/api/character/`;
/**
 * Array para almacenar las URL de los personajes de un episodio.
 */
let aURLPersonajes;
/**
 * Referencia al div "info".
 */
const oDivInfo = document.getElementById("info");

//Actividad 1.

async function obtenerJSON(sURL) {
  try {
    const oRespuesta = await fetch(sURL);
    if (!oRespuesta.ok) {
      throw new Error("Respuesta de red OK pero respuesta de HTTP no OK");
    }
    const oDatos = await oRespuesta.json();
    return oDatos;
  } catch (oError) {
    console.log(oError);
  }
}

//Actividad 2.
//Recojo el numero del episodio
const iNumEpisodio = document.getElementById("episodio").value;

async function obtenerURLPersonajes(iNumEpisodio) {
  const oRespuesta2 = await obtenerJSON(sURLEpisodio + "" + iNumEpisodio);
  aURLPersonajes = oRespuesta2.characters;
  oDivInfo.textContent =
    "Episodio " +
    oRespuesta2.id +
    ": " +
    oRespuesta2.name +
    ". " +
    aURLPersonajes.length +
    " personajes.";
}

//Actividad 3.
async function obtenerYMostrarPersonaje(iNumPersonaje) {
  const oRespuesta3 = await obtenerJSON(aURLPersonajes[iNumPersonaje]);
  const oDivNombreContainer = document.getElementById(
    "character-name-container"
  );
  const oDivImagenContainer = document.getElementById(
    "character-image-container"
  );
  const oDivDescContainer = document.getElementById(
    "character-description-container"
  );
  const oPlaceHolder = document.getElementById("character-name-placeholder");

  //Hago que si ya hay una ficha cargada se vacíen los DIV para poder poner los nuevos datos del siguiente personaje
  if (oDivNombreContainer != null) {
    oDivNombreContainer.innerHTML = null;
    oDivImagenContainer.innerHTML = null;
    oDivDescContainer.innerHTML = null;
    oPlaceHolder.innerHTML = null;
  }
  //Campo nombre y numero
  const oH2 = document.createElement("h2");
  const oDivNombre = document.createElement("div");
  oDivNombre.classList.add("character-name");
  oDivNombreContainer.appendChild(oDivNombre);
  oDivNombre.appendChild(oH2);
  oH2.textContent = oRespuesta3.id + "." + oRespuesta3.name;

  //Campo imagen
  const oImg = document.createElement("img");
  oImg.classList.add("character-image");
  oImg.src = oRespuesta3.image;
  oImg.alt = oRespuesta3.alt;
  oDivImagenContainer.appendChild(oImg);

  //Campo descripcion
  const oDivDesc = document.createElement("div");
  oDivDesc.classList.add("character-labels");
  const oH3Genero = document.createElement("h3");
  oH3Genero.classList.add("character-label");
  oH3Genero.textContent = "Género: " + oRespuesta3.gender;
  const oH3Especie = document.createElement("h3");
  oH3Especie.classList.add("character-label");
  oH3Especie.textContent = "Especie: " + oRespuesta3.species;
  const oH3Status = document.createElement("h3");
  oH3Status.classList.add("character-label");
  oH3Status.textContent = "Status: " + oRespuesta3.status;
  oDivDesc.appendChild(oH3Genero);
  oDivDesc.appendChild(oH3Especie);
  oDivDesc.appendChild(oH3Status);
  oDivDescContainer.appendChild(oDivDesc);

  //Añadimos el nombre al placeholder
  oPlaceHolder.textContent = oRespuesta3.name;
}

/**
 * Indice para el array "aURLPersonajes" para saber el personaje
 * a mostrar en cada ocasión.
 */
let iNumPersonaje = 0;
/**
 * Comportamiento inicial.
 *  -Se obtienen las URL de los personajes del primer episodio.
 *  -Se muestran los datos del primer personaje del episodio.
 */
window.addEventListener("load", async () => {
  await obtenerURLPersonajes(1);
  await obtenerYMostrarPersonaje(iNumPersonaje);
});

//Actividad 4.
const oDivSiguientePersonaje = document.querySelector("#load-next");

oDivSiguientePersonaje.addEventListener("click", () => {
  iNumPersonaje++;
  //Controlamos que si es el ultimo personaje nos muestre después el primero
  if (iNumPersonaje == aURLPersonajes.length) {
    iNumPersonaje = 0;
  }
  obtenerYMostrarPersonaje(iNumPersonaje);
});

//Actividad 5.
const oForm = document.getElementById("formularioEpisodio");
const oInput = oForm["episodio"];

//Evitamos el envio automático
oForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (oForm.checkValidity()) {
    obtenerURLPersonajes(oInput.value);
    //Vuelvo a empezar de cero con el primer personaje en dicho episodio
    iNumPersonaje = 0;
    obtenerYMostrarPersonaje(iNumPersonaje);
  }
});

//Actividad 6.

oInput.addEventListener("change", (event) => {
  const oInput = event.target;
  if (!oInput.checkValidity()) {
    oDivInfo.textContent = "Debes introducir un episodio entre el 1 y el 41.";
  } else {
    oDivInfo.textContent = "";
  }
});
