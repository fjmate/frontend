//Array principal con el que trabajamos:
const aMilitares = [
  {
    id: 20,
    name: "Primer Capitán",
    experience: 2,
    mainskill: "firearms",
    pilotingScore: 20,
    shootingScore: 60,
  },
  {
    id: 21,
    name: "Segundo Capitán",
    experience: 1,
    mainskill: "bodytobody",
    pilotingScore: 80,
    shootingScore: 30,
  },
  {
    id: 22,
    name: "Tercer Capitán",
    experience: 2,
    mainskill: "firearms",
    pilotingScore: 34,
    shootingScore: 87,
  },
  {
    id: 24,
    name: "Primer General",
    experience: 4,
    mainskill: "bodytobody",
    pilotingScore: 12,
    shootingScore: 54,
  },
  {
    id: 25,
    name: "Segundo General",
    experience: 5,
    mainskill: "bodytobody",
    pilotingScore: 77,
    shootingScore: 14,
  },
  {
    id: 56,
    name: "Primer Almirante",
    experience: 9,
    mainskill: "firearms",
    pilotingScore: 59,
    shootingScore: 76,
  },
  {
    id: 57,
    name: "Segundo Almirante",
    experience: 8,
    mainskill: "bodytobody",
    pilotingScore: 1,
    shootingScore: 90,
  },
  {
    id: 88,
    name: "Primer Comandante",
    experience: 12,
    mainskill: "firearms",
    pilotingScore: 28,
    shootingScore: 84,
  },
  {
    id: 89,
    name: "Segundo Comandante",
    experience: 10,
    mainskill: "bodytobody",
    pilotingScore: 65,
    shootingScore: 89,
  },
];

// Actividad 1
// Filtramos por años de experiencia y habilidad y lo introducimos en el array aFiltrado
const aFiltrado = aMilitares.filter(
  (oMilitar) => oMilitar.experience > 4 && oMilitar.mainskill == "firearms"
);

console.log("Resultado actividad 1:");
console.log(aFiltrado);

// Actividad 2
// Construimos un array con los dos campos que nos interesan
const aMapeado = aMilitares.map((oMilitar) => [
  oMilitar.name,
  oMilitar.pilotingScore,
]);

console.log("Resultado actividad 2:");
console.log(aMapeado);

// Actividad 3
//Primero sacamos un nuevo array donde solo esten los militares con mas de 8 años de experiencia
const aFiltrado2 = aMilitares.filter((oMilitar) => oMilitar.experience > 8);
//Y ese array le aplicamos reduce para calcular la puntuacion
const iPuntuacionTotal = aFiltrado2.reduce(
  (iAcumulador, oMilitar) =>
    (iAcumulador += oMilitar.shootingScore + oMilitar.pilotingScore),
  0
);

console.log("Resultado actividad 3:");
console.log(iPuntuacionTotal);
