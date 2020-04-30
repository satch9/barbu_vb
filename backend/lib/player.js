module.exports = class Player {
  constructor(socket) {
    this.score = 0;
    this.hand = null;
    this.name = null;
    this.id = socket.id;
    this.choiceContrat = [];
  }

  setName(name) {
    if (name !== "" || name !== undefined) {
      this.name = name;
    } else {
      throw new Error(
        "Le pseudo que vous avez tapé ne doit pas être vide, ni indéfini"
      );
    }
  }
  setHand(hand) {
    if (hand !== "" || hand !== undefined || typeof hand !== "object") {
      this.hand = hand;
    } else {
      throw new Error("Problème lors de la création des mains du jeu");
    }
  }
};
