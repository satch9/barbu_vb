module.exports = class Contrat {
  constructor() {
    this.contrats = [
      {
        nom: "Barbu",
        pointsContrat: 70,
        nbreDeCarte: 1
      },
      {
        nom: "Pas de plis",
        pointsContrat: 5,
        nbreDeCarte: 8
      },
      {
        nom: "Pas de coeur",
        pointsContrat: 5,
        nbreDeCarte: 8
      },
      {
        nom: "Pas de dame",
        pointsContrat: 15,
        nbreDeCarte: 4
      },
      {
        nom: "Réussite",
        place: {
          1: -100,
          2: -50
        }
      },
      {
        nom: "Salade"
      }
    ];
  }
};
