class Punto {
  constructor(iCoordenadaX, iCoordenadaY) {
    this.iCoordenadaX = iCoordenadaX;
    this.iCoordenadaY = iCoordenadaY;
  }

  cambiar(iCoordenadaX, iCoordenadaY) {
    this.iCoordenadaX = iCoordenadaX;
    this.iCoordenadaY = iCoordenadaY;
  }

  copia() {
    return new Punto(this._iCoordenadaX, this._iCoordenadaY);
  }

  iguales(oPunto2) {
    if (
      this.iCoordenadaX == oPunto2.iCoordenadaX &&
      this.iCoordenadaY == oPunto2.iCoordenadaY
    ) {
      console.log("Los puntos son iguales");
    } else {
      console.log("Los puntos son distintos");
    }
  }

  suma(oPunto2) {
    return new Punto(
      (this.iCoordenadaX =
        parseInt(this.iCoordenadaX) + parseInt(oPunto2.iCoordenadaX)),
      this.iCoordenadaY + oPunto2.iCoordenadaY
    );
  }

  toString() {
    return `(${this.iCoordenadaX},${this.iCoordenadaY})`;
  }

  get iCoordenadaX() {
    return this._iCoordenadaX;
  }
  set iCoordenadaX(iCoordenadaX) {
    if (isNaN(iCoordenadaX)) {
      this._iCoordenadaX = 0;
    } else {
      this._iCoordenadaX = iCoordenadaX;
    }
  }

  get iCoordenadaY() {
    return this._iCoordenadaY;
  }
  set iCoordenadaY(iCoordenadaY) {
    this._iCoordenadaY = isNaN(iCoordenadaY) ? 0 : iCoordenadaY;
  }

  obtenerDistancia(oPunto2) {
    let iSumando1 = Math.abs(
      Math.pow(oPunto2.iCoordenadaX - oPunto1.iCoordenadaX, 2)
    );
    let iSumando2 = Math.abs(
      Math.pow(oPunto2.iCoordenadaY - oPunto1.iCoordenadaY, 2)
    );
    let iDistancia = Math.sqrt(iSumando1 + iSumando2);
    return iDistancia.toFixed(2);
  }

  static crearPunto(sPunto) {
    let expReg = /[(]-?[0-9]\d{0,1}(\.\d+)?, -?[0-9]\d{0,1}(\.\d+)?[)]/;
    if (expReg.test(sPunto)) {
      var regEx = /(-?\d+)/g;
      const oPunto3 = new Punto(sPunto.match(regEx)[0], sPunto.match(regEx)[1]);
      return oPunto3;
    } else {
      throw new Error("Error al crear el punto");
    }
  }
}

const oPunto1 = new Punto(-5, 2);
const oPunto2 = new Punto(6, -3);
const sPunto = "(2, -4)";

// Actividad 1, obtener distancia entre dos puntos dados
console.log("Actividad 1:");
console.log("Coordenadas punto 1:");
console.log(oPunto1.toString());
console.log("Coordenadas punto 2:");
console.log(oPunto2.toString());
console.log(
  "Distancia entre ambos puntos: " + oPunto1.obtenerDistancia(oPunto2)
);

//Actividad 2, crear punto a partir de una cadena
console.log("Actividad 2:");
console.log("Coordenadas del nuevo punto:");
const oPunto3 = Punto.crearPunto(sPunto);
console.log(oPunto3.toString());

//Actividad 3, obtener distancia entre dos puntos obtenidos a partir de una cadena
console.log("Actividad 3:");
const oPunto4 = Punto.crearPunto("(-5, 2)");
const oPunto5 = Punto.crearPunto("(6, -3)");
console.log(
  "Distancia entre ambos puntos: " + oPunto4.obtenerDistancia(oPunto5)
);
