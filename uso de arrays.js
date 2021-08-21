//Actividad 1. Clase CartaPokemon

//Tipos válidos de Pokemon
//["Normal", "Fuego", "Agua", "Planta", "Electrico", "Hielo", "Lucha", "Veneno", "Tierra", "Volador", "Psiquico", "Bicho", "Roca", "Fantasma", "Dragon", "Siniestro", "Acero", "Hada"]

const aTiposValidos = [
  "Normal",
  "Fuego",
  "Agua",
  "Planta",
  "Electrico",
  "Hielo",
  "Lucha",
  "Veneno",
  "Tierra",
  "Volador",
  "Psiquico",
  "Bicho",
  "Roca",
  "Fantasma",
  "Dragon",
  "Siniestro",
  "Acero",
  "Hada",
];
const aPuntosAtaque = [49, 52, 48, 30, 35, 45, 56, 60, 60, 55];
const aPuntosDefensa = [49, 43, 65, 35, 30, 40, 35, 30, 44, 40];

class CartaPokemon {
  //A. Constructor.
  constructor(sNombre, aTipo, iPuntosAtaque, iPuntosDefensa) {
    this.sNombre = sNombre;
    this.aTipo = aTipo;
    this.iPuntosAtaque = iPuntosAtaque;
    this.iPuntosDefensa = iPuntosDefensa;
  }

  //Getter

  get sNombre() {
    return this._sNombre;
  }

  get aTipo() {
    return this._aTipo;
  }

  get iPuntosAtaque() {
    return this._iPuntosAtaque;
  }

  get iPuntosDefensa() {
    return this._iPuntosDefensa;
  }

  //Setter

  set sNombre(sNombre) {
    this._sNombre = sNombre;
  }

  set iPuntosAtaque(iPuntosAtaque) {
    if (!aPuntosAtaque.includes(iPuntosAtaque)) {
      throw new Error(`Ataque no valido: ${iPuntosAtaque}`);
    }
    this._iPuntosAtaque = iPuntosAtaque;
  }

  set iPuntosDefensa(iPuntosDefensa) {
    if (!aPuntosDefensa.includes(iPuntosDefensa)) {
      throw new Error(`Defensa no valida: ${iPuntosDefensa}`);
    }
    this._iPuntosDefensa = iPuntosDefensa;
  }

  set aTipo(aTipo) {
    if (!aTipos.includes(aTipo)) {
      throw new Error(`Tipo no valido: ${aTipo}`);
    }
    this._aTipo = aTipo;
  }

  //C. Método toString.
  toString() {
    return `${this._sNombre} (${this._aTipo}), Ataque: ${this._iPuntosAtaque}, Defensa: ${this._iPuntosDefensa}`;
  }
}

//Creamos una carta

//const Carta1 = new CartaPokemon("Bulbasaur", "Planta", 30, 65);

//Sacamos por consola la carta creada
//console.log(Carta1.toString());

//Actividad 2. Baraja de cartas.
const aNombres = [
  "Bulbasur",
  "Charmander",
  "Squirtle",
  "Caterpie",
  "Weedle",
  "Pidgey",
  "Rattata",
  "Spearow",
  "Ekans",
  "Pikachu",
];
const aTipos = [
  ["Planta", "Veneno"],
  ["Fuego"],
  ["Agua"],
  ["Bicho"],
  ["Bicho", "Veneno"],
  ["Normal", "Volador"],
  ["Normal"],
  ["Normal", "Volador"],
  ["Veneno"],
  ["Electrico"],
];

let aCartasPokemon = [];

for (let i = 0; i < aNombres.length; i++) {
  const oCarta = new CartaPokemon(
    aNombres[i],
    aTipos[i],
    aPuntosAtaque[i],
    aPuntosDefensa[i]
  );
  aCartasPokemon.push(oCarta);
}
//Mostramos por consola el array de cartas
console.log(aCartasPokemon);

//Actividad 3. Clase Partida.
class Partida {
  //A. Constructor
  constructor(aCartasPokemon) {
    this._aCartasPokemon = aCartasPokemon;
  }

  get aCartasPokemon() {
    return this.aCartasPokemon;
  }

  set aCartasPokemon(aCartasPokemon) {
    this.aCartasPokemon = aCartasPokemon;
  }

  //B. Método obtenerMontones
  obtenerMontones(aCartas) {
    let aMonton1 = aCartas.splice(0, aCartas.length / 2);
    console.log("Monton 1 --> ", aMonton1);
    let aMonton2 = aCartas.splice(0, aCartas.length);
    console.log("Monton 2 -->", aMonton2);

    return [
        aMonton1,
        aMonton2
       ];
  }

  //C. Método obtenerMontonOrdenado
  obtenerMontonOrdenado(aMonton){
    aMonton.sort(function (oCarta1,oCarta2) {
        if (oCarta1.iPuntosAtaque > oCarta2.iPuntosAtaque) {
          return -1;
        } else if (oCarta1.iPuntosAtaque < oCarta2.iPuntosAtaque) {
          return 1;
        } 
        return 0;
      });
      return aMonton;
  }


  //D. Método quitarCarta

  quitarCarta(aCartas, oCarta) {
    let i = aCartas.findIndex(oCarta => oCarta.sNombre == oCarta.sNombre);

    if (i !== -1) {
      aCartas.splice(i, 1);
    }
    return aCartas;
  }

  //Imprime un montón de cartas por consola.
  imprimirMonton(aMontonCartas) {
    aMontonCartas.forEach((oCartaPokemon) => {
      console.log(`           -${oCartaPokemon}`);
    });
  }
}

//Prueba de la función "obtenerMontones".
console.log(`
    Prueba 1: Montones creados para 2 jugadores.
`);
const oPartida = new Partida(aCartasPokemon);
const aMontones = oPartida.obtenerMontones(aCartasPokemon);
for (let i = 0; i < 2; i++) {
  const aMonton = aMontones[i];
  console.log(`   Montón del jugador ${i + 1}.`);
  oPartida.imprimirMonton(aMonton);
}

//Prueba de la función "obtenerMontonOrdenado".

console.log(`
    Prueba 2: Montón desordenado y ordenado del jugador 1.
`);
let aMontonJugador1 = aMontones[0];
console.log(`   Montón desordenado del jugador 1:`);
oPartida.imprimirMonton(aMontonJugador1);
aMontonJugador1 = oPartida.obtenerMontonOrdenado(aMontonJugador1);
console.log(`   Montón ordenado del jugador 1:`);
oPartida.imprimirMonton(aMontonJugador1);

//Prueba de la función "quitarCarta".

console.log(`
    Prueba 3: Montón del jugador 2 antes y después de quitar una carta.
`);
let aMontonJugador2 = aMontones[1];
console.log(`   Montón del jugador 2 antes de quitar una carta:`);
oPartida.imprimirMonton(aMontonJugador2);
oPartida.quitarCarta(aMontonJugador2, aMontonJugador2[2]);
console.log(`   Montón del jugador 2 después de quitar una carta:`);
oPartida.imprimirMonton(aMontonJugador2);
