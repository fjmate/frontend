//Cojo el div donde irá la tabla
const oDivTiempo = document.getElementById("divTiempo");

//Declaro mi clave de OpenWeatherMap
const sClave = "7ba6f46298392eadd362988f3510e0fc";
const sNombreCiudad = "Alcalá de Guadaíra";

//Hago que al cargar la página se ejecute la función
window.addEventListener("load", obtenerTiempo);

//Declaro la función asíncrona
async function obtenerTiempo() {
  try {
    //Pedimos al servidor los datos
    const oRespuesta = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=37.34860247275081&lon=-5.843544362321692&exclude=current,hourly,minutely,alerts&units=metric&appid=" +
        sClave
    );
    //Controlamos que la respuesta se haya hecho
    if (!oRespuesta.ok) {
      throw new Error("Error en la petición. Ver código HTTP.");
    }
    //Convertimos la respuesta en objeto JSON
    const oDatos = await oRespuesta.json();
    //Nos llevamos el objeto JSON a la función para mostrar el tiempo
    muestraDatos(oDatos);
  } catch (oError) {
    console.log(oError);
  }
}

function muestraDatos(oDatos) {
  //Creamos la tabla y la añadimos al div
  const oTable = document.createElement("table");
  oDivTiempo.appendChild(oTable);
  //Creo el TR y TD para poner el nombre de la ciudad en la tabla
  const oTrCiudad = document.createElement("tr");
  const oTdCiudad = document.createElement("td");
  oTdCiudad.innerHTML = "<b>" + sNombreCiudad + "</b>";
  oTdCiudad.classList.add("tdCiudad");
  oTable.appendChild(oTrCiudad);
  oTrCiudad.appendChild(oTdCiudad);

  //Hacemos un bucle for para recoger el pronóstico de 8 días
  for (let i = 0; i < 8; i++) {
    //Consigo las variables del JSON temperatura,descripcion,día e icono
    const sTempMin = Math.round(parseFloat(oDatos.daily[i].temp.min));
    const sTempMax = Math.round(parseFloat(oDatos.daily[i].temp.max));
    const sTempCompleta = sTempMax + " / " + sTempMin + " ºC";
    const sDescripcion = oDatos.daily[i].weather[0].description;
    const dDiaCompleto = new Date(oDatos.daily[i].dt * 1000).toLocaleDateString(
      "en",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );
    const sIcono = oDatos.daily[i].weather[0].icon;
    const sUrlIcono = "http://openweathermap.org/img/wn/" + sIcono + "@2x.png";

    //Creo la fila tr
    const oTr = document.createElement("tr");

    //Creo el TD para el día
    const oTdDia = document.createElement("td");
    oTdDia.classList.add("tdDia");
    oTdDia.innerHTML = dDiaCompleto;

    //Creo el TD para el icono
    const oTdIcon = document.createElement("td");
    const oImg = document.createElement("img");
    oTdIcon.appendChild(oImg);
    oImg.src = sUrlIcono;

    //Creo el TD para la temperatura
    const oTdTemp = document.createElement("td");
    oTdTemp.innerHTML = sTempCompleta;
    oTdTemp.classList.add("tdTemp");

    //Creo el TD para la descripcion
    const oTdDesc = document.createElement("td");
    oTdDesc.innerHTML = sDescripcion;
    oTdDesc.classList.add("tdDesc");

    //Agrego a la tabla el TR y al TR los TD
    oTable.appendChild(oTr);
    oTr.appendChild(oTdDia);
    oTr.appendChild(oTdIcon);
    oTr.appendChild(oTdTemp);
    oTr.appendChild(oTdDesc);
  }
}
