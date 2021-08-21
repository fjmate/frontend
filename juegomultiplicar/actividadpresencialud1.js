let sDificultad;
let iMutiplicador;
let iResultado;
let iRespuesta;
let sMax;
let iContador = 0;
let bControlTabla = 1;
let bControlRespuesta = 1;
let bControlDificultad = 1;
let iTabla;

//Aqui controlamos que la respuesta sea un numero

do {
  iTabla = prompt("Indica la tabla que quieres practicar: 1-9 ");
  while (bControlTabla == 1) {
    if (isNaN(iTabla)) {
      console.log("Debes escribir una tabla correcta");
      iTabla = prompt("Indica la tabla que quieres practicar: 1-9 ");
    } else {
      bControlTabla = 0;
    }
  }
} while (bControlTabla == 1);

console.log("Has elegido la tabla del " + iTabla);

//Aquí controlamos que el usuario haya escrito bien la dificultad

while (bControlDificultad == 1) {
  sDificultad = prompt(
    "Indica la dificultad: baja (0-10), media (0-100) o alta (0-1000)"
  ).toLowerCase();
  if (sDificultad == "baja") {
    sMax = 10;
    bControlDificultad = 0;
  } else if (sDificultad == "media") {
    sMax = 100;
    bControlDificultad = 0;
  } else if (sDificultad == "alta") {
    sMax = 1000;
    bControlDificultad = 0;
  } else {
    console.log("Introduce bien la dificultad");
  }
}

console.log("Has elegido una dificultad " + sDificultad);

do {
  iMutiplicador = Math.floor(Math.random() * (sMax - 0) + 0);
  iResultado = iTabla * iMutiplicador;
  iRespuesta = prompt(iTabla + " * " + iMutiplicador + " = ");
  //Reiniciamos el valor de la variable para volver a comprobar la respuesta
  bControlRespuesta = 1;

  //Aqui controlamos que la respuesta sea un numero

  while (bControlRespuesta == 1) {
    if (isNaN(iRespuesta)) {
      console.log("Debes escribir un numero");
      iRespuesta = prompt(
        "Escribe de nuevo la respuesta: " +
          iTabla +
          " * " +
          iMutiplicador +
          " ="
      );
    } else {
      bControlRespuesta = 0;
    }
  }

  if (iResultado == iRespuesta) {
    console.log(
      iTabla + " * " + iMutiplicador + " = " + iRespuesta + ". Correcto."
    );
    iContador++;
  }
} while (iResultado == iRespuesta);

console.log(
  "Lo siento has perdido: " +
    iTabla +
    " * " +
    iMutiplicador +
    " son " +
    iResultado +
    " (en vez de " +
    iRespuesta +
    " )"
);
console.log(
  "Has conseguido un total de: " +
    iContador +
    " puntos con dificultad " +
    sDificultad
);
